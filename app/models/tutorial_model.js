var mongoose = require('../config/connection');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var tutorialSchema = new Schema({
    
    term:{ 
        type:String, 
        trim:true 
    },
    definition:{ 
        type:String, 
        trim:true 
    }
}, {
    timestamps:true
})

tutorialSchema.plugin(mongoosePaginate);

var Tutorial = mongoose.model('tutorial', tutorialSchema, 'tutorial');

Tutorial.count().then(count=>{
    if(count == 0){
        var createObj = [
            {
                term:"Abyssal plain",
                definition:"The ocean floor offshore from the continental margin, usually very flat with a slight slope."
            },
            {
                term:"Accrete",
                definition:"v. To add terranes (small land masses or pieces of crust) to another, usually larger, land mass."
            },
            {
                term:"Alkaline",
                definition:"Term pertaining to a highly basic, as opposed to acidic, substance. For example, hydroxide or carbonate of sodium or potassium."
            }
        ]
        Tutorial.create(createObj).then(result=>{
            console.log("success created");
        }, err=>{
            console.log("err===========>>>",err);
        })
    }
}, err=>{
    console.log("err===========>>>",err);
})

module.exports = Tutorial;