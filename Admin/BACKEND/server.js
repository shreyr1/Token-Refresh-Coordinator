import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import http from 'http';
import app from './app.js';

const port = process.env.ADMIN_PORT || 3001;

const server = http.createServer(app);

server.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})
