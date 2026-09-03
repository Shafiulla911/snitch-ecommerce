import json
from datetime import datetime
from sqlalchemy import Column, String, Float, Boolean, Integer, Text, DateTime
from app.database.connection import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    phone = Column(String(30), nullable=True)
    address = Column(Text, nullable=True)
    role = Column(String(20), default="customer")
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone or "",
            "address": self.address or "",
            "role": self.role,
            "createdAt": self.created_at.isoformat() if self.created_at else None
        }

class ProductModel(Base):
    __tablename__ = "products"

    id = Column(String(50), primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    category = Column(String(50), nullable=False, index=True)
    sub_category = Column(String(50), nullable=True)
    price = Column(Float, nullable=False)
    original_price = Column(Float, nullable=False)
    rating = Column(Float, default=4.8)
    reviews_count = Column(Integer, default=50)
    image = Column(Text, nullable=False)
    hover_image = Column(Text, nullable=True)
    description = Column(Text, nullable=True)
    sizes_json = Column(Text, nullable=True)  # Store JSON array string
    colors_json = Column(Text, nullable=True) # Store JSON array string
    is_new = Column(Boolean, default=True)
    is_best_seller = Column(Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "category": self.category,
            "subCategory": self.sub_category or self.category,
            "price": self.price,
            "originalPrice": self.original_price,
            "rating": self.rating,
            "reviewsCount": self.reviews_count,
            "image": self.image,
            "hoverImage": self.hover_image or self.image,
            "description": self.description or "",
            "sizes": json.loads(self.sizes_json) if self.sizes_json else ["S", "M", "L", "XL"],
            "colors": json.loads(self.colors_json) if self.colors_json else ["Black"],
            "isNew": self.is_new,
            "isBestSeller": self.is_best_seller
        }

class OrderModel(Base):
    __tablename__ = "orders"

    id = Column(String(50), primary_key=True, index=True)
    order_number = Column(String(50), unique=True, nullable=False, index=True)
    user_id = Column(String(50), nullable=False, index=True)
    user_email = Column(String(100), nullable=False)
    items_json = Column(Text, nullable=False) # JSON array of items
    total_amount = Column(Float, nullable=False)
    payment_method = Column(String(50), nullable=False)
    payment_status = Column(String(50), default="COMPLETED")
    shipping_address = Column(Text, nullable=False)
    order_status = Column(String(50), default="CONFIRMED")
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "orderNumber": self.order_number,
            "userId": self.user_id,
            "userEmail": self.user_email,
            "items": json.loads(self.items_json) if self.items_json else [],
            "totalAmount": self.total_amount,
            "paymentMethod": self.payment_method,
            "paymentStatus": self.payment_status,
            "shippingAddress": self.shipping_address,
            "orderStatus": self.order_status,
            "createdAt": self.created_at.isoformat() if self.created_at else None
        }
