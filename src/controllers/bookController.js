const pool = require('../config/db');

// MENGUBAH PARAMETER ID MENJADI INTEGER POSITIF, NULL JIKA TIDAK VALID
const parseId = (value) => {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null
};

// GET /api/books
exports.getAll = async(req, res, next) => {
    try {
        const { rows } = await pool.query('SELECT * FROM books ORDER BY id ASC');
        res.json(rows);
    } catch (err){
        next(err);
    }
}