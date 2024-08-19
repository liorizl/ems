const employee = require('../server/employee.js');
module.exports = [
    {
        method: 'get',
        url: '/admin/getAllEmployee',
        middleware: employee.getAllEmployee
    },
    {
        method: 'post',
        url: '/admin/subEmployee',
        middleware: employee.subEmployee
    },
    {
        method: 'get',
        url: '/admin/getEmployee',
        middleware: employee.getEmployee
    },
    {
        method: 'get',
        url: '/admin/getEmpInDepart',
        middleware: employee.getEmpInDepart
    },
    {
        method: 'get',
        url: '/admin/deleEmp',
        middleware: employee.deleEmp
    },
]