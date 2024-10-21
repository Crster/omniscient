import { WithId } from "mongodb";

import { Gender } from "../Data/Gender";
import { CivilStatus } from "../Data/CivilStatus";

import { VoterEntity } from "./VoterEntity";

import { OnlyRequired } from "@/libraries/OnlyRequired";

export class Voter {
  private _value = new Map<string, any>();

  public static fromRepository(entity: WithId<VoterEntity>) {
    const voter = new Voter();

    voter._value.set("voterId", entity._id.toString());
    voter._value.set("name", entity.name);
    voter._value.set("address", entity.address);
    voter._value.set("mobileNo", entity.mobileNo);
    voter._value.set("email", entity.email);
    voter._value.set("precinctNo", entity.precinctNo);
    voter._value.set("gender", entity.gender);
    voter._value.set("placeOfBirth", entity.placeOfBirth);
    voter._value.set("civilStatus", entity.civilStatus);
    voter._value.set("citizenship", entity.citizenship);
    voter._value.set("occupation", entity.occupation);
    voter._value.set("tin", entity.tin);
    voter._value.set("socialGroup", entity.socialGroup);
    voter._value.set("family", entity.family);

    return voter;
  }

  constructor(value?: OnlyRequired<VoterEntity>) {
    if (value) {
      this.name = value.name;
      this.address = value.address;
      this.precinctNo = value.precinctNo;
    }
  }

  toEntity() {
    return VoterEntity.parse(this._value);
  }

  get voterId(): string {
    return this._value.get("voterId");
  }

  get name(): VoterEntity["name"] {
    return this._value.get("name");
  }

  set name(value: VoterEntity["name"]) {
    this._value.set("name", VoterEntity.shape.name.parse(value));
  }

  get fullName(): string {
    if (this.name.middleName) {
      return `${this.name.lastName},  ${this.name.lastName} ${this.name.middleName.charAt(0)}`;
    } else {
      return `${this.name.lastName},  ${this.name.lastName}`;
    }
  }

  get address(): VoterEntity["address"] {
    return this._value.get("address");
  }

  set address(value: VoterEntity["address"]) {
    this._value.set("address", VoterEntity.shape.address.parse(value));
  }

  get mobileNo(): string {
    return this._value.get("mobileNo");
  }

  set mobileNo(value: string) {
    this._value.set("mobileNo", VoterEntity.shape.mobileNo.parse(value));
  }

  get email(): string {
    return this._value.get("email");
  }

  set email(value: string) {
    this._value.set("email", VoterEntity.shape.email.parse(value));
  }

  get precinctNo(): string {
    return this._value.get("precinctNo");
  }

  set precinctNo(value: string) {
    this._value.set("precinctNo", VoterEntity.shape.precinctNo.parse(value));
  }

  get gender(): Gender {
    return this._value.get("gender");
  }

  set gender(value: Gender) {
    this._value.set("gender", VoterEntity.shape.gender.parse(value));
  }

  get placeOfBirth(): VoterEntity["placeOfBirth"] {
    return this._value.get("placeOfBirth");
  }

  set placeOfBirth(value: VoterEntity["placeOfBirth"]) {
    this._value.set("placeOfBirth", VoterEntity.shape.placeOfBirth.parse(value));
  }

  get civilStatus(): CivilStatus {
    return this._value.get("civilStatus");
  }

  set civilStatus(value: CivilStatus) {
    this._value.set("civilStatus", VoterEntity.shape.civilStatus.parse(value));
  }

  get occupation(): string {
    return this._value.get("occupation");
  }

  set occupation(value: string) {
    this._value.set("occupation", VoterEntity.shape.occupation.parse(value));
  }

  get tin(): string {
    return this._value.get("tin");
  }

  set tin(value: string) {
    this._value.set("tin", VoterEntity.shape.tin.parse(value));
  }

  get socialGroup(): VoterEntity["socialGroup"] {
    return this._value.get("socialGroup");
  }

  set socialGroup(value: VoterEntity["socialGroup"]) {
    this._value.set("socialGroup", VoterEntity.shape.socialGroup.parse(value));
  }

  get family(): VoterEntity["family"] {
    return this._value.get("family");
  }

  set family(value: VoterEntity["family"]) {
    this._value.set("family", VoterEntity.shape.family.parse(value));
  }
}
