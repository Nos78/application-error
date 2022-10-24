/*
 * @Author: Noscere 
 * @Email: noscere1978@gmail.com
 * @Date: 2022-10-22 21:55:57 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-23 23:14:44
 */
'use strict';


const ApplicationError = require('./application-error');
const IllegalOperationError = require('./illegal-operation-error');


class IllegalArgumentError extends IllegalOperationError {
    constructor (badArgument, contents) {
        if(!badArgument || badArgument == "") {
            badArgument = "Illegal Argument";
        }
        if(!contents) {
            contents = "null";
        }
        super (badArgument, "Invalid argument provided.\nArgument Contents: " + contents.toString());
        this.argument = badArgument;
        this.contents = contents;
    }
}

module.exports = IllegalArgumentError;
