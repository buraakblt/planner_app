const express = require('express')
const app = express()
const cors = require('cors');
const BookService = require('./services/book/bookService').BookService;
const UserService = require('./services/user/userService').UserService;
const HabitService = require('./services/habit/habitService').HabitService;
const PlaceService = require('./services/place/placeService').PlaceService;
const DailyPlansService = require('./services/dailyPlans/dailyPlansService').DailyPlansService;



app.use(express.json())
app.use(cors())

let userService = new UserService(app);

let habitService = new HabitService(app);

let bookService = new BookService(app);

let placeService = new PlaceService(app);

let dailyPlansService = new DailyPlansService(app);


app.listen(8080);