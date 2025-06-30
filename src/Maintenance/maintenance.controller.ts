import { Request, Response } from 'express';
import { 
    createMaintenanceService, getMaintenanceByIdService, getMaintenanceService, UpdateMaintenanceService, deleteMaintenaceService

} from './maintenance.service';

export const createMaintenanceController = async(req: Request, res: Response) => {
    try{
        const maintenance = req.body;
        console.log(maintenance);

        const newMaintenance = await createMaintenanceService(maintenance);
        if (!newMaintenance) {
            return res.status(400).json({message: "Maintenance not created"});

        }

        return res.status(201).json({message: "Maintenance created successfully", maintenance: newMaintenance});



    }catch (error:any) {
        return res.status(500).json({error: error.message });
    }
}

export const getMaintenanceByIdController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID"});
        }

        const maintenance = await getMaintenanceByIdService(id);

        if (!maintenance) {
            return res.status(404).json ({message: "Maintenance not found"});
        }
        return res.status(200).json({data: maintenance});
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const getMaintenanceController = async (req: Request, res: Response) => {
    try {
        const maintenance = await getMaintenanceService()
        if (!maintenance || maintenance.length === 0){
            return res.status(404).json({message: "No maintenance found"});
        }
        return res.status(200).json({data: maintenance});

    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const UpdateMaintenanceController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            return res.status(400).json ({message: "Invalid ID"});
        }

        const maintenance = req.body;

        const existingLocation = await getMaintenanceByIdService(id);
        if (!existingLocation) {
            return res.status(404).json({message: "Maintenance not found"})
        }

        const updatedMaintenance = await UpdateMaintenanceService(id, maintenance);
        if (!updatedMaintenance) {
            return res.status(400).json({message: "maintenance not updated"});
        }
        return res.status(200).json({Message: "maintenance updated successfully"});
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }  
}

export const deleteMaintenanceController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const existingMaintenance = await getMaintenanceByIdService(id);
        if (!existingMaintenance) {
            return res.status(404).json({ message: "maintenance not found" });
        }

        const deleted = await deleteMaintenaceService(id);
        if (!deleted) {
            return res.status(400).json({ message: "maintenance not deleted" });
        }

        return res.status(204).json({ message: "maintenance deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}