// /**
//  * Module dependencies
//  */

var _ = require('@sailshq/lodash');
var async = require('async');
var sailsUpdateRecord = require('sails/lib/hooks/blueprints/actions/update');
const { validationResult } = require('express-validator/check');

/**
 * Update One Record
 *
 * http://sailsjs.com/docs/reference/blueprint-api/update
 *
 * An API call to update a model instance with the specified `id`,
 * treating the other unbound parameters as attributes.
 *
 */

module.exports = function updateOneRecord (req, res) {
  let action = 'update';
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

    sailsUpdateRecord(req, res);
  })

};