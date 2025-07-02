const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const routes = require('./src/routes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
