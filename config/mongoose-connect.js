const mongoose = require('mongoose');
const dbgr = require('debug')(`development:mongoose`)
const config=require('config');
mongoose.connect(`${config.get("MONGOOSE_URI")}/Buynest`).then(()=>{
   dbgr("connected to database");
}).catch((err)=>{
   dbgr("error connecting to database",err);
});
module.exports=mongoose;
