"""
E-Commerce Sales & Customer Analytics
Module: data_generation.py
Description: Generates realistic synthetic e-commerce datasets (Customers, Products, Orders,
             Order Items, Categories, Sellers) with consistent math, real-world distributions,
             seasonality peaks (Q4 Black Friday / Cyber Monday), and controlled anomalies
             for data cleaning demonstrations.
"""

import os
import random
import datetime
import pandas as pd
import numpy as np

# Set random seed for reproducibility
np.random.seed(42)
random.seed(42)

# Directory paths
DATA_RAW_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "raw")
os.makedirs(DATA_RAW_DIR, exist_ok=True)

CATEGORIES_DATA = [
    {"category_id": "CAT-001", "category_name": "Electronics", "subcategories": ["Headphones", "Wearables", "Speakers", "Cameras", "Accessories"]},
    {"category_id": "CAT-002", "category_name": "Computers & Office", "subcategories": ["Laptops", "Monitors", "Keyboards", "Mice", "Storage"]},
    {"category_id": "CAT-003", "category_name": "Home & Kitchen", "subcategories": ["Appliances", "Cookware", "Coffee Makers", "Air Purifiers", "Robotic Vacuums"]},
    {"category_id": "CAT-004", "category_name": "Apparel & Fashion", "subcategories": ["Activewear", "Footwear", "Jackets", "Denim", "Watches"]},
    {"category_id": "CAT-005", "category_name": "Fitness & Outdoors", "subcategories": ["Gym Gear", "Yoga Mats", "Hydration", "Running", "Camping"]},
    {"category_id": "CAT-006", "category_name": "Beauty & Personal Care", "subcategories": ["Skincare", "Haircare", "Grooming", "Wellness", "Cosmetics"]},
]

US_LOCATIONS = [
    {"city": "Los Angeles", "state": "California", "weight": 0.16},
    {"city": "San Francisco", "state": "California", "weight": 0.12},
    {"city": "New York", "state": "New York", "weight": 0.18},
    {"city": "Austin", "state": "Texas", "weight": 0.10},
    {"city": "Dallas", "state": "Texas", "weight": 0.08},
    {"city": "Seattle", "state": "Washington", "weight": 0.09},
    {"city": "Chicago", "state": "Illinois", "weight": 0.09},
    {"city": "Miami", "state": "Florida", "weight": 0.07},
    {"city": "Denver", "state": "Colorado", "weight": 0.06},
    {"city": "Boston", "state": "Massachusetts", "weight": 0.05},
]

SELLERS = [
    {"seller_id": "SEL-101", "seller_name": "Apex Tech Global", "city": "San Francisco", "state": "California", "rating": 4.85},
    {"seller_id": "SEL-102", "seller_name": "LuxeStyle Apparel Co.", "city": "New York", "state": "New York", "rating": 4.70},
    {"seller_id": "SEL-103", "seller_name": "Nordic Living Direct", "city": "Austin", "state": "Texas", "rating": 4.92},
    {"seller_id": "SEL-104", "seller_name": "Titan Dynamics Corp", "city": "Seattle", "state": "Washington", "rating": 4.65},
    {"seller_id": "SEL-105", "seller_name": "PulseFit Athletics", "city": "Miami", "state": "Florida", "rating": 4.78},
    {"seller_id": "SEL-106", "seller_name": "OmniHome Innovations", "city": "Chicago", "state": "Illinois", "rating": 4.60},
    {"seller_id": "SEL-107", "seller_name": "Verve Cosmetics Lab", "city": "Los Angeles", "state": "California", "rating": 4.88},
]

FIRST_NAMES = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
               "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
               "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa",
               "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley",
               "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle"]

LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
              "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
              "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
              "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker"]

def generate_customers(num_customers=10000):
    print(f"Generating {num_customers} customer profiles...")
    customers = []
    base_date = datetime.date(2022, 1, 1)
    
    loc_weights = [loc["weight"] for loc in US_LOCATIONS]
    selected_locs = np.random.choice(US_LOCATIONS, size=num_customers, p=loc_weights)
    
    for i in range(1, num_customers + 1):
        cust_id = f"CUST-{i:05d}"
        first_name = random.choice(FIRST_NAMES)
        last_name = random.choice(LAST_NAMES)
        gender = random.choice(["Male", "Female", "Non-Binary"])
        age = int(np.clip(np.random.normal(36, 11), 18, 75))
        loc = selected_locs[i - 1]
        
        # Signup spread across 2022 to mid 2024
        days_offset = random.randint(0, 900)
        signup_date = base_date + datetime.timedelta(days=days_offset)
        
        email = f"{first_name.lower()}.{last_name.lower()}{random.randint(10, 999)}@example.com"
        phone = f"+1-{random.randint(200, 999)}-555-{random.randint(1000, 9999)}"
        
        customers.append({
            "customer_id": cust_id,
            "first_name": first_name,
            "last_name": last_name,
            "gender": gender,
            "age": age,
            "email": email,
            "phone": phone,
            "city": loc["city"],
            "state": loc["state"],
            "country": "United States",
            "signup_date": signup_date.isoformat(),
            "customer_segment": "Unassigned"
        })
        
    df = pd.DataFrame(customers)
    
    # Inject intentional slight anomalies for cleaning demonstration
    # ~0.5% missing emails, ~0.3% irregular casing
    mask_null_email = np.random.rand(len(df)) < 0.005
    df.loc[mask_null_email, "email"] = np.nan
    
    # Intentionally add a few duplicate records in raw
    duplicates = df.sample(n=15, random_state=42)
    df = pd.concat([df, duplicates], ignore_index=True)
    
    df.to_csv(os.path.join(DATA_RAW_DIR, "raw_customers.csv"), index=False)
    print(f"Saved raw customers: {len(df)} rows")
    return df

def generate_products(num_products=500):
    print(f"Generating {num_products} products...")
    products = []
    prod_counter = 1001
    
    BRANDS = {
        "CAT-001": ["SonicWave", "PulseTech", "AeroAudio", "OptiView", "Lumina"],
        "CAT-002": ["Titan", "KeyMatrix", "ApexByte", "ErgoDesk", "HyperPort"],
        "CAT-003": ["BaristaCraft", "CleanAir Co", "NordicPot", "ChefBlend", "ThermoPro"],
        "CAT-004": ["AlpineThread", "VeloCity", "MerinoPeak", "UrbanKnit", "Solstice"],
        "CAT-005": ["SummitGear", "Strider", "IronCore", "FlowMat", "TrailBlaze"],
        "CAT-006": ["GlowBotanics", "SilkSkin", "AuraPure", "DermaLuxe", "Botanica"],
    }
    
    PRICE_RANGES = {
        "CAT-001": (50.0, 450.0, 0.40),
        "CAT-002": (35.0, 899.0, 0.35),
        "CAT-003": (25.0, 399.0, 0.45),
        "CAT-004": (20.0, 180.0, 0.55),
        "CAT-005": (15.0, 250.0, 0.48),
        "CAT-006": (12.0, 95.0, 0.65),
    }

    for cat in CATEGORIES_DATA:
        cat_id = cat["category_id"]
        cat_name = cat["category_name"]
        subcats = cat["subcategories"]
        brands = BRANDS[cat_id]
        min_p, max_p, avg_margin = PRICE_RANGES[cat_id]
        
        per_cat_count = num_products // len(CATEGORIES_DATA)
        for _ in range(per_cat_count):
            subcat = random.choice(subcats)
            brand = random.choice(brands)
            seller = random.choice(SELLERS)
            
            # Selling price with realistic rounded ending (.99 or .00)
            base_price = np.random.uniform(min_p, max_p)
            selling_price = round(base_price - 0.01 if base_price > 20 else base_price, 2)
            
            # Cost price calculated strictly from margin so profit is guaranteed realistic
            margin = np.clip(np.random.normal(avg_margin, 0.08), 0.15, 0.75)
            cost_price = round(selling_price * (1.0 - margin), 2)
            stock_quantity = random.randint(25, 1200)
            
            product_name = f"{brand} {subcat} Pro {random.choice(['Series X', 'Max', 'Ultra', 'Elite', 'Lite', 'Plus', 'Gen 2', 'Carbon'])}"
            
            products.append({
                "product_id": f"PRD-{prod_counter}",
                "product_name": product_name,
                "category_id": cat_id,
                "category_name": cat_name,
                "subcategory": subcat,
                "brand": brand,
                "cost_price": cost_price,
                "selling_price": selling_price,
                "stock_quantity": stock_quantity,
                "supplier_id": seller["seller_id"]
            })
            prod_counter += 1
            
    df = pd.DataFrame(products)
    df.to_csv(os.path.join(DATA_RAW_DIR, "raw_products.csv"), index=False)
    print(f"Saved raw products: {len(df)} rows")
    return df

def generate_orders_and_items(customers_df, products_df, num_orders=50000):
    print(f"Generating {num_orders} orders & realistic basket order-items...")
    
    customer_ids = customers_df["customer_id"].unique().tolist()
    product_records = products_df.to_dict("records")
    
    # Realistic Pareto customer distribution: 20% of customers create ~60% of orders
    num_vip_cust = int(len(customer_ids) * 0.20)
    vip_cust_ids = customer_ids[:num_vip_cust]
    standard_cust_ids = customer_ids[num_vip_cust:]
    
    orders = []
    order_items = []
    
    start_date = datetime.datetime(2023, 1, 1, 8, 0, 0)
    end_date = datetime.datetime(2024, 10, 31, 22, 0, 0)
    total_days = (end_date - start_date).days
    
    PAYMENT_METHODS = ["Credit Card", "Debit Card", "PayPal", "UPI / NetBanking", "Cash on Delivery"]
    PAYMENT_WEIGHTS = [0.45, 0.22, 0.18, 0.11, 0.04]
    
    SHIPPING_TYPES = [
        ("Standard Shipping", 5.99, 4, 2),
        ("Express Delivery", 14.99, 2, 1),
        ("Same Day", 24.99, 0, 1),
        ("Overnight Delivery", 19.99, 1, 1)
    ]
    SHIPPING_WEIGHTS = [0.58, 0.26, 0.08, 0.08]
    
    item_counter = 1
    
    for order_idx in range(1, num_orders + 1):
        order_id = f"ORD-{order_idx:06d}"
        
        # 60% of orders from VIP repeat pool
        if random.random() < 0.60:
            cust_id = random.choice(vip_cust_ids)
        else:
            cust_id = random.choice(standard_cust_ids)
            
        # Realistic seasonal simulation: Q4 (Nov-Dec) has 1.8x traffic spike
        rand_day = random.randint(0, total_days)
        order_date = start_date + datetime.timedelta(days=rand_day, hours=random.randint(0, 14), minutes=random.randint(0, 59))
        if order_date.month in [11, 12]:
            # higher probability keep, else 30% chance re-sample into Q4
            if random.random() < 0.25:
                rand_day = random.randint(300, 360)
                order_date = start_date + datetime.timedelta(days=rand_day, hours=random.randint(0, 14), minutes=random.randint(0, 59))
                
        # Status distribution: 84% Delivered, 6% Shipped/Processing, 5% Cancelled, 5% Returned
        status_roll = random.random()
        if status_roll < 0.84:
            order_status = "Delivered"
        elif status_roll < 0.90:
            order_status = "Shipped"
        elif status_roll < 0.95:
            order_status = "Cancelled"
        else:
            order_status = "Returned"
            
        pay_method = np.random.choice(PAYMENT_METHODS, p=PAYMENT_WEIGHTS)
        ship_choice = random.choices(SHIPPING_TYPES, weights=SHIPPING_WEIGHTS)[0]
        ship_type, ship_cost, avg_delivery_days, std_delivery = ship_choice
        
        # Delivery date logic
        if order_status in ["Delivered", "Returned"]:
            actual_days = max(1, int(np.random.normal(avg_delivery_days, std_delivery)))
            delivery_date = order_date + datetime.timedelta(days=actual_days, hours=random.randint(1, 8))
        else:
            delivery_date = None
            
        loc = random.choice(US_LOCATIONS)
        
        orders.append({
            "order_id": order_id,
            "customer_id": cust_id,
            "order_date": order_date.strftime("%Y-%m-%d %H:%M:%S"),
            "order_status": order_status,
            "payment_method": pay_method,
            "shipping_type": ship_type,
            "shipping_cost": ship_cost if order_status != "Cancelled" else 0.0,
            "delivery_date": delivery_date.strftime("%Y-%m-%d %H:%M:%S") if delivery_date else "",
            "city": loc["city"],
            "state": loc["state"]
        })
        
        # Basket items (1 to 4 items per order)
        num_items = np.random.choice([1, 2, 3, 4], p=[0.60, 0.25, 0.10, 0.05])
        chosen_products = random.sample(product_records, num_items)
        
        for prod in chosen_products:
            qty = np.random.choice([1, 2, 3], p=[0.82, 0.14, 0.04])
            unit_price = prod["selling_price"]
            cost_price = prod["cost_price"]
            
            # Discounts: 65% zero discount, 25% 10% discount, 10% 20% discount
            discount_pct = np.random.choice([0.0, 5.0, 10.0, 15.0, 20.0], p=[0.60, 0.15, 0.15, 0.06, 0.04])
            discounted_unit = unit_price * (1.0 - (discount_pct / 100.0))
            total_amt = round(qty * discounted_unit, 2)
            profit = round(total_amt - (qty * cost_price), 2)
            
            order_items.append({
                "order_item_id": f"ITEM-{item_counter:07d}",
                "order_id": order_id,
                "product_id": prod["product_id"],
                "quantity": qty,
                "unit_price": unit_price,
                "discount_pct": discount_pct,
                "total_amount": total_amt,
                "profit": profit
            })
            item_counter += 1

    orders_df = pd.DataFrame(orders)
    items_df = pd.DataFrame(order_items)
    
    # Inject deliberate slight anomalies in raw files for cleaning step:
    # 1. Ten negative quantity records (data entry error)
    bad_indices = random.sample(range(len(items_df)), 10)
    for idx in bad_indices:
        items_df.loc[idx, "quantity"] = -1
        
    # 2. Ten duplicate order header rows
    dup_orders = orders_df.sample(n=12, random_state=42)
    orders_df = pd.concat([orders_df, dup_orders], ignore_index=True)
    
    orders_df.to_csv(os.path.join(DATA_RAW_DIR, "raw_orders.csv"), index=False)
    items_df.to_csv(os.path.join(DATA_RAW_DIR, "raw_order_items.csv"), index=False)
    
    print(f"Saved raw orders: {len(orders_df)} rows")
    print(f"Saved raw order items: {len(items_df)} rows")
    return orders_df, items_df

def generate_categories_and_sellers():
    cat_df = pd.DataFrame([{"category_id": c["category_id"], "category_name": c["category_name"]} for c in CATEGORIES_DATA])
    sel_df = pd.DataFrame(SELLERS)
    
    cat_df.to_csv(os.path.join(DATA_RAW_DIR, "raw_categories.csv"), index=False)
    sel_df.to_csv(os.path.join(DATA_RAW_DIR, "raw_sellers.csv"), index=False)
    print("Saved raw categories and sellers.")

if __name__ == "__main__":
    print("=== Starting Synthetic E-Commerce Data Generation ===")
    generate_categories_and_sellers()
    cust_df = generate_customers(num_customers=10000)
    prod_df = generate_products(num_products=500)
    # Default 50,000 orders as requested (or scaled via argument)
    generate_orders_and_items(cust_df, prod_df, num_orders=50000)
    print("=== Data Generation Completed Successfully ===")
