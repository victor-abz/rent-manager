const { success, fail } = require('../api-utils')
const logic = require('../../../logic')

module.exports = (req, res) => {
    const { body: { documentId, name, surname, email, phoneNumber, nationality, bankAccount, password}} = req
    logic.registerOwner(documentId, name, surname, email, phoneNumber, nationality, bankAccount, password)
        .then(owners => res.json(success(owners)))
        .catch(err => res.json(fail(err.message)))
}