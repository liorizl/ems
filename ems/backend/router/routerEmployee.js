const employee = require('../server/employee.js');
module.exports = [
    {
        method: 'get',
        url: '/admin/getAllEmployee',
        middleware: employee.getAllEmployee
    },
]