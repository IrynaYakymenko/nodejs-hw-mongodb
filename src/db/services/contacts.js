import { Contact } from '../models/Contact.js';

export const getContacts = () => Contact.find();

export const getContactById = (id) => Contact.findById(id);
