import { Router } from 'express';
import { createUser, deleteUser, listUsers, updateUser } from '../controllers/user.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createUserSchema, updateUserSchema } from '../validators/user.validators.js';

const router = Router();

router.use(requireAuth, requireRole('admin'));
router.get('/', listUsers);
router.post('/', validate(createUserSchema), createUser);
router.put('/:id', validate(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;
