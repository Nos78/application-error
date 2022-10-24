/*
 * @Author: Noscere 
 * @Email: noscere1978@gmail.com
 * @Date: 2022-10-22 21:55:57 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-23 23:13:36
 */
'use strict';


const ApplicationError = require('./application-error');


class IllegalOperationError extends ApplicationError {
    constructor (operation, message = "") {
        var msg = "";
        if (!operation || operation == "") {
            operation = "Illegal operation";
            msg = operation;
        } else {
            msg = "Illegal operation: " + operation;
        }
        if(message && message != "") {
            msg = msg + "\nMessage: " + message;
        }
        super (msg);

        this.operation = operation;
    }
}

module.exports = IllegalOperationError;
/*
module.exports = {
    IllegalOperationError,
    name: "illegal-operation-error"
}*/