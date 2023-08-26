const { DailyPlansTable } = require('./dailyPlansTable');
const chechAuth = require('../middeware/chech-auth');
exports.DailyPlansService = class {
    app
    dailyPlansTable = new DailyPlansTable()
    constructor(app) {
        this.app = app
        this.getDailyPlans = this.getDailyPlans.bind(this)
        this.postDailyPlan = this.postDailyPlan.bind(this)
        this.deleteDailyPlan = this.deleteDailyPlan.bind(this)
        this.patchDailyPlans = this.patchDailyPlans.bind(this)
        this.setupRoutes()
    }

    setupRoutes() {
        this.app.get('/dailyPlans', chechAuth, this.getDailyPlans)
        this.app.post('/dailyPlans', chechAuth, this.postDailyPlan)
        this.app.delete('/dailyPlans/:id', chechAuth, this.deleteDailyPlan)
        this.app.patch('/dailyPlans/:id', chechAuth, this.patchDailyPlans)
    }

    async patchDailyPlans(req, res) {
        const id = req.params.id
        const token = req.headers.authorization.split(" ")[1]
        const body = req.body
        console.log(body)
        const tz0 = body.tzone0
        const tz1 = body.tzone1
        const tz2 = body.tzone2
        const tz3 = body.tzone3
        const tz4 = body.tzone4
        const tz5 = body.tzone5
        const tz6 = body.tzone6
        const tz7 = body.tzone7
        const tz8 = body.tzone8
        const tz9 = body.tzone9
        try {
            let result = await this.dailyPlansTable.patchDP(id, token, tz0, tz1, tz2, tz3, tz4, tz5, tz6, tz7, tz8, tz9)
            console.log(result)
            res.status(200).send("Success")
        } catch (err) {
            console.log(err.message)
        }
    }

    async deleteDailyPlan(req, res) {
        const id = req.params.id
        const token = req.headers.authorization.split(" ")[1]
        console.log(id)
        try {
            await this.dailyPlansTable.deleteDP(id, token);
            res.status(200).send(id)
        } catch (err) {
            console.log(err)
        }
    }

    async postDailyPlan(req, res) {
        console.log("ok")
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        const body = req.body
        console.log(body);
        const id = body.date;
        const tz0 = body.tzone0
        const tz1 = body.tzone1
        const tz2 = body.tzone2
        const tz3 = body.tzone3
        const tz4 = body.tzone4
        const tz5 = body.tzone5
        const tz6 = body.tzone6
        const tz7 = body.tzone7
        const tz8 = body.tzone8
        const tz9 = body.tzone9
        try {
            let result = await this.dailyPlansTable.postDP(id, token, tz0, tz1, tz2, tz3, tz4, tz5, tz6, tz7, tz8, tz9)
            if (result) {
                res.status(200).json(id)
            } else {
                res.sendStatus(400)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    async getDailyPlans(req, res) {
        const token = req.headers.authorization.split(" ")[1]
        console.log("ok")
        console.log(token)
        let result = await this.dailyPlansTable.getDP(token)
        res.send(result)
    }
}