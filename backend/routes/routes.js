import express from 'express'
const router = express.Router()
import * as controller from '../controllers/controller.js'

router.get('/', controller.findAllResults)
router.get('/:id', controller.findResultById)
router.post('/new-round', controller.submitNewRound)
router.delete('/delete/:id', controller.deleteResultById)

export default router