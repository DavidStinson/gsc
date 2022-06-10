import { Router } from 'express'
import * as buildCtrl from "../controllers/google.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/unit1', isLoggedIn, buildCtrl.unit1)
router.get('/unit4', isLoggedIn, buildCtrl.unit4)

export {
  router
}
