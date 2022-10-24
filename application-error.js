/*
 * @Author: Noscere 
 * @Email: noscere1978@gmail.com
 * @Date: 2022-10-22 21:55:57 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-23 22:38:05
 */
'use strict';


/* ApplicationError extends javascript Error class - avoids manually
 * assigning this.name = <error name> by automatically assigning
 * this.name. ApplicationError is our root “basic error” class that
 * assigns this.name = this.constructor.name. All our custom errors
 * inherit from it. We also call this.captureStackTrace to stop
 * the new Error...calls being dumped on the stack trace
 */
class ApplicationError extends Error {
    constructor(message = "") {
        if(!message || message == "") {
            // Specify a default message if undefined or blank
            let message = "Application Error";
        }
        super(message);
        // Error name is class name (ApplicationError)
        this.name = this.constructor.name;
        // Super sets this.message parameter, no need to duplicate it
        
        // get a stack trace so these new error(s) calls are
        // not also dumped on the stack
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApplicationError;
