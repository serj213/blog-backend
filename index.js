require('dotenv').config()
const express = require('express');
const sequelize = require('./db.js');
const cors = require('cors');
const models = require('./models/models.js');
const router = require('./routes/index.js');
const errorHandler = require('./middleware/ErrorHandlerMiddleware.js');

const PORT = process.env.PORT || 2000

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router)

app.use(errorHandler)


const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`server started ${PORT}`, ))
    } catch (error) {
        
    }
}

start()