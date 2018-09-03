// /**
//  * Module dependencies
//  */

var _ = require('@sailshq/lodash');
var async = require('async');
var sailsUpdateRecord = require('sails/lib/hooks/blueprints/actions/update');
var validate = require('../lib/validate');

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
  validate(req)
  req.getValidationResult().then(function(errors) {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    sailsUpdateRecord(req, res);
  })

};