/*
 * @Author: Noscere 
 * @Email: noscere1978@gmail.com
 * @Date: 2022-10-18 18:57:02
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-24 01:17:14
 * @Description: Unit test file to test the extension logic. Much of the
 * tests will exercise the functionality of the fileheader module, since
 * this library contains most (if not all) of the header manipulation
 * logic.
 */

/* global suite, test */

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
var assert = require('assert');
const { setgroups, off } = require('process');

// Include the errors module, the target of this unit test file
//const customErrors = require('../index');

//import ApplicationError from '../index.mjs'
const ApplicationError = require('../application-error');
const IllegalOperationError = require('../illegal-operation-error');
const IllegalArgumentError = require('../illegal-argument-error');
const CustomErrors = require('../index.js');

const moduleName = "application-errors";



function ok(expression, message) {
    if(!expression) throw new Error(message);
    return true;
}

function doSomethingBad() {
    throw new ApplicationError('doSomethingBad went bad!');
}

function doSomeBadOperation() {
    throw new IllegalOperationError("A Bad Operation");
}

function doAnotherBadOperation() {
    throw new IllegalOperationError("Another Bad Operation", "This is really bad!");
}

function hasSomeBadArgument() {
    throw new IllegalArgumentError('aBadArgument1', 5);
}

function hasANullArgument() {
    throw new IllegalArgumentError('aNullArgument', null);
}

suite(`Testing ${moduleName} exported classes - successful instantiation`, function() {

    setup(function() {
        // Setup test environment
    });

    test(`Imported ${moduleName} successfully.`, function() {
        assert(CustomErrors, "CustomErrors undefined - try adding this above:\n    const CustomErrors = require('../index.js');\nOtherwise the module is broken.");
    });

    test(`Imported ${moduleName} as CustomErrors.<class name> successfully.`, function() {
        assert(CustomErrors.ApplicationError, "CustomErrors.ApplicationError undefined.");
        assert(CustomErrors.IllegalArgumentError, "CustomErrors.IllegalArgumentError undefined.");
        assert(CustomErrors.IllegalOperationError, "CustomErrors.IllegalOperationError undefined.");
    });

    test(`Throwing CustomErrors.ApplicationError(copes with a null argument) & correctly instanced`, function() {
        // define a function to throw the error
        function throwApplicationError(message) {
            throw new CustomErrors.ApplicationError(message);
        }

        var message = null;
        try {
            throwApplicationError(message);
        } catch (err) {
            // Should be an instance of Error and CustomErrors.ApplicationError
            // AND an instance of individually required ApplicationError class
            assert(err instanceof CustomErrors.ApplicationError, "Thrown error was not correctly instantiated. Expected an instance of CustomErrors.ApplicationError");
            assert(err instanceof ApplicationError, "Thrown error was not correctly instantiated. Expected an instance of ApplicationError");
            assert(err instanceof Error, "Thrown error was not correctly instantiated. Expected an instance of Error");
            // check error is correctly named
            assert(err.name = 'ApplicationError');
        }
    });

    test(`Throwing CustomErrors.IllegalOperationError(copes with null arguments) & correctly instanced`, function() {
        // define a function to throw the error
        function throwIllegalOperationError(operation, msg) {
            throw new CustomErrors.IllegalOperationError(operation, msg);
        }

        try {
            throwIllegalOperationError(null, null);
        } catch (err) {
            // Should be an instance of Error and CustomErrors.ApplicationError
            // AND an instance of individually required ApplicationError class
            assert(err instanceof CustomErrors.IllegalOperationError, "Thrown error was not correctly instantiated. Expected an instance of CustomErrors.IllegalOperationError");
            assert(err instanceof IllegalOperationError, "Thrown error was not correctly instantiated. Expected an instance of IllegalOperationError");
            assert(err instanceof CustomErrors.ApplicationError, "Thrown error was not correctly instantiated. Expected an instance of CustomErrors.ApplicationError");
            assert(err instanceof ApplicationError, "Thrown error was not correctly instantiated. Expected an instance of ApplicationError");
            assert(err instanceof Error, "Thrown error was not correctly instantiated. Expected an instance of Error");
            // check error is correctly named
            assert(err.name = 'IllegalOperationError');
        }
    });

    test(`Throwing CustomErrors.IllegalArgumentError(copes with null arguments) & correctly instanced`, function() {
        // define a function to throw the error
        function throwIllegalArgumentError(argument, contents) {
            throw new CustomErrors.IllegalArgumentError(argument, contents);
        }

        try {
            throwIllegalArgumentError(null, null);
        } catch (err) {
            // Should be an instance of Error, CustomErrors.ApplicationError, CustomErrors.IllegalOperationError & CustomErrors.IllegalArumentError
            // AND an instance of individually required IllegalArgumentError class
            assert(err instanceof CustomErrors.IllegalArgumentError, "Thrown error was not correctly instantiated. Expected an instance of CustomErrors.IllegalArgumentError");
            assert(err instanceof IllegalArgumentError, "Thrown error was not correctly instantiated. Expected an instance of IllegalArgumentError");
            assert(err instanceof CustomErrors.IllegalOperationError, "Thrown error was not correctly instantiated. Expected an instance of CustomErrors.IllegalOperationError");
            assert(err instanceof IllegalOperationError, "Thrown error was not correctly instantiated. Expected an instance of IllegalOperationError");
            assert(err instanceof CustomErrors.ApplicationError, "Thrown error was not correctly instantiated. Expected an instance of CustomErrors.ApplicationError");
            assert(err instanceof ApplicationError, "Thrown error was not correctly instantiated. Expected an instance of ApplicationError");
            assert(err instanceof Error, "Thrown error was not correctly instantiated. Expected an instance of Error");
            // check error is correctly named
            assert(err.name = 'IllegalArgumentError');
        }
    });
});

// Defines a Mocha test suite to group tests of similar kind together
suite(`Deep testing ${moduleName} classes, individually imported via const class = require('class-file')`, function() {
   
    setup(function() {
        // Set up test environment
        ok(CustomErrors, "Unable to access CustomErrors");
        ok(CustomErrors.ApplicationError, "Unable to access CustomErrors.ApplicationError");
        
    });

    test(`ApplicationError - doSomethingBad()`, function() {
        try {
            doSomethingBad();
        } catch (err) {
            assert(err.name = 'ApplicationError');

            assert(err instanceof ApplicationError);

            assert(err instanceof Error);

            assert(require('util').isError(err));

            assert(err.stack);

            assert.strictEqual(err.toString(), 'ApplicationError: doSomethingBad went bad!');

            assert.strictEqual(err.stack.split('\n')[0], 'ApplicationError: doSomethingBad went bad!');
            // The first stack frame should be the function where the error was thrown.
            assert.strictEqual(err.stack.split('\n')[1].indexOf('doSomethingBad'), 7);
            // The line number where the error was thrown should match the line above in doSomethingBad() = line 43
            assert.notEqual(err.stack.split('\n')[1].indexOf('test.js:43'), -1);
        }
    });

    test(`IllegalOperationError - doSomeBadOperation()`, function() {
        try {
            doSomeBadOperation();
        } catch (err) {
            assert(err.name = 'IllegalOperationError');

            assert(err instanceof IllegalOperationError);
            assert(err instanceof ApplicationError);
            assert(err instanceof Error);

            assert(require('util').isError(err));

            assert(err.stack);

            assert.strictEqual(err.toString(), 'IllegalOperationError: Illegal operation: A Bad Operation');

            assert.strictEqual(err.stack.split('\n')[0], 'IllegalOperationError: Illegal operation: A Bad Operation');
            // The first stack frame should be the function where the error was thrown.
            assert.strictEqual(err.stack.split('\n')[1].indexOf('doSomeBadOperation'), 7);
            assert.notEqual(err.stack.split('\n')[1].indexOf('test.js:47'), -1);            
            // Test the extras are set
            assert(err.message, 'Illegal operation: A Bad Operation');
            assert.strictEqual(err.operation, 'A Bad Operation');
        }
    });

    test(`IllegalOperationError - doAnotherBadOperation()`, function() {
        try {
            doAnotherBadOperation();
        } catch (err) {
            assert(err.name = 'IllegalOperationError');

            assert(err instanceof IllegalOperationError);
            assert(err instanceof ApplicationError);
            assert(err instanceof Error);

            assert(require('util').isError(err));

            assert(err.stack);

            assert.strictEqual(err.toString(), 'IllegalOperationError: Illegal operation: Another Bad Operation\nMessage: This is really bad!');

            assert.strictEqual(err.stack.split('\n')[0], 'IllegalOperationError: Illegal operation: Another Bad Operation');
            // The first stack frame should be the function where the error was thrown.
            assert.strictEqual(err.stack.split('\n')[1], 'Message: This is really bad!');
            assert.strictEqual(err.stack.split('\n')[2].indexOf('doAnotherBadOperation'), 7);
            assert.notEqual(err.stack.split('\n')[2].indexOf('test.js:51'), -1);        

            assert.strictEqual(err.message, 'Illegal operation: Another Bad Operation\nMessage: This is really bad!');
            assert.strictEqual(err.operation, 'Another Bad Operation');
        }
    });

    test(`IllegalArgumentError - hasSomeBadArgument()`, function() {
        try {
            hasSomeBadArgument();
        } catch (err) {
            assert(err.name = 'IllegalArgumentError');

            assert(err instanceof IllegalArgumentError);
            assert(err instanceof IllegalOperationError);
            assert(err instanceof ApplicationError);
            assert(err instanceof Error);

            assert(require('util').isError(err));

            assert(err.stack);
            
            assert.strictEqual(err.toString(), 'IllegalArgumentError: Illegal operation: aBadArgument1\nMessage: Invalid argument provided.\nArgument Contents: 5');

            assert.strictEqual(err.stack.split('\n')[0], 'IllegalArgumentError: Illegal operation: aBadArgument1');
            assert.strictEqual(err.stack.split('\n')[1], 'Message: Invalid argument provided.');
            assert.strictEqual(err.stack.split('\n')[2], 'Argument Contents: 5');

            // The first stack frame should be the function where the error was thrown.
            assert.strictEqual(err.stack.split('\n')[3].indexOf('hasSomeBadArgument'), 7);

            assert.notEqual(err.stack.split('\n')[3].indexOf('test.js:55'), -1);        

            assert.strictEqual(err.message, 'Illegal operation: aBadArgument1\nMessage: Invalid argument provided.\nArgument Contents: 5');
            assert.strictEqual(err.operation, 'aBadArgument1');
            assert.strictEqual(err.argument, 'aBadArgument1');
            assert.strictEqual(err.contents, 5); 
        }
    });

    test(`IllegalArgumentError - hasNullArgument()`, function() {
        try {
            hasANullArgument();
        } catch (err) {
            assert(err.name = 'IllegalArgumentError');

            assert(err instanceof IllegalArgumentError);
            assert(err instanceof IllegalOperationError);
            assert(err instanceof ApplicationError);
            assert(err instanceof Error);

            assert(require('util').isError(err));

            assert(err.stack);
            
            assert.strictEqual(err.toString(), 'IllegalArgumentError: Illegal operation: aNullArgument\nMessage: Invalid argument provided.\nArgument Contents: null');

            assert.strictEqual(err.stack.split('\n')[0], 'IllegalArgumentError: Illegal operation: aNullArgument');
            assert.strictEqual(err.stack.split('\n')[1], 'Message: Invalid argument provided.');
            assert.strictEqual(err.stack.split('\n')[2], 'Argument Contents: null');

            // The first stack frame should be the function where the error was thrown.
            assert.strictEqual(err.stack.split('\n')[3].indexOf('hasANullArgument'), 7);

            assert.notEqual(err.stack.split('\n')[3].indexOf('test.js:59'), -1);        

            assert.strictEqual(err.message, 'Illegal operation: aNullArgument\nMessage: Invalid argument provided.\nArgument Contents: null');
            assert.strictEqual(err.operation, 'aNullArgument');
            assert.strictEqual(err.argument, 'aNullArgument');
            assert.strictEqual(err.contents, 'null');
        }  
    });
});