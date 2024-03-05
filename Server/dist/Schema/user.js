"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registers = exports.userSchema = void 0;
var mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.default.Schema({
    "_id": mongoose_1.default.Schema.Types.ObjectId,
    "username": { type: String, required: true },
    "password": { type: String },
    "email": { type: String, required: true },
    "role": String
});
exports.registers = mongoose_1.default.model("registers", exports.userSchema);
