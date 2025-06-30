import db from "../Drizzle/db"
import { eq } from "drizzle-orm";
import {TIReservation, ReservationTable} from "../Drizzle/schema";

export const createReservationService = async (reservation: TIReservation) => {
    const [inserted] = await db.insert(ReservationTable).values(reservation).returning();
    if (inserted) {
        return inserted ?? null;
    }
    return null;
    
}

export const getReservationService = async () => {
    const reservations = await db.query.ReservationTable.findMany();
    return reservations;
}

export const getReservationByIdService = async (id: number) => {
    const reservation = await db.query.ReservationTable.findFirst({
        where: eq(ReservationTable.reservationID, id)
    })
    return reservation;
    
}

export const UpdateReservationService = async (id: number, reservation: TIReservation) => {
    db.update(ReservationTable).set(reservation).where(eq(ReservationTable.reservationID, id)).returning();
    return "Reservation updated successfully";
}

export const deleteReservationService = async (id: number) => {
    await db.delete(ReservationTable).where(eq(ReservationTable.reservationID, id)).returning();
    return "Reservation deleted successfully";
}