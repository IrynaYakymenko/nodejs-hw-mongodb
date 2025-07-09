import { Contact } from '../models/Contact.js';

export const getContacts = () => Contact.find();

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
  const rawResult = await Contact.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
