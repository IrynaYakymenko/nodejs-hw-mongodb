import { getContacts, getContactById } from '../db/services/contacts.js';
import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  updateContact,
} from '../db/services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';

import { parseSortParams } from '../utils/parseSortParam.js';

import { createContactService } from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const data = await getContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      userId: req.user._id,
    });

    res.json({
      status: 200,
      message: 'Successfully find contacts',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getContactById(id, req.user._id);

    if (!data) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactsController = async (req, res, next) => {
  try {
    const contact = await createContactService({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json({
      status: 201,
      message: 'Contact created successfully',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;

  const contact = await deleteContact(id, req.user._id);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;
  const result = await updateContact(id, req.user._id, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
