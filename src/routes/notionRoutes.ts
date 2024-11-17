import { Router } from 'express';
import {
  listRecordsController,
  createRecordController,
  getRecordController,
  updateRecordController,
  deleteRecordController,
  searchRecordByNumber
} from '../controllers/notionController';

const router = Router();

router.get('/records', listRecordsController);
router.post('/records', createRecordController);
router.get('/records/:id', getRecordController);
router.put('/records/:id', updateRecordController);
router.delete('/records/:id', deleteRecordController);
router.get('/records/search/:number', searchRecordByNumber);

export default router;
