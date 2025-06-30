import db from "../Drizzle/db"
import { eq } from "drizzle-orm";
import {TIBooking, BookingsTable} from "../Drizzle/schema";
import booking from "./bookings.routers";

export const createBookingService = async (booking: TIBooking) => {
    const [inserted] = await db.insert(BookingsTable).values(booking).returning();
    if (inserted) {
        return inserted ?? null;
    }
    return null;
    
};

export const getBookingService = async () => {
    const booking = await db.query.BookingsTable.findMany();
    return booking;
}

export const getBookingByIdService = async (id: number) => {
    const booking = await db.query.BookingsTable.findFirst({
        where: eq(BookingsTable.bookingID, id)
    })
    return booking;
}

export const UpdateBookingService = async (id: number, booking: TIBooking) => {
    db.update(BookingsTable).set(booking).where(eq(BookingsTable.bookingID, id)).returning();
    return "Booking updated successfully";
}

export const deleteBookingService = async (id: number) => {
    await db.delete(BookingsTable).where(eq(BookingsTable.bookingID, id)).returning();
    return "Booking deleted successfully";
}

export const getBookingPaymentService = async (bookingID: number) => {
    return await db.query.BookingsTable.findFirst({
        where: eq(BookingsTable.bookingID, bookingID),
        with: {
            payments: {
                columns: {
                    paymentID: true,
                    paymentMethod: true,
                    amount: true,
                    paymentDate: true
                }
            }
        }
    })
}