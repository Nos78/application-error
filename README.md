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
This custom errors package includes the following classes:
* ApplicationError
-- RuntimeError
--- ObjectError
--- ValidationError
-- IllegalOperationError
--- IllegalArgumentError


## ApplicationError
Base error class, deriving from **Error**.

> class **ApplicationError** extends **Error**
> - constructor(message = "")
> -- message defaults to "Application Error" if unset.
>
> - this.name = this.constructor.name
> - Error.captureStackTrace(this, this.constructor);
>

Additional properties:

`this.message = message` (set by parent Error class).

All error classes deriving from **`ApplicationError`** have the above properties
assigned when instanced. The beauty of inheritance.

The name of the error will be the class name, and the stack trace will not
have additional garbage dumped on it due to the creation of the new error and
chain of contructor calls.

### IllegalOperationError
Derives from **ApplicationError**

> class **IllegalOperationError** extends **ApplicationError**
> - constructor(badOperation, additionalMessage)

Additional properties:
`this.operation = badOperation`

### IllegalArgumentError
Derives from **IllegalOperationError**.

> class **IllegalArgumentError** extends **IllegalOperationError**
> - constructor(badArgument, arguementContents)

Has additional properties set when instanced:
`this.argument`
`this.contents`

### RuntimeError
Derives from **ApplicationError**

This is the base class for errors thrown during the normal runtime of an
application.  Whilst Javascript does not have any concept of checked vs
unchecked exceptions (or errors), we've borrowed from Java's error
definitions, and errors that occur during normal operation of the
virtual machine all derive from their RuntimeException. Things like
arithmetic errors, divide by zero, pointer exceptions & null references
are all things that the programmer can affect programmatically rather
than be caught by the compiler or interpreter.

Making a distinct difference in the naming of the error classes should
(in theory) assist in good development, and/or hint at what went wrong
and aid the debugging process.

> class **RuntimeError** extends **ApplicationError**

Has no additional properties.

### ObjectError
Derives from **RuntimeError**. This error signifies an object has
been rejected for whatever reason - failed validation, malformed,
perhaps corrupted during serialization.

> class **ObjectError** extends **RuntimeError**
> - constructor(*objectInstance*, *objectName*, *message* = "")

*objectInstance* - the object instance being rejected.
*objectName* - the name of the rejected object. In lieu of this
parameter, if not passed the constructor will try to use
*objectInstance.name*.

Additional properties:
`this.objectInstance`
`this.objectName`

The constructor will itself throw an **IllegalArgumentError** if both
*objectInstance* and *objectName* are null - whilst it is possible
to call the contructor with (null, null, null), something went
really bad or we have a severely lazy programmer if this ever
happened.

**Note**: this thrown error may change, as it probably should also
be throwing a runtime derived error, not **IllegalArgumentError**.

### ValidationError
Deriving from **RuntimeError**, this error can be raised when given
data fails validation. As the name suggests, exceptions should be
raised in *exceptional* circumstance, and good example of such is
during a data container class constructor, when the given data has
failed validation against some business logic rules.

This error should not be thrown just because a user has specified a
startDate that is later than an endDate.

> class **ValidationError** extends **RuntimeError**
> - constructor(*object* = {}, *message* = "")
*object* - the container object of the failed data.
*message* - the error message explaining the validation failure and
additional information.

Additional properties set when instanced:
`this.object` the container of the data that has failed validation.