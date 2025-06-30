import { Request, Response } from 'express';
import { 
    createPaymentService, getPaymentByIdService, getPaymentService, UpdatePaymentService, deletePaymentService

} from './payment.services';

export const createPaymentController = async(req: Request, res: Response) => {
    try{
        const payment = req.body;

        const newPayment = await createPaymentService(payment);
        if (!newPayment) {
            return res.status(400).json({message: "Payment not created"});

        }

        return res.status(201).json({message: "Payment created successfully", payment: newPayment});



    }catch (error:any) {
        return res.status(500).json({error: error.message });
    }
}

export const getPaymentByIdController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID"});
        }

        const payment = await getPaymentByIdService(id);

        if (!payment) {
            return res.status(404).json ({message: "Payment not found"});
        }
        return res.status(200).json({data: payment});
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const getPaymentController = async (req: Request, res: Response) => {
    try {
        const payment = await getPaymentService()
        if (!payment || payment.length === 0){
            return res.status(404).json({message: "No payment found"});
        }
        return res.status(200).json({data: payment});

    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const UpdatePaymentController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            return res.status(400).json ({message: "Invalid ID"});
        }

        const payment = req.body;

        const existingPayment = await getPaymentByIdService(id);
        if (!existingPayment) {
            return res.status(404).json({message: "Payment not found"})
        }

        const updatedPayment = await UpdatePaymentService(id, payment);
        if (!updatedPayment) {
            return res.status(400).json({message: "Payment not updated"});
        }
         return res.status(200).json({
            message: "Payment updated successfully", 
            Payment: updatedPayment                 
            });
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }  
}

export const deletePaymentController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        console.log(id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const existingPayment = await getPaymentByIdService(id);
        if (!existingPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        const deleted = await deletePaymentService(id);
        if (!deleted) {
            return res.status(400).json({ message: "Payment not deleted" });
        }

        return res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}