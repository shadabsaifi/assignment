var Joi = require('joi');


module.exports = {
    list:{
        query:{
            page:Joi.string().optional(),
            limit:Joi.string().optional(),
            term:Joi.string().allow("").optional()
        }
    },
    read:{
        params:{
            glossaryId:Joi.string().required()
        }
    },
    create:{
        body:{
            term:Joi.string().required(),
            definition:Joi.string().required()
        }
    },
    update:{
        params:{
            glossaryId:Joi.string().required()
        },
        body:{
            term:Joi.string().required(),
            definition:Joi.string().required()
        }
    },
    remove:{
        params:{
            glossaryId:Joi.string().required()
        }
    }
};