"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Movie_1 = __importDefault(require("../models/Movie"));
const router = (0, express_1.Router)();
// Get movies by genre
router.get('/genre/:genre', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Received request for genre: ${req.params.genre}`);
    try {
        const genre = req.params.genre.toLowerCase();
        const filteredMovies = yield Movie_1.default.find({
            genre: { $regex: new RegExp(`\\b${genre}\\b`, 'i') }
        });
        // If no movies found, return a 404 status
        if (filteredMovies.length === 0) {
            res.status(404).json({ message: "No movies found for this genre." });
            return;
        }
        // Respond with the filtered movies
        res.json(filteredMovies);
    }
    catch (error) {
        console.error('Error occurred while fetching movies by genre:', error);
        res.status(500).json({ message: "An error occurred while fetching movies." });
    }
}));
exports.default = router;
