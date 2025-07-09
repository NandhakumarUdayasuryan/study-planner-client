// Please rename this file to Constants.js for best practices.

const BaseURL = 'http://localhost:5003';
const APIEndpoints = {
    LOGIN: `${BaseURL}/login`,
    LOGOUT: `${BaseURL}/logout`,
    USERS: `${BaseURL}/users`,
    TASKS: `${BaseURL}/tasks`,
};

const PRIORITY_VALUES = Object.freeze({
    3: 'High',
    2: 'Medium',
    1: 'Low'
})

const STATUS_VALUES = Object.freeze({
    'To Do': 1,
    "In Progress": 2,
    "Done": 3
});

export { BaseURL, APIEndpoints, PRIORITY_VALUES, STATUS_VALUES};
// This file contains constants used throughout the application.
// It includes the base URL for the API and endpoints for user-related operations.
// The constants are exported for use in other parts of the application.
// This allows for easy configuration and maintenance of API URLs.  