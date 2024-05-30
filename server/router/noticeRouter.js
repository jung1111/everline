import express from 'express';
import * as controller from '../controller/noticeController.js'


const router = express.Router();

router.get('/', controller.getNotices)
router.get('/:id', controller.getNotice)


export default router;