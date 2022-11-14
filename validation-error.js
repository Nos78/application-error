/*
 * @Author: Noscere 
 * @Email: noscere1978@gmail.com
 * @Date: 2022-11-14 01:36:19.263 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-11-14 02:00:43.372
 * @Description: Runtime validation error class
 */

'use strict';

const RuntimeError = require('./runtime-error');

/**
 * @description A ValidationError indicates that an error occured when performing validation operation(s) against
 * a given piece of data. Exceptions, as the name suggests, are thrown in exceptional circumstances.
 * Validating Data during, especially during class construction, against some business logic rules is a good
 * example. Raising a validation error when a StartDate is later than an EndDate is a bad example.
 * 
 * @class ValidationError
 * @extends {RuntimeError}
 */
class ValidationError extends RuntimeError {
    /**
     * Creates an instance of ValidationError.
     * @param {*} [object={}] the container of the data that failed validation
     * @param {string} [message=""] the error message
     * @memberof ValidationError
     */
    constructor(object = {}, message = "") {
        // Let base class handle sanity checking
        super(message);

        this.object = object;
    }
}
    
module.exports = ValidationError;
