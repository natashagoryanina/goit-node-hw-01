const path = require('path');
const fs = require('fs').promises;
const shortid = require('shortid');
const absolutePath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(absolutePath);
        const result = JSON.parse(data);
        console.log(result);  
    } 
    catch (error) {
        console.log(error);
    }
};

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(absolutePath);
        const result = JSON.parse(data);
        result.map((elem) => {
            if (elem.id === contactId) {
                console.log(elem);
            };
        });
    }
    catch (error) {
      console.log(error);
    }
};

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(absolutePath);
        const result = JSON.parse(data);
        const contacts = result.filter(elem => elem.id !== contactId);
        console.log('deleted');
        const contactsList = JSON.stringify(contacts);
        fs.writeFile(absolutePath, contactsList, (err) => {
            if (err) {
                console.error(err.message);
            };
        });
    }
    catch (error) {
        console.log(error);
    }
};
  
async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(absolutePath);
        const result = JSON.parse(data);
        result.push({
            id: shortid.generate(),
            name,
            email,
            phone
        });
        const contactsList = JSON.stringify(result);
        fs.writeFile(absolutePath, contactsList, (err) => {
            if (err) {
                console.error(err.message);
            };
        });
    }
    catch (error) {
        console.log(error);
    }
};

module.exports = {
    listContacts, 
    getContactById, 
    removeContact, 
    addContact
};