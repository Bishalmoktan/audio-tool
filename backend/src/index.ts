import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import errorMiddleware from './middlewares/error.middleware';
import enhanceRoute from './routes/enhance.route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', enhanceRoute);

// Test route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Express + TypeScript Server' });
});

app.use(errorMiddleware);

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
