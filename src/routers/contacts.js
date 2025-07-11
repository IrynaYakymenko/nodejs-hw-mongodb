import { Router } from 'express';

import {
  getContactsController,
  getContactByIdController,
  createContactsController,
  deleteContactController,
  patchContactController,
} from '../controllers/contact.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));
router.get('/:id', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  validateBody(createContactSchema),
  upload.single('photo'),
  ctrlWrapper(createContactsController),
);

router.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

router.patch(
  '/:id',
  isValidId,
  upload.single('photo'),

  ctrlWrapper(patchContactController),
);

router.get('/', ctrlWrapper(getContactsController));

export default router;
