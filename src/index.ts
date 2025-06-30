import express from 'express'
import cors from 'cors' //  import cors

import users from './auth/auth.routers'
import car from './Car/car.routers'
import customer from './Customers/customers.routers'
import reservation from './Reservation/reservation.routers'
import location from './location/location.router'
import maintenance from './Maintenance/maintenance.router'
import payment from './Payments/payment.routers'
import insuarance from './Insuarance/insuarance.routers'
import booking from './Bookings/bookings.routers'

const app = express()
const PORT = 8081

app.use(cors())

app.use(express.json())

users(app)
car(app)
customer(app)
reservation(app)
location(app)
maintenance(app)
payment(app)
insuarance(app)
booking(app)

app.get('/', (req, res) => {
  res.send("hello from express")
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:8081")
  })
}

export default app
