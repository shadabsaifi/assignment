var express = require('express');
var app = express(),
    common = require('../../app/common/common'),
    validate = require('../validation/validation'),
    tutorialController = require('../controller/tutorialController');

    app.route('/tutorials').get(common.validate(validate.list), tutorialController.list)
                           .post(common.validate(validate.create), tutorialController.create)

    app.route('/tutorials/:glossaryId').get(common.validate(validate.read), tutorialController.read)
                    .put(common.validate(validate.update), tutorialController.update)
                    .delete(common.validate(validate.remove), tutorialController.remove)

    app.param("glossaryId", tutorialController.glossaryId);


module.exports = app;
