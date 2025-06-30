import {
    createLocationController, getLocationController, getLocationByIdController, UpdateLocationController, deleteLocationController
} from "./location.controller"

import {Express} from 'express';

const location = (app: Express) => {
    app.route('/location').post(
        async (req, res, next) => {
            try{
                await createLocationController(req, res);

            }catch (error: any) {
                next(error);
            }
        }
    )

    app.route('/location').get(
        async (req, res, next) => {
            try{
                await getLocationController(req, res);

            }catch (error: any){
                next(error);
            }
        }
    )

    app.route('/location/:id').get(
        async (req, res, next) => {
            try {
                await getLocationByIdController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
          
    )

    app.route('/location/:id').put(
        async (req, res, next) => {
            try {
                await UpdateLocationController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )

    app.route('/location/:id').delete(
        async (req, res, next) => {
            try {
                await deleteLocationController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )
}

export default location;