from pydantic import BaseModel, EmailStr
from typing import List, Optional, Any

class UserSignup(BaseModel):
    name: str
    email: str
    password: str
    phone: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class UserProfile(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    avatar: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    pincode: Optional[str] = None

class Product(BaseModel):
    id: str
    title: str
    category: str
    subCategory: Optional[str] = None
    price: float
    originalPrice: Optional[float] = None
    rating: float
    reviewsCount: int
    image: str
    hoverImage: Optional[str] = None
    description: str
    sizes: List[str]
    colors: List[str]
    isNew: bool = False
    isBestSeller: bool = False

class OrderItem(BaseModel):
    product: Any
    selectedSize: str
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItem]
    totalAmount: float
    shippingAddress: Any
    paymentMethod: str
    paymentDetails: Optional[Any] = None

class OrderResponse(BaseModel):
    id: str
    date: str
    status: str
    paymentMethod: str
    items: List[OrderItem]
    totalAmount: float
    shippingAddress: Any
