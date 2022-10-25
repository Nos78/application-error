/*
 * @Author: Noscere 
 * @Email: noscere1978@gmail.com
 * @Date: 2022-10-22 23:16:41 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-25 22:10:13
 */

//import ApplicationError from './application-error'
//import IllegalOperationError from './illegal-operation-error'
//import IllegalArgumentError from './illegal-argument-error'

const ApplicationError = require('./application-error');
const IllegalOperationError = require('./illegal-operation-error');
const IllegalArgumentError = require('./illegal-argument-error');
const RuntimeError = require('./runtime-error');

const name = "application-errors";


module.exports = {
    name,
    ApplicationError,
    IllegalOperationError,
    IllegalArgumentError,
    RuntimeError
}