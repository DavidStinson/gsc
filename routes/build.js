import { Router } from 'express'
import * as buildCtrl from "../controllers/build.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/unit-one', isLoggedIn, buildCtrl.unitOne)
router.get('/unit-two', isLoggedIn, buildCtrl.unitTwo)
router.get('/unit-three', isLoggedIn, buildCtrl.unitThree)
router.get('/unit-four', isLoggedIn, buildCtrl.unitFour)

export {
  router
}
