"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const genreRoutes_1 = __importDefault(require("./routes/genreRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)({
    origin: 'https://movieflex1.netlify.app/' 
}));
app.use(express_1.default.json());
// Routes
app.use('/api/genres', genreRoutes_1.default);
app.use('/api/movies', movieRoutes_1.default);
mongoose_1.default
    .connect(process.env.MONGO_URI || '')
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => console.error("DB Connection Error:", err));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
