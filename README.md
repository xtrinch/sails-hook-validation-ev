[![npm version](https://badge.fury.io/js/sails-hook-validation-ev.svg)](https://badge.fury.io/js/sails-hook-validation-ev)
[![npm](https://img.shields.io/npm/dt/sails-hook-validation-ev.svg)]()

# sails-hook-validation-ev

## About

Sails 1.x hook for validating blueprint/custom REST requests with the help of [express-validator](). Because - why reinvent the wheel? Uses the same configuration functions as `express-validator`.

## Installation

As simple as `npm install --save sails-hook-validation-ev`.

## Usage with blueprints

For models with blueprint routes you wish to validate, you need only add a `validate` function to it.

### Example model `Todo.js`

    module.exports = {

      attributes: {
        title: {    
          type: 'string',   
          required: true    
        },  
         description: { 
          type: 'string',   
          required: true    
        },
      },

      validate: (req) => {
        req.check('title')
          .exists()
          .isLength({ min: 1 }).withMessage('must be at least 5 chars long');
        req.check('description').exists();
      }

    };

For info on which functions you can use, see [express-validator check API](https://express-validator.github.io/docs/check-api.html). It opens a world of possibilities :)

### Example response

    {
        "errors": [
            {
                "location": "params",
                "param": "title",
                "msg": "Invalid value"
            },
            {
                "location": "params",
                "param": "title",
                "msg": "must be at least 5 chars long"
            }
        ]
    }

## Usage with custom handlers

### Example `TodoController.js`

The following snippet will override default /POST blueprint handler with custom function. In overridden functions you hold the responsibility to validate requests.

#### Option 1: Validate via validate function in model

  var validate = require('sails-hook-validation-ev/lib/validate')

  module.exports = {
    create: async function(req, res) {
      validate(req)
      const errors = await req.getValidationResult();
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      return res.ok()
    }  
  };


#### Option 2: Provide a custom validate function

  var validate = require('sails-hook-validation-ev/lib/validate')

  module.exports = {
    create: async function(req, res) {
      validate(req, (req) => {
        req.check('title')
          .exists()
          .isLength({ min: 1 }).withMessage('must be at least 5 chars long');
        req.check('description').exists();
      })

      const errors = await req.getValidationResult();
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      return res.ok()
    }  
  };