import express from "express";

const routes = express();

import userAuth from "./authRouter.js"
import users from "./usersRouter.js"

routes.use('/v1/api/user', userAuth)
routes.use('/v1/api/user', users)

export default routes