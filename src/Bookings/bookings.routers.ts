import {
    createBookingController, getBookingController,getBookingPaymentController, getBookingByIdController, UpdateBookingController, deleteBookingController
} from "./bookings.controller"

import {Express} from 'express';

const booking = (app: Express) => {
    app.route('/Booking').post(
        async (req, res, next ) => {
            try{
                await createBookingController(req, res);

            }catch (error: any) {
                next(error);
            }
        }
    )

    app.route('/Booking').get(
        async (req, res, next) => {
            try{
                await getBookingController(req, res);

            }catch (error: any){
                next(error);
            }
        }
    )

    app.route('/Booking/:id').get(
        async (req, res, next) => {
            try {
                await getBookingByIdController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
          
    )

    app.route('/Booking/:id').put(
        async (req, res, next) => {
            try {
                await UpdateBookingController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )

    app.route('/Booking/:id').delete(
        async (req, res, next) => {
            try {
                await deleteBookingController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )

    app.route('/Booking/payments/:id').get(
        async (req, res, next) => {
            try {
                await getBookingPaymentController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
          
    )
}

export default booking;