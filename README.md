# application-errors
Custom error module for node.js. Implementation of a collection of classes
derived from `Error`, ready to use as-is or can be used as a basis for
implementing your own application specific errors.

### A package of custom error classes
The package implements a base class, ApplicationError, derived from the built-in
Error class and from which all other error classes are derived.

When trapping errors in a `try {} catch (err) {}` block, `err` is an `instanceof Error and
ApplicationError`.



# Work in progress!
This package is a work in progress. If you have added your own error class
derived from one of the classes in this package, why not contribute it and keep
this package relevant?

Commit your new error to github at https://github.com/nos78/application-errors

### Sponsor
Would you like to contribute to this and other open source projects by [codin.gq](https://codin.gq)? Head over to [this PayPal.me fund raiser](https://paypal.me/mrdatafund)



# Installing & Using application-errors

## installing
To install the package, simply enter `npm install application-errors`.

### Installing as a dependancy
To add the package as a dependancy in your project, use
`npm install --save application-errors`, which will add the relevant
dependancy string to your package.json.

## Using the classes
To include all of the error classes in youur project, just add this line to the
module that needs it:
`const customErrors = require('application-errors');`

Then you can throw an error using one of the custon error classes:
> throw new customErrors.IllegalArgumentError("badParameter", "some garbage");

All the class constructors have default parameter values and will cope with
undefined/null contents.

### Including individual classes
Don't want your project including lots of unneeded code? Just require the class
you need, with the following line in the source file that needs it:
> const IllegalOperationError = require('illegal-operation-error');

This is still to be tested, so you may need to specify the path:
> const IllegalOperationError = require('./path/to/node_modules/illegal-operation-error');


# Documentation
This custom errors package includes the following:

### ApplicationError
Base error class, deriving from Error.

> class ApplicationError extends Error {
> - constructor(message = "")
> -- message defaults to "Application Error" if unset.
>
> - this.name = this.constructor.name
> - Error.captureStackTrace(this, this.constructor);
>

Additional properties:

`this.message = message` (set by parent Error class).

All error classes deriving from `ApplicationError` have the above properties
assigned when instanced. The beauty of inheritance.

The name of the error will be the class name, and the stack trace will not
have additional garbage dumped on it due to the creation of the new error and
chain of contructor calls.

### IllegalArgumentError
Derives from IllegalOperationError.

> class IllegalArgumentError extends IllegalOperationError
> - constructor(badArgument, arguementContents)

Has additional properties set when instanced:
`this.argument`
`this.contents`

### IllegalOperationError
Derives from ApplicationError

> class IllegalOperationError extends ApplicationError
> - constructor(badOperation, additionalMessage)

Additional properties:
`this.operation = badOperation`
