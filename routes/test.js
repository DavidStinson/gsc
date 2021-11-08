import { Router } from 'express'
import * as testCtrl from "../controllers/test.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, testCtrl.index)

export {
  router
}
