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
            glossaryId:Joi.string().required(),
            _id:Joi.string().optional()
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
            glossaryId:Joi.string().required(),
            _id:Joi.string().optional()
        },
        body:{
            term:Joi.string().required(),
            definition:Joi.string().required(),
            createdAt:Joi.string().optional(),
            updatedAt:Joi.string().optional(),
            __v:Joi.number().optional(),
        }
    },
    remove:{
        params:{
            glossaryId:Joi.string().required(),
            _id:Joi.string().optional()
        }
    }
};