import { Router } from 'express'
import * as googleCtrl from "../controllers/google.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/unit4', isLoggedIn, googleCtrl.unit4)

export {
  router
}
