/*
 * @Author: Noscere 
 * @Email: noscere1978@gmail.com
 * @Date: 2022-10-26 18:24:29 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-26 18:38:02
 * @Description: ObjectError
 * 
 * Expects an objectName to be provided, else it
 * tries to access the name of objectInstance. If
 * there is neither, the constructor will throw
 * a new IllegalArgumentError.
 */


'use strict';

const RuntimeError = require('./runtime-error');
const IllegalArgumentError = require('./illegal-argument-error');

class ObjectError extends RuntimeError {
    constructor(objectInstance, objectName, message = "") {
        // Let base class handle sanity checking
        super(message);

        if(!objectName || objectName == "") {
            if(!objectInstance) {
                throw new IllegalArgumentError("objectName", "undefined");
            } else {
                objectName = objectInstance.name;
            }
        }
        this.objectName = objectName;
        this.objectInstance = objectInstance;
    }
}

module.exports = ObjectError;
