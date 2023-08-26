const queryDb = require('../queryDb')
exports.BookTable = class {
    constructor() {}

    async getB(token) {
        var sql = "SELECT * from books WHERE user_id=(SELECT id FROM users WHERE user_token = ?)";
        let values = [
            token
        ]
        try {
            return await queryDb(sql, values);

        } catch (err) {
            console.log(err.message)
        }
    }

    async postB(name, author, page, start, due, rating = 0, read = 0, comment = "", token) {
        var sql = "INSERT INTO books (name, author, page, start, due, b_rating, isRead," +
            "comments, user_id) VALUES (?,?,?,?,?,?,?,?, (SELECT id FROM users WHERE user_token=?))";
        let values = [
            name, author, page, start, due, rating, read, comment, token
        ]
        try {
            return await queryDb(sql, values)
        } catch (err) {
            console.log(err.message)
        }
    }

    async deleteB(id, token) {
        var sql = "DELETE FROM books WHERE id= ? AND user_id=(SELECT id FROM users WHERE user_token = ?)";
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

    async patchB(id, token, name, author, page, start, due, b_rating, isRead, comments) {
        let definedValues = []
        let values = [name, author, page, start, due, b_rating, isRead, comments]
        let str = ['name', 'author', 'page', 'start', 'due', 'b_rating', 'isRead', 'comments']
        var sql = "UPDATE books SET"
        var sqlCheck = " WHERE id = ? AND user_id = (SELECT id FROM users WHERE user_token=?)"
        for (let i = 0; i < values.length; i++) {
            let tempVal = values[i]
            console.log(tempVal)
            if (tempVal != undefined) {
                sql += ` ${str[i]} = ?,`;
                definedValues.push(tempVal)
            }
        }
        definedValues.push(id)
        definedValues.push(token)
        sql = sql.slice(0, -1)
        sql += sqlCheck
        console.log(sql)
        console.log(definedValues)
        if (definedValues.length > 2) {
            try {
                return await queryDb(sql, definedValues)
            } catch (err) {
                console.log(err)
            }
        }

    }
}