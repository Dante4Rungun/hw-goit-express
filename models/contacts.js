const fs = require('fs/promises')
const path = require('path')
const { isUndefined } = require('util')
const utils = require('../utils/utils')

const createResponse = (status, code, contacts) => {
  return response = {
    status: status,
    code: code,
    contacts: contacts
  }
}

//done
const listContacts = async () => {
  try {
    const contacts = await fs.readFile(path.join(__dirname, 'contacts.json'))
    return JSON.parse(contacts)
  }
  catch (err) {
    return createResponse("500", "failure", err)
  }
}
//done
const getContactById = async (contactId) => {
  try {
    const jsonContacts = await fs.readFile(path.join(__dirname, 'contacts.json'))
    const contacts = JSON.parse(jsonContacts)
    if (contacts.find(contact => contact.id === contactId) !== undefined)
        return createResponse("success", "200", contacts.filter(contact => contact.id === contactId))
    else return createResponse("No content", "204", "No data was found")
  }
  catch (err) {
    return createResponse("500", "failure", err)
  }
}
//done
const removeContact = async (contactId) => {
  try {
    const jsonContacts = await fs.readFile(path.join(__dirname, 'contacts.json'))
    const contacts = JSON.parse(jsonContacts)
    if (contacts.find(contact => contact.id === contactId) !== undefined) {
      const newContacts = contacts.filter(contact => contact.id !== contactId)
      await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(newContacts))
      return createResponse("200", "success", newContacts)    
    }
    else return createResponse("211", "not found", contacts)    
  }
  catch (err) {
    return createResponse("500", "failure", err)
  }
}
//done
const addContact = async (name, email, phone) => {
  try {
    const contacts = await fs.readFile(path.join(__dirname, 'contacts.json'))
    const parsedContacts = JSON.parse(contacts)
    const id = utils.getMaxId(parsedContacts).toString()
    parsedContacts.push({id: id, name: name, email: email, phone: phone})
    await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(parsedContacts))
    return createResponse("200","success", parsedContacts)     
  }
  catch (err){
    return createResponse("500","failure",[])
  }
}

const updateContact = async (contactId, name, email, phone) => {
  try {
    const jsonContacts = await fs.readFile(path.join(__dirname, 'contacts.json'))
    const contacts = JSON.parse(jsonContacts)
    if (contacts.find(contact => contact.id === contactId) !== undefined)
    {
      contacts[contacts.findIndex(contact => contact.id === contactId)] = {id: contactId, name: name, email: email, phone: phone}
      await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(contacts))
      return createResponse("200","success", contacts)
    }
    else return createResponse("211", "not found", contacts)
  }
  catch (err) {
    return createResponse("500", "failure", err)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
