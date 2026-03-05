import os
import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import stripe
from dotenv import load_dotenv

load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
allowed_origins = [origin.strip() for origin in FRONTEND_URL.split(",")]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


class CartItem(BaseModel):
    name: str
    price: str
    quantity: int


class CheckoutRequest(BaseModel):
    items: list[CartItem]


@app.post("/api/checkout")
async def create_checkout_session(request: CheckoutRequest):
    line_items = []

    for item in request.items:
        match = re.search(r"[\d.]+", item.price)
        if not match:
            # "Ask for price" items — skip from automated checkout
            continue
        amount_cents = int(float(match.group()) * 100)
        line_items.append({
            "price_data": {
                "currency": "usd",
                "product_data": {"name": item.name},
                "unit_amount": amount_cents,
            },
            "quantity": item.quantity,
        })

    if not line_items:
        raise HTTPException(status_code=400, detail="No priceable items in cart")

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=line_items,
        mode="payment",
        success_url=f"{FRONTEND_URL}/success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{FRONTEND_URL}/cart",
    )

    return {"url": session.url}
