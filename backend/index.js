import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './Routes/auth.js';
import userRoutes from './Routes/user.js';
import doctorRoutes from './Routes/doctors.js';
import reviewRoutes from './Routes/review.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    orgin:true,
}

app.get('/', (req, res) => {
    res.send('Api is worlking');
});


//Database connection

mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connection success");
    } catch (error) {
        console.log("MongoDB connection fail");
        process.exit(1);
    }
}

//middleware

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoutes); //domain/api/v1/auth/register
app.use('/api/v1/users', userRoutes); //domain/api/v1/user/:id
app.use('/api/v1/doctors', doctorRoutes); //domain/api/v1/doctors/:id
app.use('/api/v1/reviews', reviewRoutes); //domain/api/v1/reviews/:id




app.listen(port, () => {
    connectDB();
    console.log("Server is running on port" + port);
});