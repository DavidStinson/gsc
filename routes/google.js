import { Router } from 'express'
import * as googleCtrl from "../controllers/google.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, googleCtrl.index)

export {
  router
}
