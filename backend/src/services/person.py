from sqlmodel import select
from datetime import datetime

from src.helpers.database import DatabaseSessionDep, Annotated, Depends
from src.dto.person import (
    NewPersonDto,
    PersonRelativeDto,
    PersonAddressDto,
    PersonBirthInfoDto,
)
from src.models.schema.person import Person, PersonGender


class PersonService:
    def __init__(self, session: DatabaseSessionDep):
        self.session = session

    def calculate_actual_age(self, birth_info: PersonBirthInfoDto):
        computed_age = 16
        if birth_info.age is not None:
            computed_age = birth_info.age
        elif birth_info.date_of_birth is not None:
            computed_age = datetime.now().year - birth_info.date_of_birth.year
        elif birth_info.date_of_death is not None:
            computed_age = birth_info.date_of_death.year - birth_info.date_of_birth.year

        return computed_age

    def find_or_add_relative(
        self,
        relative: PersonRelativeDto,
        address: PersonAddressDto,
        gender: PersonGender = PersonGender.UNKNOWN,
    ):
        person = None

        if relative.person_id is not None:
            person = self.session.get(Person, relative.person_id)

        if (
            person is None
            and relative.first_name is not None
            and relative.last_name is not None
        ):
            person = self.session.exec(
                select(Person).where(
                    Person.first_name == relative.first_name,
                    Person.last_name == relative.last_name,
                )
            ).first()

        if person is None:
            person = Person(
                first_name=relative.first_name,
                last_name=relative.last_name,
                street_1=address.street_1,
                street_2=address.street_2,
                house_number=address.house_number,
                purok=address.purok,
                barangay=address.barangay,
                city=address.city,
                state=address.state,
                zip_code=address.zip_code,
                date_of_birth=datetime.min,
                gender=gender,
            )

            self.session.add(person)
            self.session.flush()

        return person

    def add_child(self, parent: Person, child: PersonRelativeDto):
        person = None

        if child.person_id is not None:
            person = self.session.get(Person, child.person_id)

        if person is None:
            person = self.session.exec(
                select(Person).where(
                    Person.first_name == child.first_name,
                    Person.last_name == child.last_name,
                )
            ).first()

        father = None
        mother = None

        if parent.gender == PersonGender.MALE:
            father = parent
        elif parent.gender == PersonGender.FEMALE:
            mother = parent

        if person is None:
            person = Person(
                first_name=child.first_name,
                last_name=child.last_name,
                street_1=parent.street_1,
                street_2=parent.street_2,
                house_number=parent.house_number,
                purok=parent.purok,
                barangay=parent.barangay,
                city=parent.city,
                state=parent.state,
                zip_code=parent.zip_code,
                date_of_birth=datetime.min,
                gender=PersonGender.UNKNOWN,
                father_id=father.id if father is not None else None,
                mother_id=mother.id if mother is not None else None,
            )
        else:
            if father is not None and person.father_id is None:
                person.father_id = father.id
            elif mother is not None and person.mother_id is None:
                person.mother_id = mother.id

        self.session.add(person)

        return person

    def add(self, new_person: NewPersonDto):
        birth_info = new_person.birth_info

        father = (
            self.find_or_add_relative(
                new_person.father, new_person.address, PersonGender.MALE
            )
            if new_person.father is not None
            else None
        )

        mother = (
            self.find_or_add_relative(
                new_person.mother, new_person.address, PersonGender.FEMALE
            )
            if new_person.mother is not None
            else None
        )

        spouse = (
            self.find_or_add_relative(
                new_person.spouse,
                new_person.address,
                PersonGender.MALE
                if birth_info.gender == PersonGender.FEMALE
                else PersonGender.FEMALE,
            )
            if new_person.spouse is not None
            else None
        )

        person = Person(
            first_name=new_person.first_name,
            middle_name=new_person.middle_name,
            last_name=new_person.last_name,
            mobile_number=new_person.mobile_number,
            email=new_person.email,
            street_1=new_person.address.street_1,
            street_2=new_person.address.street_2,
            house_number=new_person.address.house_number,
            purok=new_person.address.purok,
            barangay=new_person.address.barangay,
            city=new_person.address.city,
            state=new_person.address.state,
            zip_code=new_person.address.zip_code,
            age=self.calculate_actual_age(birth_info),
            date_of_birth=birth_info.date_of_birth,
            date_of_death=birth_info.date_of_death,
            gender=birth_info.gender,
            father_id=father.id if father is not None else None,
            mother_id=mother.id if mother is not None else None,
            spouse_id=spouse.id if spouse is not None else None,
        )

        self.session.add(person)
        self.session.flush()

        if new_person.children is not None:
            for child in new_person.children:
                self.add_child(person, child)

        return person


PersonServiceDep = Annotated[PersonService, Depends(PersonService)]
