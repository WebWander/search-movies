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
// Get all movies
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield Movie_1.default.find();
        res.json(movies);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Get trending movies
router.get('/trending', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trendingMovies = yield Movie_1.default.find({ isTrending: true });
        res.json(trendingMovies);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Get a movie by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield Movie_1.default.findById(req.params.id);
        if (movie) {
            res.json(movie);
        }
        else {
            res.status(404).json({ message: 'Movie not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
