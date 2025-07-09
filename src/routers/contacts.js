import { Router } from 'express';

import {
  getContactsController,
  getContactByIdController,
  createContactsController,
  deleteContactController,
  patchContactController,
} from '../controllers/contact.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:id', ctrlWrapper(getContactByIdController));

router.post('/', ctrlWrapper(createContactsController));

router.delete('/:id', ctrlWrapper(deleteContactController));

router.patch('/:id', ctrlWrapper(patchContactController));

export default router;
