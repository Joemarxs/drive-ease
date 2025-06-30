import db from "../Drizzle/db"
import { eq } from "drizzle-orm";
import {TILocation, LocationTable} from "../Drizzle/schema";

export const createLocationService = async (customer: TILocation) => {
    const [inserted] = await db.insert(LocationTable).values(customer).returning();
    if (inserted) {
        return inserted ?? null;
    }
    return null;
    
};

export const getLocationService = async () => {
    const locations = await db.query.LocationTable.findMany();
    return locations;
}

export const getLocationByIdService = async (id: number) => {
    const location = await db.query.LocationTable.findFirst({
        where: eq(LocationTable.locationID, id)
    })
    return location;
}

export const UpdateLocationService = async (id: number, location: TILocation) => {
    db.update(LocationTable).set(location).where(eq(LocationTable.locationID, id)).returning();
    return "Location updated successfully";
}

export const deleteLocationService = async (id: number) => {
    await db.delete(LocationTable).where(eq(LocationTable.locationID, id)).returning();
    return "Location deleted successfully";
}