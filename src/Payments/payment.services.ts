import db from "../Drizzle/db"
import { eq } from "drizzle-orm";
import {TIPayment, PaymentTable} from "../Drizzle/schema";

export const createPaymentService = async (payment: TIPayment) => {
    const [inserted] = await db.insert(PaymentTable).values(payment).returning();
    if (inserted) {
        return inserted ?? null;
    }
    return null;
    
};

export const getPaymentService = async () => {
    const payment = await db.query.PaymentTable.findMany();
    return payment;
}

export const getPaymentByIdService = async (id: number) => {
    const payment = await db.query.PaymentTable.findFirst({
        where: eq(PaymentTable.paymentID, id)
    })
    return payment;
}

export const UpdatePaymentService = async (id: number, payment: TIPayment) => {
    db.update(PaymentTable).set(payment).where(eq(PaymentTable.paymentID, id)).returning();
    return "Payment updated successfully";
}

export const deletePaymentService = async (id: number) => {
    await db.delete(PaymentTable).where(eq(PaymentTable.paymentID, id)).returning();
    return "Payment deleted successfully";
}