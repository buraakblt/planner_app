const { PlaceTable } = require('./placeTable');
const chechAuth = require('../middeware/chech-auth');
exports.PlaceService = class {
    app
    placeTable = new PlaceTable()
    constructor(app) {
        this.app = app
        this.postPlaces = this.postPlaces.bind(this)
        this.getPlaces = this.getPlaces.bind(this)
        this.deletePlace = this.deletePlace.bind(this)
        this.patchPlace = this.patchPlace.bind(this)
        this.setupRoutes()
    }

    setupRoutes() {
        this.app.get('/places', chechAuth, this.getPlaces)
        this.app.post('/places', chechAuth, this.postPlaces)
        this.app.delete('/places/:id', chechAuth, this.deletePlace)
        this.app.patch('/places/:id', chechAuth, this.patchPlace)
    }

    async patchPlace(req, res) {
        const id = req.params.id
        const token = req.headers.authorization.split(" ")[1]
        const body = req.body
        console.log(body)
        const visited = body.visited
        try {
            let result = await this.placeTable.patchP(id, token, visited)
            console.log(result)
            res.status(200).send("Success")
        } catch (err) {
            console.log(err.message)
        }
    }

    async deletePlace(req, res) {
        const id = req.params.id
        const token = req.headers.authorization.split(" ")[1]
        console.log(id)
        try {
            await this.placeTable.deleteP(id, token);
            res.status(200).send(id)
        } catch (err) {
            console.log(err)
        }
    }

    async postPlaces(req, res) {
        console.log("ok")
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        const body = req.body
        console.log(body);
        const name = body.name
        const belong = body.belong
        try {
            let result = await this.placeTable.postP(name, belong, token)
            if (result) {
                res.status(200).json({ 'insertId': result.insertId })
            } else {
                res.sendStatus(400)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    async getPlaces(req, res) {
        const token = req.headers.authorization.split(" ")[1]
        console.log("ok")
        console.log(token)
        let result = await this.placeTable.getP(token)
        res.send(result)
    }
}