import { Request, Response } from 'express';
import { 
    createCarService,getCarReservationsService, getCarByIdService, getCarService, UpdateCarService, deleteCarService

} from './car.service';

export const createCarController = async(req: Request, res: Response) => {
    try{
        const car = req.body;

        const newCar = await createCarService(car);
        if (!newCar) {
            return res.status(400).json({message: "Car not created"});

        }

        return res.status(201).json({message: "Car created successfully", car: newCar});



    }catch (error:any) {
        return res.status(500).json({error: error.message });
    }
}

export const getCarByIdController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID"});
        }

        const car = await getCarByIdService(id);

        if (!car) {
            return res.status(404).json ({message: "Car not found"});
        }
        return res.status(200).json({data: car});
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const getCarController = async (req: Request, res: Response) => {
    try {
        const cars = await getCarService()
        if (!cars || cars.length === 0){
            return res.status(404).json({message: "No cars found"});
        }
        return res.status(200).json({data: cars});

    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const UpdateCarController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            return res.status(400).json ({message: "Invalid ID"});
        }

        const car = req.body;

        const existingCar = await getCarByIdService(id);
        if (!existingCar) {
            return res.status(404).json({message: "car not found"})
        }

        const updatedCar = await UpdateCarService(id, car);
        if (!updatedCar) {
            return res.status(400).json({message: "car not updated"});
        }
        return res.status(200).json({ message: "car updated successfully" });
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }  
}

export const deleteCarController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const existingCar = await getCarByIdService(id);
        if (!existingCar) {
            return res.status(404).json({ message: "car not found" });
        }

        const deleted = await deleteCarService(id);
        if (!deleted) {
            return res.status(400).json({ message: "car not deleted" });
        }

        return res.status(200).json({ message: "car deleted successfully" });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
export const getCarReservationsController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID"});
        }

        const car = await getCarReservationsService(id);

        if (!car) {
            return res.status(404).json ({message: "Car not found"});
        }
        return res.status(200).json({data: car});
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}
