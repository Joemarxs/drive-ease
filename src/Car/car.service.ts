import db from "../Drizzle/db"
import { eq } from "drizzle-orm";
import {TICar, CarTable} from "../Drizzle/schema";

export const createCarService = async (car: TICar) => {
    const [inserted] = await db.insert(CarTable).values(car).returning();
    if (inserted) {
        return inserted;
    }
    return null;
    
}

export const getCarService = async () => {
    const cars = await db.query.CarTable.findMany();
    return cars;
}

export const getCarByIdService = async (id: number) => {
    const car = await db.query.CarTable.findFirst({
        where: eq(CarTable.carID, id)
    })
    return car;
}

export const UpdateCarService = async (id: number, car: TICar) => {
    db.update(CarTable).set(car).where(eq(CarTable.carID, id)).returning();
    return "Car updated successfully";
}

export const deleteCarService = async (id: number) => {
    await db.delete(CarTable).where(eq(CarTable.carID, id)).returning();
    return "car deleted successfully";
}
export const getCarReservationsService = async (carID: number) => {
    return await db.query.CarTable.findFirst({
        where: eq(CarTable.carID, carID),
        with: {
            reservations: {
                columns: {
                    pickupDate: true,
                    returnDate: true
                }
            }
        }
    })
}