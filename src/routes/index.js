import express from "express";

const routes = express();

import userAuth from "./authRouter.js"

routes.use('/v1/api/user', userAuth)

export default routes