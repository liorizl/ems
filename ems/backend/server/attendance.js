const mysql = require('../function/mysql.js');
const util = require('../util/util.js');
const serverUtil = require('./serverUtil.js');
module.exports = {
    upAttend: async ctx => {
        await serverUtil.getForm(ctx.req).then(async value => {
            let id, empId, name, department, lateTimes, lateProTimes, leaveTimes, absentTimes, overTimes, overWorkTimes, sourceUrl, upMonth;
            id = parseInt(value.id[0]);
            empId = parseInt(value.empId[0]);
            name = value.name[0];
            department = value.department[0];
            lateTimes = parseInt(value.lateTimes[0]);
            lateProTimes = parseInt(value.lateProTimes[0]);
            leaveTimes = parseInt(value.leaveTimes[0]);
            absentTimes = parseInt(value.lateProTimes[0]);
            overTimes = parseInt(value.overTimes[0]);
            overWorkTimes = parseInt(value.overWorkTimes[0]);
            sourceUrl = value.sourceUrl[0];
            upMonth = value.date[0];
            let sql, myStatus;
            if (ctx.query.id) {
                sql = 'update attendance set lateTimes='+lateTimes+',lateProTimes='+lateProTimes+',leaveTimes='+leaveTimes+',absentTimes='+absentTimes+',overTimes='+overTimes+
                ',overWorkTimes='+overWorkTimes+',sourceUrl="'+sourceUrl+'",upMonth="'+upMonth+'" where id='+parseInt(ctx.query.id);
            } else {
                sql = 'insert into attendance (empId, empName, lateTimes, lateProTimes, leaveTimes, absentTimes, overWorkTimes, overTimes, sourceUrl, upMonth)' +
                    'values(' + empId + ', "' + name + '", ' + lateTimes + ', ' + lateProTimes + ', ' + leaveTimes + ', ' + absentTimes + ', ' + overWorkTimes + ', ' + overTimes + ', "' + sourceUrl + '", "' +
                    upMonth + '")';
            }
            const result = await mysql.nquery(sql);
            if (result.affectedRows >= 1 || result.changedRows >= 1) {
                myStatus = 1;
            } else {
                myStatus = 0;
            }
            ctx.body = { myStatus };
        })
    },
    getEmpAttend: async ctx => {
        const empId = parseInt(ctx.query.empId);
        const sql = 'select * from attendance where empId=' + empId + ' order by upMonth asc';
        const result = await mysql.nquery(sql);
        ctx.body = result;
    },
    getAttend: async ctx => {
        const id = parseInt(ctx.query.id);
        const sql = 'select * from attendance where id=' + id;
        const result = await mysql.nquery(sql);
        ctx.body = result[0];
    },
    deleAttend: async ctx => {
        const id = parseInt(ctx.query.id);
        const sql = 'delete from attendance where id=' + id;
        const result = await mysql.nquery(sql);
        let myStatus;
        if (result.affectedRows >= 1) {
            myStatus = 1;
        } else {
            myStatus = 0;
        }
        ctx.body= { myStatus }
    },
}