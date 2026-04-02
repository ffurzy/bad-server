import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { DB_ADDRESS, ORIGIN_ALLOW } from './config'
import errorHandler from './middlewares/error-handler'
import serveStatic from './middlewares/serverStatic'
import routes from './routes'
import { apiLimiter } from './middlewares/rateLimiter'

const { PORT = 3000 } = process.env
const app = express()
const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        // allow server-to-server and CLI tools without Origin header
        if (!origin) {
            return callback(null, true)
        }

        const allowedOrigins = ORIGIN_ALLOW.split(',')
            .map((item) => item.trim())
            .filter(Boolean)

        if (allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
}

app.use(cookieParser())

app.use(cors(corsOptions))
app.use(apiLimiter)
// app.use(cors({ origin: ORIGIN_ALLOW, credentials: true }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(serveStatic(path.join(__dirname, 'public')))

app.use(urlencoded({ extended: true }))
app.use(json())

app.options('*', cors(corsOptions))
app.use(routes)
app.use(errors())
app.use(errorHandler)

// eslint-disable-next-line no-console

const bootstrap = async () => {
    try {
        await mongoose.connect(DB_ADDRESS)
        await app.listen(PORT, () => console.log('ok'))
    } catch (error) {
        console.error(error)
    }
}

bootstrap()
