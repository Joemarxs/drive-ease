import {
    createReservationController, getReservationController, getReservationByIdController, UpdateReservationController, deleteReservationController
} from "./reservation.controllers"

import {Express} from 'express';

const reservation = (app: Express) => {
    app.route('/Reservation').post(
        async (req, res, next ) => {
            try{
                await createReservationController(req, res);

            }catch (error: any) {
                next(error);
            }
        }
    )

    app.route('/Reservation').get(
        async (req, res, next) => {
            try{
                await getReservationController(req, res);

            }catch (error: any){
                next(error);
            }
        }
    )

    app.route('/Reservation/:id').get(
        async (req, res, next) => {
            try {
                await getReservationByIdController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
          
    )

    app.route('/Reservation/:id').put(
        async (req, res, next) => {
            try {
                await UpdateReservationController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )

    app.route('/Reservation/:id').delete(
        async (req, res, next) => {
            try {
                await deleteReservationController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )
}

export default reservation;