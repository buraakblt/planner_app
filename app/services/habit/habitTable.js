const queryDb = require('../queryDb')
exports.HabitTable = class {
    constructor() {}

    async getH(token) {
        var sql = "SELECT * FROM habits WHERE user_id=(SELECT id FROM users WHERE user_token=?)"
        let value = [
            token
        ]
        try {

            return await queryDb(sql, value)
        } catch (err) {
            console.log(err)
        }
    }

    async postH(name, start, due, token) {
        var sql = "INSERT INTO habits (name, start, due, user_id) VALUES (?, ?, ?, (SELECT id FROM users WHERE user_token=?))";
        let values = [
            name, start, due, token
        ]
        try {
            return await queryDb(sql, values)
        } catch (err) {
            console.log(err)
        }
    }

    async deleteH(id, token) {
        var sql = "DELETE FROM habits WHERE id= ? AND user_id=(SELECT id FROM users WHERE user_token=?)";
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

    async patchH(id, token, name, start, due) {
        var sql = "UPDATE habits SET name = ?, start = ?, due = ? WHERE id = ? AND user_id=(SELECT id FROM users WHERE user_token=?)";
        let values = [
            name, start, due, id, token
        ]
        try {
            return await queryDb(sql, values)
        } catch (err) {
            console.log(err)
        }
    }
}