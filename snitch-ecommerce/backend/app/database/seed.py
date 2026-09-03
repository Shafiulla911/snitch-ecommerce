import json
import logging
from app.database.connection import engine, SessionLocal, Base
from app.database.models import ProductModel, UserModel
from app.database.db import PRODUCTS_DB

logger = logging.getLogger("snitch_seed")

def init_db():
    """Create tables and seed initial catalog items if table is empty."""
    logger.info("Ensuring database tables exist...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # 1. Seed Products if empty
        existing_products_count = db.query(ProductModel).count()
        if existing_products_count == 0:
            logger.info(f"Seeding {len(PRODUCTS_DB)} initial streetwear products into Database...")
            for p in PRODUCTS_DB:
                product_obj = ProductModel(
                    id=p["id"],
                    title=p["title"],
                    category=p["category"],
                    sub_category=p.get("subCategory", p["category"]),
                    price=float(p["price"]),
                    original_price=float(p["originalPrice"]),
                    rating=float(p.get("rating", 4.8)),
                    reviews_count=int(p.get("reviewsCount", 50)),
                    image=p["image"],
                    hover_image=p.get("hoverImage", p["image"]),
                    description=p.get("description", ""),
                    sizes_json=json.dumps(p.get("sizes", ["S", "M", "L", "XL"])),
                    colors_json=json.dumps(p.get("colors", ["Black"])),
                    is_new=bool(p.get("isNew", True)),
                    is_best_seller=bool(p.get("isBestSeller", False))
                )
                db.add(product_obj)
            db.commit()
            logger.info("Successfully seeded products!")

        # 2. Seed Demo User if empty
        demo_user = db.query(UserModel).filter(UserModel.email == "guest@snitch.co").first()
        if not demo_user:
            logger.info("Creating demo guest user account (guest@snitch.co)...")
            user_obj = UserModel(
                id="user-demo-guest",
                name="Guest Fashionista",
                email="guest@snitch.co",
                password_hash="guest123", # Simple hash/raw password for demo
                phone="+91 9876543210",
                address="742 Evergreen Terrace, Fashion District, Mumbai, Maharashtra 400001",
                role="customer"
            )
            db.add(user_obj)
            db.commit()
            logger.info("Successfully seeded demo user!")

    except Exception as e:
        logger.error(f"Error during database initialization/seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
