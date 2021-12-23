import express from 'express'
const router = express.Router()

import { signin, signup, signout, refreshToken } from '../controllers/authController.js'

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.get('/token', refreshToken)

export default router