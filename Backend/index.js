const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors())

const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Require testimonial routes
const testimonialRoutes = require('./routes/testimonial.routes.js');

// using as middleware
app.use('/api/testimonials', testimonialRoutes)

// Require users routes
const usersRoutes = require('./routes/users.routes.js');

// using as middleware
app.use('/api/users', usersRoutes)

// Require employees routes
const employeesRoutes = require('./routes/employees.routes.js');

// using as middleware
app.use('/api/employees', employeesRoutes)

// Require speaker routes
const speakerRoutes = require('./routes/speaker.routes.js');

// using as middleware
app.use('/api/speaker', speakerRoutes)

// Require province routes
const provinceRoutes = require('./routes/province.routes.js');

// using as middleware
app.use('/api/province', provinceRoutes)

// Require tribes routes
const tribesRoutes = require('./routes/tribes.routes.js');

// using as middleware
app.use('/api/tribes', tribesRoutes)

// Require occupation routes
const occupationRoutes = require('./routes/occupation.routes.js');

// using as middleware
app.use('/api/occupation', occupationRoutes)

// Require question routes
const questionRoutes = require('./routes/question.routes.js');

// using as middleware
app.use('/api/question', questionRoutes)

// Require church routes
const churchRoutes = require('./routes/church.routes.js');

// using as middleware
app.use('/api/church', churchRoutes)

// Require temp_purchase_details routes
const temp_purchase_detailsRoutes = require('./routes/temp_purchase_details.routes.js');

// using as middleware
app.use('/api/temp_purchase_details', temp_purchase_detailsRoutes)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});