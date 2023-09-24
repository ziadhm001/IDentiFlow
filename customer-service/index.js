import express from 'express'
import helmet from 'helmet';
import bodyParser from 'body-parser';
import defineRoutes from './entry-points/api/routes.js'
import mongoose from 'mongoose';
import cors from 'cors'

const app = express()
app.use(cors({ origin: '*' }))
app.use(helmet());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

defineRoutes(app)
mongoose.connect('mongodb+srv://ziadhm001:ziadhm001@nodecourse.pv53znd.mongodb.net/').then(() => {
    console.log('@@@@ ON DB')
})
app.listen(5002, () => {
    console.log('@@@@ ON 5002')
})