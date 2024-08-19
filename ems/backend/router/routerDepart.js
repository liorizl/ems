const department = require('../server/department.js');
module.exports = [
    {
        method: 'get',
        url: '/admin/departmentList',
        middleware: department.departmentList
    },
    {
        method: 'get',
        url: '/admin/getdePartment',
        middleware: department.getDepartment
    },
    {
        method: 'post',
        url: '/admin/checkdePartmentName',
        middleware: department.checkDepartmentName
    },
    {
        method: 'post',
        url: '/admin/subDepartment',
        middleware: department.subDepartment
    },
    {
        method: 'get',
        url: '/admin/deleDepartment',
        middleware: department.deleDepartment
    },
]