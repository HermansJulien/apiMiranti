module.exports.getUtilisateur = async (client, mailAddre) => {
    return await client.query(`
    SELECT * FROM client WHERE mailAddress = $1 and role = 'user' ;
`, [mailAddre]);
}