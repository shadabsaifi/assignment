const config = require('./config');
const mongoose = require('mongoose');
mongoose.connect(config.URI, (err)=>{
  if(err) console.log("db not connected ",err);
  else console.log("db connected successfully");
});

module.exports = mongoose;
