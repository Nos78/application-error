/*
 * @Author: Noscere 
 * @Email: noscere1978@gmail.com
 * @Date: 2022-10-25 21:58:40 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-26 18:31:05
 * @Description: RuntimeError
 * 
 * There is no checked vs unchecked exceptions in
 * javascript - but we're ignoring this lack of
 * distinction and implementing a base runtime class
 * anyway, as this may help the programmer to
 * distinguish errors they may be able to fix
 * programmatically.
 */

'use strict';

const ApplicationError = require('./application-error');

class RuntimeError extends ApplicationError {
    constructor(message = "") {
        // Let base class handle sanity checking
        super(message);
    }
}

module.exports = RuntimeError;
