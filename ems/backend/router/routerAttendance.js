const attendance = require('../server/attendance.js');
module.exports = [
    {
        method: 'post',
        url: '/admin/upAttend',
        middleware: attendance.upAttend
    },
    {
        method: 'get',
        url: '/admin/getEmpAttend',
        middleware: attendance.getEmpAttend
    },
    {
        method: 'get',
        url: '/admin/getAttend',
        middleware: attendance.getAttend
    },
    {
        method: 'get',
        url: '/admin/deleAttend',
        middleware: attendance.deleAttend
    },
]