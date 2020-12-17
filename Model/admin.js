module.exports.getAdmin = async (client, mailAddr) => {
    return await client.query(`
        SELECT * FROM client WHERE mailAddress = $1 and role = 'admin';
    `, [mailAddr]);
    
}