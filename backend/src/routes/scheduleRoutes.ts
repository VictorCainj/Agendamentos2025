import { Router } from 'express';
import { getOpenSchedules, createSchedule, updateSchedule, deleteSchedule, finalizarSchedule, getAllSchedules } from '../controllers/scheduleController';

const router = Router();

router.get('/open', getOpenSchedules);
router.post('/', createSchedule);
router.put('/:id', updateSchedule);
router.put('/:id/finalizar', finalizarSchedule);
router.delete('/:id', deleteSchedule);
router.get('/all', getAllSchedules);

export default router; 