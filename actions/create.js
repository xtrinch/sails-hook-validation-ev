// /**
//  * Module dependencies
//  */

var _ = require('@sailshq/lodash');
var async = require('async');
var sailsCreateRecord = require('sails/lib/hooks/blueprints/actions/create');
const { validationResult } = require('express-validator/check');

/**
 * Create Record
 *
 * http://sailsjs.com/docs/reference/blueprint-api/create
 *
 * An API call to crete a single model instance using the specified attribute values.
 *
 */

module.exports = function createRecord (req, res) {
  let action = 'create';
  var queryOptions = req._sails.hooks.blueprints.parseBlueprintOptions(req);
  let Model = req._sails.models[queryOptions.using];
  const expressValidator = require('express-validator');
  expressValidator()(req, {}, () => {});

  try {
    Model.validate(req)
  } catch(e) { }

  req.getValidationResult().then(function(errors) {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    sailsCreateRecord(req, res);
  })

};