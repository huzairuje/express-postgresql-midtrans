const http = require('node:http');

/**
 * Default response structure
 * @template T - Data type
 * @template E - Error type
 */
function getStatusText(code) {
    return http.STATUS_CODES[code] || 'Unknown Status';
}

/**
 * Set success response
 * @param {import('express').Response} res - Express response object
 * @param {number} code - HTTP status code
 * @param {string} message - Response message
 * @param {any} data - Response data
 */
function setSuccessResponse(res, code, message, data) {
    const response = {
        status: getStatusText(code),
        code: code,
        message: message,
        data: data,
        dataError: null,
    };
    res.status(code).json(response);
}

/**
 * Set pagination response
 * @param {import('express').Response} res - Express response object
 * @param {number} code - HTTP status code
 * @param {string} message - Response message
 * @param {any} data - Response data
 * @param {number} totalCount - Total item count
 * @param {number} page - Current page
 * @param {number} size - Page size
 */
function setPaginationResponse(res, code, message, data, totalCount, page, size) {
    const totalPages = Math.ceil(totalCount / size);
    const response = {
        status: getStatusText(code),
        code: code,
        message: message,
        page: page,
        size: size,
        totalCount: totalCount,
        totalPages: totalPages,
        data: data,
    };
    res.status(code).json(response);
}

/**
 * Set error response
 * @param {import('express').Response} res - Express response object
 * @param {number} code - HTTP status code
 * @param {string} message - Error message
 * @param {any} dataError - Error data
 */
function setErrorResponse(res, code, message, dataError) {
    const response = {
        status: getStatusText(code),
        code: code,
        message: message,
        data: null,
        dataError: dataError,
    };
    res.status(code).json(response);
}

/**
 * Set custom response
 * @param {import('express').Response} res - Express response object
 * @param {number} code - HTTP status code
 * @param {string} message - Message
 * @param {any} data - Response data
 * @param {any} dataError - Error data
 */
function setCustomResponse(res, code, message, data, dataError) {
    const response = {
        status: getStatusText(code),
        code: code,
        message: message,
        data: data,
        dataError: dataError,
    };
    res.status(code).json(response);
}

module.exports = {
    setSuccessResponse,
    setPaginationResponse,
    setErrorResponse,
    setCustomResponse,
};