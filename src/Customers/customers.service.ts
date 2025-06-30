import db from "../Drizzle/db"
import { eq } from "drizzle-orm";
import {TICustomer, CustomerTable} from "../Drizzle/schema";

export const createCustomerService = async (customer: TICustomer) => {
    const [inserted] = await db.insert(CustomerTable).values(customer).returning();
    if (inserted) {
        return inserted ?? null;
    }
    return null;
    
};

export const getCustomerService = async () => {
    const customers = await db.query.CustomerTable.findMany();
    return customers;
}

export const getCustomerByIdService = async (id: number) => {
    const customer = await db.query.CustomerTable.findFirst({
        where: eq(CustomerTable.customerID, id)
    })
    return customer;
}

export const UpdateCustomerService = async (id: number, customer: TICustomer) => {
    db.update(CustomerTable).set(customer).where(eq(CustomerTable.customerID, id)).returning();
    return "customer updated successfully";
}

export const deleteCustomerService = async (id: number) => {
    await db.delete(CustomerTable).where(eq(CustomerTable.customerID, id)).returning();
    return "customer deleted successfully";
}

export const getCustomerBookingService = async (customerID: number) => {
    return await db.query.CustomerTable.findFirst({
        where: eq(CustomerTable.customerID, customerID),
        with: {
            bookings: {
                columns: {
                    carID: true,
                    rentalStartDate: true,
                    rentalEndDate: true,
                    totalAmount: true
                }
            }
        }
    })
}