import { Request, Response } from 'express';
import { 
    createInsuaranceService, getInsuaranceByIdService, getInsuaranceService, UpdateInsuaranceService, deleteInsuaranceService

} from './insuarance.service';

export const createInsuaranceController = async(req: Request, res: Response) => {
    try{
        const insuarance = req.body;

        const newInsuarance = await createInsuaranceService(insuarance);
        if (!newInsuarance) {
            return res.status(400).json({message: "Insuarance not created"});

        }

        return res.status(201).json({message: "Insuarance created successfully", Insuarance: newInsuarance});


    }catch (error:any) {
        return res.status(500).json({error: error.message });
    }
}

export const getInsuaranceByIdController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID"});
        }

        const insuarance = await getInsuaranceByIdService(id);

        if (!insuarance) {
            return res.status(404).json ({message: "Insuarance not found"});
        }
        return res.status(200).json({data: insuarance});
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const getInsuaranceController = async (req: Request, res: Response) => {
    try {
        const insuarance = await getInsuaranceService()
        if (!insuarance || insuarance.length === 0){
            return res.status(404).json({message: "No insuarance found"});
        }
        return res.status(200).json({data: insuarance});

    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const UpdateInsuaranceController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            return res.status(400).json ({message: "Invalid ID"});
        }

        const insuarance = req.body;

        const existingInsuarance = await getInsuaranceByIdService(id);
        if (!existingInsuarance) {
            return res.status(404).json({message: "Insuarance not found"})
        }

        const updatedInsuarance = await UpdateInsuaranceService(id, insuarance);
        if (!updatedInsuarance) {
            return res.status(400).json({message: "Insuarance not updated"});
        }
        return res.status(200).json({
            message: "Insuarance updated successfully", 
            Insuarance: updatedInsuarance                 
            });
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }  
}

export const deleteInsuaranceController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const existingInsuarance = await getInsuaranceByIdService(id);
        if (!existingInsuarance) {
            return res.status(404).json({ message: "insuarance not found" });
        }

        const deleted = await deleteInsuaranceService(id);
        if (!deleted) {
            return res.status(400).json({ message: "insuarance not deleted" });
        }

        return res.status(200).json({ message: "Insuarance deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}