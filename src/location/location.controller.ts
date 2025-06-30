import { Request, Response } from 'express';
import { 
    createLocationService, getLocationByIdService, getLocationService, UpdateLocationService, deleteLocationService

} from './location.service';

export const createLocationController = async (req: Request, res: Response) => {
    try{
        const location = req.body;

        const newLocation = await createLocationService(location);
        if (!newLocation) {
            return res.status(400).json({message: "Location not created"});

        }

        return res.status(201).json({message: "Location created successfully", location: newLocation});



    }catch (error:any) {
        return res.status(500).json({error: error.message });
    }
}

export const getLocationByIdController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID"});
        }

        const location = await getLocationByIdService(id);

        if (!location) {
            return res.status(404).json ({message: "Location not found"});
        }
        return res.status(200).json({data: location});
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const getLocationController = async (req: Request, res: Response) => {
    try {
        const locations = await getLocationService()
        if (!locations || locations.length === 0){
            return res.status(404).json({message: "No Location found"});
        }
        return res.status(200).json({data: locations});

    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const UpdateLocationController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            return res.status(400).json ({message: "Invalid ID"});
        }

        const location = req.body;

        const existingLocation = await getLocationByIdService(id);
        if (!existingLocation) {
            return res.status(404).json({message: "Location not found"})
        }

        const updatedLocation = await UpdateLocationService(id, location);
        if (!updatedLocation) {
            return res.status(400).json({message: "Location not updated"});
        }
        return res.status(200).json({
            message: "Location updated successfully", // lowercase "m"
            location: updatedLocation                 // return the updated location object
            });

    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }  
}

export const deleteLocationController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const existingLocation = await getLocationByIdService(id);
        if (!existingLocation) {
            return res.status(404).json({ message: "Location not found" });
        }

        const deleted = await deleteLocationService(id);
        if (!deleted) {
            return res.status(400).json({ message: "Location not deleted" });
        }

        return res.status(200).json({ message: "Location deleted successfully" });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}