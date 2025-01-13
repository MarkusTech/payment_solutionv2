import { Router } from "express";
import { createPayment } from "../controllers/paymentController";

const router = Router();

// Route to create a payment intent
router.post("/create-payment-intent", createPayment);

export default router;
