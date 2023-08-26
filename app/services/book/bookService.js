const { BookTable } = require('./bookTable');
const chechAuth = require('../middeware/chech-auth');
exports.BookService = class {
    app
    bookTable = new BookTable()
    constructor(app) {
        this.app = app
        this.postBook = this.postBook.bind(this)
        this.getBooks = this.getBooks.bind(this)
        this.deleteBook = this.deleteBook.bind(this)
        this.patchBook = this.patchBook.bind(this)
        this.setupRoutes()
    }

    setupRoutes() {
        this.app.post('/books/', chechAuth, this.postBook)
        this.app.get('/books/', chechAuth, this.getBooks)
        this.app.delete('/books/:id', chechAuth, this.deleteBook)
        this.app.patch('/books/:id', chechAuth, this.patchBook)
    }

    async patchBook(req, res) {
        const id = req.params.id
        const token = req.headers.authorization.split(" ")[1]
        const body = req.body
        const name = body.name
        const author = body.author
        const page = body.page
        const start = body.start
        const due = body.due
        const rating = body.rating
        const read = body.read
        const comment = body.comment
        try {
            let result = await this.bookTable.patchB(id, token, name, author, page, start, due, rating, read, comment)
            console.log(result)
            res.status(200).send("Success")
        } catch (err) {
            console.log(err.message)
        }
    }

    async deleteBook(req, res) {
        const id = req.params.id
        const token = req.headers.authorization.split(" ")[1]
        console.log(id)
        try {
            await this.bookTable.deleteB(id, token);
            res.status(200).send(id)
        } catch (err) {
            console.log(err)
        }
    }

    async postBook(req, res) {
        const token = req.headers.authorization.split(" ")[1]
        const body = req.body
        console.log(body);
        const name = body.name
        const author = body.author
        const page = body.page
        const start = body.start
        const due = body.due
        const rating = body.rating
        const read = body.read
        const comment = body.comment
        try {
            let result = await this.bookTable.postB(name, author, page, start, due, rating, read, comment, token)
            if (result) {
                res.status(200).json({ 'insertId': result.insertId })
            } else {
                res.sendStatus(400)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    async getBooks(req, res) {
        const token = req.headers.authorization.split(" ")[1]
        let result = await this.bookTable.getB(token)
        res.send(result)
    }
}