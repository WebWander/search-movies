"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MovieSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    rating: { type: String, required: true },
    actors: [{ type: String }],
    genre: { type: String, required: true },
    synopsis: { type: String },
    thumbnail: { type: String },
    isTrending: { type: Boolean, default: false },
});
exports.default = mongoose_1.default.model('Movie', MovieSchema);
