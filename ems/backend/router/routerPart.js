const partment = require('../server/partment.js');
module.exports = [
    {
        method: 'get',
        url: '/admin/partmentList',
        middleware: partment.partmentList
    },
    {
        method: 'post',
        url: '/admin/checkPartmentName',
        middleware: partment.checkPartmentName
    },
    {
        method: 'post',
        url: '/admin/subPartment',
        middleware: partment.subPartment
    },
]