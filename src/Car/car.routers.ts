import {Express} from 'express';
import {
    createCarController, getCarReservationsController, getCarController, getCarByIdController, UpdateCarController, deleteCarController
} from "./car.controllers"


const car = (app: Express) => {
    app.route('/Car').post(
        async (req, res, next ) => {
            try{
                await createCarController(req, res);

            }catch (error: any) {
                next(error);
            }
        }
    )

    app.route('/Car').get(
        async (req, res, next) => {
            try{
                await getCarController(req, res);

            }catch (error: any){
                next(error);
            }
        }
    )

    app.route('/Car/:id').get(
        async (req, res, next) => {
            try {
                await getCarByIdController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
          
    )

    app.route('/Car/:id').put(
        async (req, res, next) => {
            try {
                await UpdateCarController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )

    app.route('/Car/:id').delete(
        async (req, res, next) => {
            try {
                await deleteCarController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )

    app.route('/Car/reservations/:id').get(
        async (req, res, next) => {
            try {
                await getCarReservationsController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
          
    )
}

export default car;