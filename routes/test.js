import { Router } from 'express'
import * as testCtrl from "../controllers/test.js"

const router = Router()

router.get('/', testCtrl.index)

export {
  router
}
