import { Contact } from '../db/models/Contact.js';

export const createContactService = async (data) => {
  return await Contact.create(data);
};
