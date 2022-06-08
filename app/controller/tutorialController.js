var mongoose = require('mongoose');
var _ = require('lodash');
var common = require('../common/common');
var code = require('../common/responseCode');
var message = require('../common/responseMessage');
var Tutorial = require('../models/tutorial_model');

const list = (req, res) => {
    
    var page = req.query.page || 1,
        limit = req.query.limit || 10, query = {};
    if(req.joi.term) query = {
        $or:[
            {
                term:{ "$regex": req.joi.term, "$options": "i" }
            },
            {
                definition:{ "$regex": req.joi.term, "$options": "i" }
            }
        ]
    };
    var options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || 10
    };
    Tutorial.paginate(query, options).then(result => {
        return common.response(res, code.EVERYTHING_IS_OK, message.EVERYTHING_IS_OK, result);
    }, err => {
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, err);
    })
}

const read = (req, res) => {

    var glossary = req.glossary.toJSON();
    return common.response(res, code.EVERYTHING_IS_OK, message.EVERYTHING_IS_OK, glossary);
}


const glossaryId = (req, res, next, id) => {

    if (!mongoose.Types.ObjectId.isValid(id)) return common.response(res, code.NOT_FOUND, message.NOT_FOUND);

    Tutorial.findById(id).then(result => {
        if (!result) return common.response(res, code.NOT_FOUND, message.NOT_FOUND);
        req.glossary = result;
        return next();
    }, err => {
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, err);
    })

}

const update = (req, res) => {

    var glossary = req.glossary;
        glossary = _.extend(glossary, req.joi);

    glossary.save().then(result => {
        return common.response(res, code.EVERYTHING_IS_OK, message.EVERYTHING_IS_OK);
    }, err => {
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, err);
    });
}

const create = (req, res) => {

    Tutorial.create(req.joi).then(result => {
        return common.response(res, code.EVERYTHING_IS_OK, message.EVERYTHING_IS_OK);
    }, err => {
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, err);
    })
}

const remove = (req, res) => {

    var glossary = req.glossary;

    glossary.remove().then(result => {
        return common.response(res, code.EVERYTHING_IS_OK, message.EVERYTHING_IS_OK);
    }, err => {
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, err);
    });
}

module.exports = {

    list,
    glossaryId,
    read,
    update,
    create,
    remove
}