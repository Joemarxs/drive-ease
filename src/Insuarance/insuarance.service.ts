import db from "../Drizzle/db"
import { eq } from "drizzle-orm";
import {TIInsurance, InsuranceTable} from "../Drizzle/schema";

export const createInsuaranceService = async (insurance: TIInsurance) => {
    const [inserted] = await db.insert(InsuranceTable).values(insurance).returning();
    if (inserted) {
        return inserted ?? null;
    }
    return null;
    
};

export const getInsuaranceService = async () => {
    const Insuarance = await db.query.InsuranceTable.findMany();
    return Insuarance;
}

export const getInsuaranceByIdService = async (id: number) => {
    const Insuarance = await db.query.InsuranceTable.findFirst({
        where: eq(InsuranceTable.insuranceID, id)
    })
    return Insuarance;
}

export const UpdateInsuaranceService = async (id: number, Insuarance: TIInsurance) => {
    db.update(InsuranceTable).set(Insuarance).where(eq(InsuranceTable.insuranceID, id)).returning();
    return "Insuarance updated successfully";
}

export const deleteInsuaranceService = async (id: number) => {
    await db.delete(InsuranceTable).where(eq(InsuranceTable.insuranceID, id)).returning();
    console.log(id);
    return "Insuarance deleted successfully";
}