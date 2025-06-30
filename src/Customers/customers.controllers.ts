import { Request, Response } from 'express';
import { 
    createCustomerService, getCustomerBookingService, getCustomerByIdService, getCustomerService, UpdateCustomerService, deleteCustomerService

} from './customers.service';

export const createCustomerController = async(req: Request, res: Response) => {
    try{
        const customer = req.body;

        const newCustomer = await createCustomerService(customer);
        if (!newCustomer) {
            return res.status(400).json({message: "Customer not created"});

        }

        return res.status(201).json({message: "Customer created successfully", customer: newCustomer});



    }catch (error:any) {
        return res.status(500).json({error: error.message });
    }
}

export const getCustomerByIdController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID"});
        }

        const customer = await getCustomerByIdService(id);

        if (!customer) {
            return res.status(404).json ({message: "Customer not found"});
        }
        return res.status(200).json({data: customer});
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const getCustomerController = async (req: Request, res: Response) => {
    try {
        const customers = await getCustomerService()
        if (!customers || customers.length === 0){
            return res.status(404).json({message: "No customer found"});
        }
        return res.status(200).json({data: customers});

    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const UpdateCustomerController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            return res.status(400).json ({message: "Invalid ID"});
        }

        const customer = req.body;

        const existingLocation = await getCustomerByIdService(id);
        if (!existingLocation) {
            return res.status(404).json({message: "customer not found"})
        }

        const updatedCustomer = await UpdateCustomerService(id, customer);
        if (!updatedCustomer) {
            return res.status(400).json({message: "customer not updated"});
        }
        return res.status(200).json({ message: "customer updated successfully", customer: updatedCustomer });

    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }  
}

export const deleteCustomerController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const existingCustomer = await getCustomerByIdService(id);
        if (!existingCustomer) {
            return res.status(404).json({ message: "customer not found" });
        }

        const deleted = await deleteCustomerService(id);
        if (!deleted) {
            return res.status(400).json({ message: "customer not deleted" });
        }

        return res.status(200).json({ message: "customer deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const getCustomerBookingController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID"});
        }

        const customer = await getCustomerBookingService(id);

        if (!customer) {
            return res.status(404).json ({message: "Customer not found"});
        }
        return res.status(200).json({data: customer});
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}