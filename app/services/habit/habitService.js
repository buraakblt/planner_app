const { HabitTable } = require('./habitTable');
const chechAuth = require('../middeware/chech-auth');
exports.HabitService = class {
    app
    habitTable = new HabitTable()
    constructor(app) {
        this.app = app
        this.postHabit = this.postHabit.bind(this)
        this.getHabits = this.getHabits.bind(this)
        this.deleteHabit = this.deleteHabit.bind(this)
        this.patchHabit = this.patchHabit.bind(this)
        this.setupRoutes()
    }
    setupRoutes() {
        this.app.post('/habits/:token', chechAuth, this.postHabit)
        this.app.get('/habits/:token', chechAuth, this.getHabits)
        this.app.delete('/habits/:token/:id', chechAuth, this.deleteHabit)
        this.app.patch('/habits/:token/:id', chechAuth, this.patchHabit)
    }

    async patchHabit(req, res) {
        const id = req.params.id
        const token = req.params.token
        const body = req.body
        const name = body.name
        const start = body.start
        const due = body.due
        try {
            let result = await this.habitTable.patchH(id, token, name, start, due)
            console.log(result)
            res.status(200).send("Success")
        } catch (err) {
            console.log(err)
        }
    }

    async deleteHabit(req, res) {
        const id = req.params.id
        const token = req.params.token
        try {
            await this.habitTable.deleteH(id, token);
            res.send(id)
        } catch (err) {
            console.log(err)
        }
    }

    async postHabit(req, res) {
        let token = req.params.token
        try {
            let result = await this.habitTable.postH(req.body.name, req.body.start, req.body.due, token)
            if (result) {
                res.status(200).json({ 'insertId': result.insertId })
            } else {
                res.sendStatus(400)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    async getHabits(req, res) {
        const token = req.params.token
        let result = await this.habitTable.getH(token)
        res.send(result)
    }
}