
import mongoose from "mongoose";
import { dbName } from "../globals";



export async function connectDB() {
    try {
        //@ts-ignore
        await mongoose.connect(`${process.env.URI}/${dbName}`);
        console.log("Connected to the Db");
    } catch (error) {
        console.log("failed to connect to the database");
        process.exit(0)
    }
}