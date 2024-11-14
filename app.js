import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './src/routes.js';
import methodOverride from 'method-override';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(router);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

export default app;
