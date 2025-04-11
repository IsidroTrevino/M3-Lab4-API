import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);

app.listen(3000);

console.log(`Server is running on http://localhost:3000`);