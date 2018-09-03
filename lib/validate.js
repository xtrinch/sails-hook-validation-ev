module.exports = function validate (req, validate) {
  var queryOptions = req._sails.hooks.blueprints.parseBlueprintOptions(req);
  let Model = req._sails.models[queryOptions.using];

  const expressValidator = require('express-validator');
  expressValidator()(req, {}, () => {});

  if (!_.isFunction(validate)) {
    try {
      Model.validate(req)
    } catch(e) { }
  } else {
    validate(req)
  }
};