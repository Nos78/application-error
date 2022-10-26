/*
 * @Author: Noscere 
 * @Email: noscere1978@gmail.com
 * @Date: 2022-10-22 23:16:41 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-26 19:10:33
 */

const ApplicationError = require('./application-error');
const IllegalOperationError = require('./illegal-operation-error');
const IllegalArgumentError = require('./illegal-argument-error');
const RuntimeError = require('./runtime-error');
const ObjectError = require('./object-error');
const PropertyAccessError = require('./property-access-error');

const name = "application-errors";


module.exports = {
    name,
    ApplicationError,
    IllegalOperationError,
    IllegalArgumentError,
    RuntimeError,
    ObjectError,
    PropertyAccessError
}
