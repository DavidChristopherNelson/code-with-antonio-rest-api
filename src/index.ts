import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './router';

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});

const MONGODB_ATLAS_PASSWORD = process.env.MONGODB_ATLAS_PASSWORD
const MONGO_URL = `mongodb+srv://david:${MONGODB_ATLAS_PASSWORD}@cluster0.guwvp.mongodb.net/?retryWrites=true&w=majority`

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());
