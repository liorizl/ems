const mysql = require('../function/mysql.js');
const util = require('../util/util.js');
const serverUtil = require('./serverUtil.js');
module.exports = {
    partmentList: async ctx => {

    },
    checkPartmentName: async ctx => {
        const name = ctx.request.body.name;
        const sql = 'select name from partment';
        const result = await mysql.nquery(sql);
        if(result.length === 0) {
            ctx.body = { mystatus: 0 }
        } else {
            ctx.body = { mystatus: 1 }
        }
    },
    subPartment: async ctx => {
        const id = ctx.query.id ? parseInt(ctx.query.id) : null;
        const name = ctx.request.body.name;
        console.log(id, name)
        let sql;
        if(id){
            sql = 'update partment set name="' + name + '" where id=' + id; 
        } else {
            sql = 'insert partment (name) value ("' + name + '")';
        }
        const result = await mysql.nquery(sql);
        let status;
        if(result.changedRows > 0) {
            status = { myStatus: 1 }
        } else {
            status = { myStatus: 0}
        }
        ctx.body = status;
    }
}