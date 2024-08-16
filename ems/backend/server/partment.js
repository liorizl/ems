const mysql = require('../function/mysql.js');
const util = require('../util/util.js');
const serverUtil = require('./serverUtil.js');
module.exports = {
    partmentList: async ctx => {
        const sql = 'select id, name from partment order by id asc';
        const result = await mysql.nquery(sql);
        ctx.body = result
    },
    getPartment: async ctx => {
        let id = ctx.query.id;
        id = parseInt(id);
        const sql = 'select id, name from partment where id=' + id;
        const result = await mysql.nquery(sql);
        ctx.body = result
    },
    checkPartmentName: async ctx => {
        const name = ctx.request.body.name;
        const sql = 'select name from partment where name="'+ name + '"';
        const result = await mysql.nquery(sql);
        if(result.length === 0) {
            ctx.body = { myStatus: 0 }
        } else {
            ctx.body = { myStatus: 1 }
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
        console.log(result)
        if(result.changedRows === 1 || result.affectedRows === 1) {
            status = { myStatus: 1 }
        } else {
            status = { myStatus: 0}
        }
        ctx.body = status;
    }
}