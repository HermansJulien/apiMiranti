const { getUtilisateur } = require('./user');
const { getAdmin } = require('./admin');
const { compareHash } = require('../utils/utils');
module.exports.getUser = async (client, mailAddre, password) => {
    const promises = [];

    const promiseAdmin = getAdmin(client, mailAddre);

    const promiseUser = getUtilisateur(client, mailAddre);

    promises.push(promiseUser, promiseAdmin);

    const values = await Promise.all(promises);

    const userRow = values[0].rows[0];
    const adminRow = values[1].rows[0];
    if (userRow !== undefined && await compareHash(password, userRow.accountpassword)) {

        return { userType: "user", value: userRow };
    } else if (adminRow !== undefined && await compareHash(password, adminRow.accountpassword)) {

        return { userType: "admin", value: adminRow };
    } else {
       
        return { userType: "inconnu", value: null }
    }
};
