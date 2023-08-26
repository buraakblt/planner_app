const queryDb = require('../queryDb')
exports.DailyPlansTable = class {
    constructor() {}
    async getDP(token) {
        var sql = "SELECT * from dailyplans WHERE user_id=(SELECT id FROM users WHERE user_token = ?)"
        let values = [
            token
        ]
        try {
            return await queryDb(sql, values)
        } catch (err) {
            console.log(err)
        }
    }

    async postDP(date, token, tz0, tz1, tz2, tz3, tz4, tz5, tz6, tz7, tz8, tz9) {
        var sql = "INSERT INTO dailyplans (date, tzone0, tzone1, tzone2, tzone3,tzone4 ,tzone5,tzone6,tzone7,tzone8,tzone9,user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,(SELECT id FROM users WHERE user_token=?))";
        let values = [
            date, tz0, tz1, tz2, tz3, tz4, tz5, tz6, tz7, tz8, tz9, token
        ]
        try {
            return await queryDb(sql, values)
        } catch (err) {
            console.log(err.message)
        }
    }

    async deleteDP(id, token) {
        var sql = "DELETE FROM dailyplans WHERE id= ? AND user_id=(SELECT id FROM users WHERE user_token = ?)";
        let values = [
            id,
            token
        ]
        try {
            return await queryDb(sql, values)
        } catch (err) {
            console.log(err)
        }
    }

    async patchDP(id, token, tz0, tz1, tz2, tz3, tz4, tz5, tz6, tz7, tz8, tz9) {
        var definedValues = []
        var sql = "UPDATE dailyplans SET"
        var sqlCheck = " WHERE id = ? AND user_id = (SELECT id FROM users WHERE user_token=?)"
        let str = ['tzone0', 'tzone1', 'tzone2', 'tzone3', 'tzone4', 'tzone5', 'tzone6', 'tzone7', 'tzone8', 'tzone9']
        let values = [tz0, tz1, tz2, tz3, tz4, tz5, tz6, tz7, tz8, tz9]
        for (let i = 0; i < values.length; i++) {
            if (values[i] != undefined) {
                sql += ` ${str[i]} = ?,`;
                definedValues.push(values[i])
            }
        }
        definedValues.push(...[id, token])
        sql = sql.slice(0, -1)
        sql += sqlCheck
        console.log(sql)
        console.log("defined values " + definedValues)
        if (definedValues.length > 2) {
            try {
                return await queryDb(sql, definedValues)
            } catch (err) {
                console.log(err)
            }
        }
    }

}