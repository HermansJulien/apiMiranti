const cors = require('cors');
const Router = require('./api/v1/routes');
const express = require('express');
const versionRoutes = require('express-routes-versioning')();
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());


app.use(express.static('./upload'));

app.use('/', versionRoutes({
    "1.0.0":respondV1,
},NoMatchFoundCallBack));


function NoMatchFoundCallBack(req,res){
    res.status(404).send({error:"Version not found"});
}
function respondV1(req,res,next){
    app.use('/',Router);
    next();
}
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


