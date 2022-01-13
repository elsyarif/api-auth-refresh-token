import express from "express";
import http from "http";
import * as socket from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import corsOptions from "./config/cors.js";

import { notFound, errorHandler } from './middleware/error.js'
import router from "./routes/index.js";

const app = express()
const PORT = process.env.PORT || 5000;
dotenv.config();

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

const server = http.createServer(app)
const io =  new socket.Server(server, {
    transports: ["polling"],
    cors: {
        origin: "http://localhost:3000",
    }
})

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors(corsOptions))
// use routes 
app.use(router)
// error handler
app.use(notFound);
app.use(errorHandler);

// io connection

export {io}
server.listen(PORT, () => {
    console.log(
        `⚡ [server} : server is running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`
    )
})