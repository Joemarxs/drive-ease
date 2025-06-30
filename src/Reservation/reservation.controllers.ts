import { Request, Response } from 'express';
import { 
    createReservationService, getReservationByIdService, getReservationService, UpdateReservationService, deleteReservationService

} from './reservation.service';

export const createReservationController = async(req: Request, res: Response) => {
    try{
        const reservation = req.body;

        const newReservation = await createReservationService(reservation);
        if (!newReservation) {
            return res.status(400).json({messae: "Reservation not created"});

        }

        return res.status(201).json({message: "Reservation created successfully", reservation: newReservation});



    }catch (error:any) {
        return res.status(500).json({error: error.message });
    }
}

export const getReservationByIdController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID"});
        }

        const reservation = await getReservationByIdService(id);

        if (!reservation) {
            return res.status(404).json ({message: "Reservation not found"});
        }
        return res.status(200).json({data: reservation});
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const getReservationController = async (req: Request, res: Response) => {
    try {
        const reservations = await getReservationService()
        if (!reservations || reservations.length === 0){
            return res.status(404).json({message: "No reservations found"});
        }
        return res.status(200).json({data: reservations});

    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const UpdateReservationController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            return res.status(400).json ({message: "Invalid ID"});
        }

        const reservation = req.body;

        const existingCar = await getReservationByIdService(id);
        if (!existingCar) {
            return res.status(404).json({message: "reservation not found"})
        }

        const updatedReservation = await UpdateReservationService(id, reservation);
        if (!updatedReservation) {
            return res.status(400).json({message: "reservation not updated"});
        }
        return res.status(200).json({
            message: "Reservation updated successfully", 
            Insuarance: updatedReservation                 
            });
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }  
}

export const deleteReservationController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const existingReservation = await getReservationByIdService(id);
        if (!existingReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        const deleted = await deleteReservationService(id);

        if (!deleted) {
            return res.status(400).json({ message: "Reservation not deleted" });
        }

        return res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}