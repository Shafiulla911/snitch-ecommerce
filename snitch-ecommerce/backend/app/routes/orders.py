import json
import uuid
import random
from datetime import datetime
from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from app.models.schemas import OrderCreate
from app.database.connection import get_db
from app.database.models import OrderModel

router = APIRouter(prefix="/api/orders", tags=["Orders"])

@router.post("", response_model=dict)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    order_id = f"ord_{str(uuid.uuid4())[:8]}"
    order_number = f"SNITCH-ORD-{random.randint(100000, 999999)}"
    now_str = datetime.now().strftime("%b %d, %Y")
    
    items_list = [item.dict() for item in order.items]
    
    order_obj = OrderModel(
        id=order_id,
        order_number=order_number,
        user_id="user-demo-guest",
        user_email="guest@snitch.co",
        items_json=json.dumps(items_list),
        total_amount=float(order.totalAmount),
        payment_method=order.paymentMethod,
        payment_status="COMPLETED",
        shipping_address=order.shippingAddress,
        order_status="Placed",
        created_at=datetime.utcnow()
    )
    
    db.add(order_obj)
    db.commit()
    db.refresh(order_obj)

    return {
        "id": order_obj.order_number,
        "date": now_str,
        "status": order_obj.order_status,
        "paymentMethod": order_obj.payment_method,
        "items": items_list,
        "totalAmount": order_obj.total_amount,
        "shippingAddress": order_obj.shipping_address
    }

@router.get("", response_model=List[dict])
def get_user_orders(db: Session = Depends(get_db)):
    orders = db.query(OrderModel).order_by(OrderModel.created_at.desc()).all()
    
    formatted_orders = []
    for o in orders:
        items = json.loads(o.items_json) if o.items_json else []
        date_str = o.created_at.strftime("%b %d, %Y") if o.created_at else "Today"
        formatted_orders.append({
            "id": o.order_number,
            "date": date_str,
            "status": o.order_status,
            "paymentMethod": o.payment_method,
            "items": items,
            "totalAmount": o.total_amount,
            "shippingAddress": o.shipping_address
        })
        
    return formatted_orders
