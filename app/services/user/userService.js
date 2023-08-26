const { UserTable } = require('./userTable');
const jwt = require('jsonwebtoken')
exports.UserService = class {
    app
    userTable = new UserTable()
    constructor(app) {
        this.app = app
        this.getUser = this.getUser.bind(this)
        this.loginPost = this.loginPost.bind(this)
        this.registerPost = this.registerPost.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.setupRoutes()
    }
    setupRoutes() {
        this.app.get('/users', this.getUser)
        this.app.post('/users/register', this.registerPost)
        this.app.post('/users/login', this.loginPost)
        this.app.delete('/users/:userId', this.deleteUser)
    }

    async deleteUser(req, res) {
        let id = req.params.userId
        const token = req.params.token
        try {
            let result = await this.userTable.deleteU(userId, token)
            res.send(result);
        } catch (err) {
            console.log(err)
            throw (err)
        }
    }

    async getUser(req, res) {
        try {
            let result = await this.userTable.byName()
            res.send(result);

        } catch (err) {
            console.log(err)
            throw (err)
        }

    }

    async registerPost(req, res) {
        if (await this.userTable.register(req.body.name, req.body.pass, req.body.nick)) {
            res.send("Success")
        } else {
            res.send("Duplicate")
        }
    }


    async loginPost(req, res) {
        let EntireToken;
        if ((EntireToken = await this.userTable.login(req.body.name, req.body.pass)) != null) {
            res.status(200).send(EntireToken);
        } else {
            res.send("Not allowed");
        }

    }
}