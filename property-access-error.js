/*
 * @Author: Noscere 
 * @Email: noscere1978@gmail.com
 * @Date: 2022-10-26 19:11:43 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-26 19:27:01
 * @Description: PropertyAccessError
 */

'use strict';

const ObjectError = require('./object-error');
const IllegalArgumentError = require('./illegal-argument-error');

class PropertyAccessError extends ObjectError {
    constructor(propertyName, property, propertyContents, objectInstance, objectName, message = "") {
        if(!message || message == "") {
            message = "A property access error occurred."
        }
        // Let base class handle sanity checking
        super(objectInstance, objectName, message);

        if(!propertyName || propertyName == "") {
            if(!property) {
                throw new IllegalArgumentError("propertyName", "undefined");
            } else {
                propertyName = property.name;
            }
        }
        this.property = property;
        this.propertyName = propertyName;
        this.propertyContents = propertyContents;
    }
}

module.exports = PropertyAccessError;
