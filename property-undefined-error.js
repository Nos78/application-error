/*
 * @Author: Noscere 
 * @Email: noscere1978@gmail.com
 * @Date: 2022-10-30 15:50:06 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-30 15:51:49
 * @Description: PropertyUndefinedError
 */

'use strict';

const IllegalArgumentError = require('./illegal-argument-error');
const PropertyAccessError = require('./property-access-error');

class PropertyUndefinedError extends PropertyAccessError {
    constructor(propertyName, contents = "", objectInstance, objectName = "", message = "") {
        if(!propertyName) {
            throw new IllegalArgumentError("propertyName", "undefined");
        }
        super(propertyName, null, contents, objectInstance, objectName, message);
    }
}

module.exports = PropertyUndefinedError;