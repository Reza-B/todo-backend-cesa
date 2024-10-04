import dotenv from 'dotenv';
dotenv.config();

export const mongoURI = process.env.MONGO_URI;
export const jwtSecret = process.env.JWT_SECRET;
