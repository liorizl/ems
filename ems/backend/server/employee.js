const mysql = require('../function/mysql.js');
const util = require('../util/util.js');
const serverUtil = require('./serverUtil.js');
module.exports = {
    getAllEmployee: async ctx => {
        const sqlDepart = 'select id, name from department';
        const resDepart = await mysql.nquery(sqlDepart);
        let departArr = resDepart;
        let empInDepart = [];
        for(let [index, depart] of departArr.entries()) {
            let sql = 'select id, fid, name from employee where fid=' + depart.id;
            let res = await mysql.nquery(sql);
            empInDepart[index] = depart;
            empInDepart[index].children = res
        }
        ctx.body = empInDepart;
    },
    getEmpInDepart: async ctx => {
        const id = parseInt(ctx.query.id);
        const sql = 'select * from employee where fid=' + id;
        const result = await mysql.nquery(sql);
        ctx.body = result
    },
    getEmployee: async ctx => {
        let id = ctx.query.id;
        id = parseInt(id);
        const sql = 'select * from employee where id=' + id;
        const result = await mysql.nquery(sql);
        ctx.body = result[0];
    },
    subEmployee: async ctx => {
        await serverUtil.getForm(ctx.req).then(async value => {
            let sql;
            if(ctx.query.id) {
                const id = parseInt(ctx.query.id);
                sql = 'update employee set fid=' + parseInt(value.fid[0]) + ',name="'+ value.name[0] +'",department="'+ value.department[0] +'",sex='+ parseInt(value.sex[0]) +
                ',mobile="'+ value.mobile[0] +'",birthday="'+ value.date[0] +'",address="'+ value.address[0] +'",gratuation="'+ value.gratuation[0] +
                '",baseSalary='+ parseInt(value.salary[0]) +',inTime="'+ value.date[1] +'",outTime="'+ value.date[2] +'" where id=' + id;
            } else {
                sql = 'insert into employee (fid, name, department, sex, mobile, birthday, address, gratuation, baseSalary, inTime, outTime) values'+
                '('+ parseInt(value.fid[0]) +',"' + value.name[0] + '","'+ value.department[0] +'",'+ parseInt(value.sex[0]) +',"'+ value.mobile[0] +'","'+ value.date[0] +
                '","'+ value.address[0] +'","'+ value.gratuation[0] +'",'+ parseInt(value.salary[0]) +',"'+ value.date[1] +'","'+ value.date[2] + '")';
            }
            const result = await mysql.nquery(sql);
            let myStatus;
            if(result.affectedRows >= 1 || result.changedRows >= 1) {
                myStatus = 1;
            } else {
                myStatus = 0
            }
            ctx.body = { myStatus };
        })
    },
    deleEmp: async ctx => {
        const id = parseInt(ctx.query.id);
        const sql = 'delete from employee where id='+ id;
        const result = await mysql.nquery(sql);
        let myStatus;
        if (result.affectedRows >= 1) {
            myStatus = 1;
        } else {
            myStatus = 0;
        }
        ctx.body= { myStatus }
    }
}