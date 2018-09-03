/**
 * Module dependencies
 */

var includeAll = require('include-all');
var path = require('path');

/**
 * sails-hook-validation-ev
 *
 * @description :: A hook to validate requests in Sails 1.x.
 * @docs        :: http://sailsjs.com/documentation/concepts/blueprints
 */

module.exports = function defineSailsHookValidation(sails) {
  var hook;

  return {

    /**
     * Runs when a Sails app loads/lifts.
     *
     * @param {Function} done
     */
    initialize: function (done) {

      hook = this;

      // If the blueprints hook isn't active, this hook isn't really relevant.
      if (!sails.hooks.blueprints) {
        sails.log.debug('Skipping activation of `sails-hook-validation-ev` hook since core blueprints hook is disabled!');
        return done();
      }

      // After the blueprints hook loads, load and register any custom blueprint actions.
      sails.after('hook:blueprints:loaded', function() {
        hook.loadAndRegisterActions(done);
      });

    },

    loadAndRegisterActions: function(done) {
      //Load blueprint actions from the configured folder (defaults to `api/blueprints`)
      try {
        includeAll.optional({
          dirname: path.resolve(__dirname, 'actions'),
          filter: /^([^.]+)\.(?:(?!md|txt).)+$/,
          depth: 1,
          replaceExpr : /^.*\//,
        }, function(err, files) {
          // Loop through all of the loaded models.
          _.each(_.keys(sails.models), function(modelIdentity) {
            // Loop through all of the loaded blueprints and register an action for each one
            // that's specific to this model, e.g. `user/find`.
            _.each(files, function(blueprintAction, blueprintName) {
              sails.registerAction(blueprintAction, modelIdentity + '/' + blueprintName, true);
            });
          });
          return done();
        });
      } catch (e) {
        return done();
      }
    }

  };

};