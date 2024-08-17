const mysql = require('../function/mysql.js');
const util = require('../util/util.js');
const serverUtil = require('./serverUtil.js');
module.exports = {
    getAllEmployee: async ctx => {
        const sqlDepart = 'select id, name from partment';
        const resDepart = await mysql.nquery(sqlDepart);
        let departArr = resDepart;
        let empInDepart = [];
        for(let [index, depart] of departArr.entries()) {
            console.log(depart)
            let sql = 'select id, fid, name from employee where fid=' + depart.id;
            let res = await mysql.nquery(sql);
            empInDepart[index] = depart;
            empInDepart[index].children = res
        }
        ctx.body = empInDepart;
    }
}