import { Router } from 'express';
import { deposit, history, transfer, withdraw } from '../controllers/transaction.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { amountSchema, transferSchema, withdrawSchema } from '../validators/transaction.validators.js';

const router = Router();

router.use(requireAuth);
router.post('/deposit', requireRole('customer'), validate(amountSchema), deposit);
router.post('/withdraw', requireRole('customer'), validate(withdrawSchema), withdraw);
router.post('/transfer', requireRole('customer'), validate(transferSchema), transfer);
router.get('/history', history);

export default router;
