"""
Payment endpoints with Stripe integration
"""

import stripe
from typing import Any, Dict
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.core.auth import get_current_active_user
from app.core.config import settings
from app.core.database import get_db
from app.models.user import User

# Initialize Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

router = APIRouter()

@router.post("/create-payment-intent")
def create_payment_intent(
    *,
    request: Request,
    current_user: User = Depends(get_current_active_user),
) -> Dict[str, Any]:
    """Create Stripe payment intent"""
    try:
        data = await request.json()
        amount = data.get("amount", 0)
        currency = data.get("currency", "usd")

        if amount <= 0:
            raise HTTPException(status_code=400, detail="Invalid amount")

        # Create payment intent
        intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),  # Convert to cents
            currency=currency,
            metadata={"user_id": current_user.id},
        )

        return {
            "client_secret": intent.client_secret,
            "payment_intent_id": intent.id,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request) -> Dict[str, str]:
    """Handle Stripe webhooks"""
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Handle the event
    if event.type == "payment_intent.succeeded":
        payment_intent = event.data.object
        # TODO: Update payment status in database
        print(f"Payment succeeded: {payment_intent.id}")

    return {"status": "success"}

@router.get("/payment-methods")
def get_payment_methods(
    current_user: User = Depends(get_current_active_user),
) -> Dict[str, Any]:
    """Get user's saved payment methods"""
    try:
        # Get or create customer
        customers = stripe.Customer.list(email=current_user.email)
        if customers.data:
            customer = customers.data[0]
        else:
            customer = stripe.Customer.create(
                email=current_user.email,
                name=current_user.full_name,
            )

        # Get payment methods
        payment_methods = stripe.PaymentMethod.list(
            customer=customer.id,
            type="card",
        )

        return {
            "customer_id": customer.id,
            "payment_methods": payment_methods.data,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
