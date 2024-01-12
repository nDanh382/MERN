const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
require('dotenv').config();
const authRouter = require('./Routes/auth')
const postsRouter = require('./Routes/posts')
// Connect to MongoDB 
mongoose.set('strictQuery', true)
const connectDB = async ()=> {
    try {
        mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@tolearnlist.aytrhmz.mongodb.net/?retryWrites=true&w=majority`);
        console.log('connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
connectDB();

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());
app.use(express.json());




app.get('/', (req, res)=> {
    res.send('hello')
})

app.use('/api/auth', authRouter )
app.use('/api/posts',postsRouter )


app.listen(PORT, ()=> {
    console.log(`Server is listening port ${PORT}`);
})