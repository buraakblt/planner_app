const queryDb = require('../queryDb')
exports.PlaceTable = class {
    constructor() {}

    async getP(token) {
        var sql = "SELECT * from places WHERE user_id=(SELECT id FROM users WHERE user_token = ?)"
        let values = [
            token
        ]
        try {
            return await queryDb(sql, values)
        } catch (err) {
            console.log(err)
        }
    }

    async postP(name, belong, token) {
        var sql = "INSERT INTO places (name, belong, user_id) VALUES (?,?,(SELECT id FROM users WHERE user_token=?))";
        let values = [
            name, belong, token
        ]
        try {
            return await queryDb(sql, values)
        } catch (err) {
            console.log(err.message)
        }
    }

    async deleteP(id, token) {
        var sql = "DELETE FROM places WHERE id= ? AND user_id=(SELECT id FROM users WHERE user_token = ?)";
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

    async patchP(id, token, visited) {
        let values = [visited, id, token]
        var sql = "UPDATE places SET visited = ? WHERE id = ? AND user_id = (SELECT id FROM users WHERE user_token=?)"
        try {
            return await queryDb(sql, values)
        } catch (err) {
            console.log(err)
        }
    }

}