const queryDb = require('../queryDb')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.UserTable = class {
    constructor() {}
    async byName() {
        var sql = 'SELECT * from users'
        try {
            return await queryDb(sql)
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async deleteU(token) {
        var sql = `DELETE FROM users WHERE user_token='${token}'`
        try {
            return await queryDb(sql)
        } catch (error) {
            console.log(error.code)
        }
    }

    async register(username, password, nickname) {
        const hashedPassword = await bcrypt.hash(password, 10)
        let values = [
            username, hashedPassword, nickname, ""
        ]
        var sql = "INSERT INTO users(user_name, user_password, user_nick, user_token) VALUES (?, ?, ?, ?)"
        try {
            await queryDb(sql, values)
            return true
        } catch (err) {
            console.log(err.code)
            return false
        }
    }

    async login(username, password) {
        let name = [
            username
        ]
        let sql = "SELECT * FROM users WHERE user_name = ?"
        let updateToken = "UPDATE users SET user_token = ? WHERE user_name = ?"
        let result = await queryDb(sql, name);
        if (result[0] != undefined) {
            if (await bcrypt.compare(password, result[0].user_password)) {
                const token = jwt.sign({
                    username: result[0].user_name,
                    userId: result[0].user_id,
                }, "" + process.env.JWT_KEY, {
                    expiresIn: "365d"
                });
                let dbToken = [
                    token,
                    username
                ]
                await queryDb(updateToken, dbToken)
                const decoded = jwt.decode(token);
                return { 'token': token, 'decoded': decoded, 'nick': result[0].user_nick };
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}