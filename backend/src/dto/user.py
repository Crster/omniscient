from pydantic import BaseModel, EmailStr

class NewUserDto(BaseModel):
    name: str
    email: EmailStr
    role_id: int
    
class UserMasterList(BaseModel):
    user_id: int
    role: str | None
    name: str
    barangay: str
    status: str