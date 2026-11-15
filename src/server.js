require('dotenv').config();
const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 3000;

pool
    .query('SELECT 1')
    .then(() => {
        console.log('Berhasil terhubung ke database PostgreSQL');
        app.listen(PORT, () => {
            console.log(`Server berjalan di http://localhost:${PORT}`);
        })
    })
    .catch((err) => {
        console.log('Gagal terhubung ke database PostgreSQL', err.message);
        process.exit(1);
    })