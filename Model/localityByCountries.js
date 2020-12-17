module.exports.getLocalityByCountry = async (client,countryName) => {
    return await client.query(
        `SELECT * from locality l 
            inner join country c2 on (l.idcountry = c2.idcountry)
            where (c2.countryname = $1 OR $1 is null)
    `,[countryName]);

}