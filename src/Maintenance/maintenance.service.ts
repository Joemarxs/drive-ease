import db from "../Drizzle/db"
import { eq } from "drizzle-orm";
import {TIMaintenance, MaintenanceTable} from "../Drizzle/schema";

export const createMaintenanceService = async (maintenance: TIMaintenance) => {
    const [inserted] = await db.insert(MaintenanceTable).values(maintenance).returning();
    if (inserted) {
        return inserted;
        
    }
    return null;
    
};

export const getMaintenanceService = async () => {
    const maintenance = await db.query.MaintenanceTable.findMany();
    return maintenance;
}

export const getMaintenanceByIdService = async (id: number) => {
    const maintenance = await db.query.MaintenanceTable.findFirst({
        where: eq(MaintenanceTable.maintenanceID, id)
    })
    return maintenance;
}

export const UpdateMaintenanceService = async (id: number, maintenance: TIMaintenance) => {
    db.update(MaintenanceTable).set(maintenance).where(eq(MaintenanceTable.maintenanceID, id)).returning();
    return "maintenance updated successfully";
}

export const deleteMaintenaceService = async (id: number) => {
    await db.delete(MaintenanceTable).where(eq(MaintenanceTable.maintenanceID, id)).returning();
    return "Maintenance deleted successfully";
}