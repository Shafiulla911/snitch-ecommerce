from fastapi import APIRouter, Query, HTTPException, Depends
from typing import List, Optional
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.database.models import ProductModel

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.get("", response_model=List[dict])
def get_products(
    category: Optional[str] = Query(None), 
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(ProductModel)
    
    if category and category != 'all':
        query = query.filter(ProductModel.category == category)
        
    products = query.all()
    result = [p.to_dict() for p in products]
    
    if search:
        term = search.lower()
        result = [
            p for p in result 
            if term in p["title"].lower() or term in p["category"].lower() or term in p["description"].lower()
        ]
        
    return result

@router.get("/{product_id}", response_model=dict)
def get_product_by_id(product_id: str, db: Session = Depends(get_db)):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product.to_dict()
