import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { connectDb } from './db/connectdb';

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.get('/', (__: Request, res: Response) => {
  res.json({ status: true })
})

app.use((__, res) => {
  res.status(400).json({ success: false, error: "El recurso no se encuentra." })
})

app.listen(PORT, () => {
  console.log(`✅ app running in port: ${PORT}`)
  connectDb();
})