const UserRouter = require('./user');
const HeritageRouter = require('./heritage');
const localitiesByCountryRouter = require('./localitiesByCountry');
const clientRouter = require('./client');
const heritageSeenRouter = require('./heritageSeen');
const router = require("express").Router();

router.use("/user", UserRouter);
router.use("/heritage", HeritageRouter);
router.use("/localityByCountry",localitiesByCountryRouter);
router.use("/client",clientRouter);
router.use("/heritageSeen",heritageSeenRouter);

module.exports = router;