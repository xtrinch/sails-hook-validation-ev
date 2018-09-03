[![npm version](https://badge.fury.io/js/sails-hook-validation-ev.svg)](https://badge.fury.io/js/sails-hook-validation-ev)
[![npm](https://img.shields.io/npm/dt/sails-hook-validation-ev.svg)]()

# sails-hook-validation-ev

## About

Sails hook for validating REST requests with the help of [express-validator](). Because - why reinvent the wheel? Uses the same configuration functions as `express-validator`.

## Installation

As simple as `npm install --save sails-hook-validation-ev`.

## Usage

For models you wish to validate, you need only add a `validate` function to it.

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
