import express from 'express'
const router = express.Router()

import { protec, token } from '../middleware/auth.js'
import { getProfile } from '../controllers/usersController.js'

router.get('/profile',protec, getProfile)

export default router