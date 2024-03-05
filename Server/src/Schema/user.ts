import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
    {

        "_id": mongoose.Schema.Types.ObjectId,
        "username": { type: String, required: true },
        "password": { type: String },
        "email": { type: String, required: true },
        "role": String

    }
)

export const registers = mongoose.model("registers", userSchema);

