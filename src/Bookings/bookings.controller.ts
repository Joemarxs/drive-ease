import { Request, Response } from 'express';
import { 
    createBookingService, getBookingPaymentService, getBookingByIdService, getBookingService, UpdateBookingService, deleteBookingService

} from './bookings.services';

export const createBookingController = async(req: Request, res: Response) => {
    try{
        const booking = req.body;

        const newBooking = await createBookingService(booking);
        if (!newBooking) {
            return res.status(400).json({message: "Booking not created"});

        }

        return res.status(201).json({message: "Booking created successfully", booking: newBooking});



    }catch (error:any) {
        return res.status(500).json({error: error.message });
    }
}

export const getBookingByIdController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID"});
        }

        const booking = await getBookingByIdService(id);

        if (!booking) {
            return res.status(404).json ({message: "Booking not found"});
        }
        return res.status(200).json({data: booking});
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const getBookingController = async (req: Request, res: Response) => {
    try {
        const booking = await getBookingService()
        if (!booking || booking.length === 0){
            return res.status(404).json({message: "No booking found"});
        }
        return res.status(200).json({data: booking});

    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}

export const UpdateBookingController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            return res.status(400).json ({message: "Invalid ID"});
        }

        const booking = req.body;

        const existingBooking = await getBookingByIdService(id);
        if (!existingBooking) {
            return res.status(404).json({message: "Booking not found"})
        }

        const updatedBooking = await UpdateBookingService(id, booking);
        if (!updatedBooking) {
            return res.status(400).json({message: "Booking not updated"});
        }
        return res.status(200).json({Message: "Booking updated successfully"});
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }  
}

export const deleteBookingController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const existingBooking = await getBookingByIdService(id);
        if (!existingBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const deleted = await deleteBookingService(id);
        if (!deleted) {
            return res.status(400).json({ message: "booking not deleted" });
        }

        return res.status(204).json({ message: "booking deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
export const getBookingPaymentController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({message: "Invalid ID"});
        }

        const car = await getBookingPaymentService(id);

        if (!car) {
            return res.status(404).json ({message: "Booking not found"});
        }
        return res.status(200).json({data: car});
    }catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}