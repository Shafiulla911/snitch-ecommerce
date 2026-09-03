import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("snitch_db")

# Default MySQL URL (overridable via environment variable DATABASE_URL or MYSQL_URL)
DEFAULT_MYSQL_URL = os.getenv(
    "DATABASE_URL", 
    os.getenv("MYSQL_URL", "mysql+pymysql://root:password@localhost:3306/snitch_db")
)
SQLITE_FALLBACK_URL = "sqlite:///./snitch.db"

def init_engine():
    """Attempt MySQL connection; fallback to SQLite if MySQL service is unavailable."""
    try:
        if "mysql" in DEFAULT_MYSQL_URL:
            logger.info(f"Attempting MySQL connection to: {DEFAULT_MYSQL_URL.split('@')[-1]}")
            engine = create_engine(
                DEFAULT_MYSQL_URL, 
                pool_pre_ping=True, 
                pool_recycle=3600,
                connect_args={"connect_timeout": 3}
            )
            # Test connection
            with engine.connect() as conn:
                logger.info("Successfully connected to MySQL Database (snitch_db)!")
            return engine, "MySQL"
    except Exception as e:
        logger.warning(f"Could not connect to MySQL server ({e}). Falling back to local SQLite database.")

    logger.info("Initializing fallback SQLite database (snitch.db)...")
    engine = create_engine(SQLITE_FALLBACK_URL, connect_args={"check_same_thread": False})
    return engine, "SQLite"

engine, DB_TYPE = init_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """FastAPI Dependency for database session injection."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
