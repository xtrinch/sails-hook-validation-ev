// /**
//  * Module dependencies
//  */

var _ = require('@sailshq/lodash');
var async = require('async');
var sailsCreateRecord = require('sails/lib/hooks/blueprints/actions/create');
var validate = require('../lib/validate');

/**
 * Create Record
 *
 * http://sailsjs.com/docs/reference/blueprint-api/create
 *
 * An API call to crete a single model instance using the specified attribute values.
 *
 */

module.exports = function createRecord (req, res) {
  validate(req);
  req.getValidationResult().then(function(errors) {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    sailsCreateRecord(req, res);
  })

};