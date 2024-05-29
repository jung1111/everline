import express from 'express';
import * as controller from '../controller/inquiryController.js'


const router = express.Router();

router.post('/write', controller.insert)
router.get('/list', controller.list)
router.get('/:bid', controller.detail);
router.post('/update', controller.update);
router.post('/delete', controller.bidDelete);
router.post('/updateHits', controller.updateHits); //조회수

export default router;