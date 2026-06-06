import { Router } from 'express';
import { activateAccount, freezeAccount, getAccount, listAccounts } from '../controllers/account.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.get('/', listAccounts);
router.get('/:id', getAccount);
router.put('/freeze/:id', requireRole('admin'), freezeAccount);
router.put('/activate/:id', requireRole('admin'), activateAccount);

export default router;
