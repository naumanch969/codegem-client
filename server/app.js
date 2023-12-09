import express from "express"
import mongoose from "mongoose" 
import cors from "cors"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import friendRoutes from "./routes/friend.js"
import notificationRoutes from "./routes/notification.js"
import codeRoutes from "./routes/code.js"
import groupRoutes from "./routes/group.js"
import collectionRoutes from "./routes/collection.js"
import settingRoutes from "./routes/setting.js"
const PORT = process.env.PORT
const CONNECTION_URL = process.env.ATLAS_URL

app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/friend', friendRoutes);
app.use('/notification', notificationRoutes);
app.use('/group', groupRoutes);
app.use('/collection', collectionRoutes);
app.use('/setting', settingRoutes);
app.use('/code', codeRoutes)

app.use((err, req, res, next) => {
    const messae = err.messae
    const status = err.status
    res.status(status).json({ messae, status, success: false, stack: err.stack })
    next()
})

app.get("/", (req, res) => {
    res.status(200).send("App is Working")
})

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`listening at port ${PORT}`)))
    .catch((err) => console.log(`the error to connect to mongodb is ${err} and error message is ${err.message} `))