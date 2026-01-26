from pydantic import BaseModel, EmailStr

class CreateUserDto(BaseModel):
    name: str
    email: EmailStr
    password: str
    
class UserListForMainView(BaseModel):
    user_id: int
    role: str | None
    name: str
    barangay: str
    status: str