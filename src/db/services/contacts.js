import { Contact } from '../models/Contact.js';

import { calculatePaginationData } from '../../utils/calculatePaginationData.js';

import { SORT_ORDER } from '../../constants/index.js';

import mongoose from 'mongoose';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();
  const contactsCount = await Contact.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(
    contacts,
    contactsCount,
    perPage,
    page,
  );

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (id) => Contact.findById(id);

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const deleteContact = async (id) => {
  const contact = await Contact.findOneAndDelete({
    _id: id,
  });
  return contact;
};

export const updateContact = async (id, payload, options = {}) => {
  const { userId, ...updateData } = payload;

  const contactId = mongoose.Types.ObjectId.isValid(id)
    ? new mongoose.Types.ObjectId(id)
    : id;
  const userObjectId = mongoose.Types.ObjectId.isValid(userId)
    ? new mongoose.Types.ObjectId(userId)
    : userId;

  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId, userId: userObjectId },
    updateData,
    {
      new: true,
      ...options,
    },
  );

  if (!rawResult) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
