const mysql = require('../function/mysql.js');
const util = require('../util/util.js');
const serverUtil = require('./serverUtil.js');
module.exports = {
    departmentList: async ctx => {
        const sql = 'select id, name from department order by id asc';
        const result = await mysql.nquery(sql);
        ctx.body = result
    },
    getDepartment: async ctx => {
        let id = ctx.query.id;
        id = parseInt(id);
        const sql = 'select id, name from department where id=' + id;
        const result = await mysql.nquery(sql);
        ctx.body = result
    },
    checkDepartmentName: async ctx => {
        const name = ctx.request.body.name;
        const sql = 'select name from department where name="'+ name + '"';
        const result = await mysql.nquery(sql);
        if(result.length === 0) {
            ctx.body = { myStatus: 0 }
        } else {
            ctx.body = { myStatus: 1 }
        }
    },
    deleDepartment: async ctx => {
        let id = ctx.query.id;
        id = parseInt(id);
        const sql = 'delete from department where id=' + id;
        const result = await mysql.nquery(sql);
        let myStatus;
        if (result.affectedRows === 1) {
            myStatus = 1;
        } else {
            myStatus = 0;
        }
        ctx.body = { myStatus }
    },
    subDepartment: async ctx => {
        const id = ctx.query.id ? parseInt(ctx.query.id) : null;
        const name = ctx.request.body.name;
        let sql;
        if(id){
            sql = 'update department set name="' + name + '" where id=' + id; 
        } else {
            sql = 'insert department (name) value ("' + name + '")';
        }
        const result = await mysql.nquery(sql);
        let status;
        if(result.changedRows === 1 || result.affectedRows === 1) {
            status = { myStatus: 1 }
        } else {
            status = { myStatus: 0}
        }
        ctx.body = status;
    }
}