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
const Bookmark_1 = __importDefault(require("../models/Bookmark"));
const router = (0, express_1.Router)();
// GET all bookmarked movies for the user
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookmarks = yield Bookmark_1.default.find().populate('movie');
        const bookmarkedMovies = bookmarks.map(bookmark => bookmark.movie);
        res.json(bookmarkedMovies);
    }
    catch (error) {
        console.error('Error fetching bookmarks:', error);
        res.status(500).json({ error: 'Failed to fetch bookmarks' });
    }
}));
router.get('/check/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = req.params.id;
    try {
        const isBookmarked = yield Bookmark_1.default.exists({ movie: movieId });
        res.json({ isBookmarked: !!isBookmarked });
    }
    catch (error) {
        console.error('Error checking bookmark status:', error);
        res.status(500).json({ error: 'Failed to check bookmark status' });
    }
}));
// POST to add a movie to bookmarks
router.post('/add', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movie } = req.body;
    if (!movie) {
        console.error('No movie ID provided');
        return res.status(400).json({ error: 'movie ID is required' });
    }
    try {
        // Use findOneAndUpdate with upsert: true to avoid duplicates
        const bookmark = yield Bookmark_1.default.findOneAndUpdate({ movie }, { $setOnInsert: { movie } }, { upsert: true, new: true });
        res.status(201).json({ message: 'Movie bookmarked successfully', bookmark });
    }
    catch (error) {
        console.error('Error bookmarking movie:', error);
        res.status(500).json({ error: 'Failed to bookmark movie' });
    }
})));
// POST to remove a movie from bookmarks
router.post('/remove', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movie } = req.body;
    if (!movie) {
        return res.status(400).json({ error: 'movie ID is required to remove bookmark' });
    }
    try {
        const bookmark = yield Bookmark_1.default.findOneAndDelete({ movie });
        if (!bookmark) {
            return res.status(404).json({ error: 'Bookmark not found' });
        }
        res.json({ message: 'Bookmark removed successfully' });
    }
    catch (error) {
        console.error('Error removing bookmark:', error);
        res.status(500).json({ error: 'Failed to remove bookmark' });
    }
})));
exports.default = router;
