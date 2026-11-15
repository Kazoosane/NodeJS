const pool = require('../config/db');

// MENGUBAH PARAMETER ID MENJADI INTEGER POSITIF, NULL JIKA TIDAK VALID
const parseId = (value) => {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null
};

// VALIDASI INPUT
const validateBook = (body, { partial = false } = {}) => {
    const errors = [];
    const { title, author, year } = body;

    if(!partial || title !== undefined) {
        if(typeof title !== "string" || title.trim() === '') {
            errors.push('Title wajib diisi (berupa teks)');
        }
    }

    if(!partial || author !==  undefined) {
        if(typeof author !== 'string' || author.trim() === '') {
            errors.push('Author wajib diisi (berupa teks)');
        }
    }

    if(year !== undefined && year !== null && !(Number.isInteger(year) || year < 0)) {
        errors.push('Year harus bilangan bulat >= 0');
    }
    return errors;
}

// GET /api/books
exports.getAll = async(req, res, next) => {
    try {
        const { rows } = await pool.query('SELECT * FROM books ORDER BY id ASC');
        res.json(rows);
    } catch (err){
        next(err);
    }
}

// GET /api/books/:id
exports.getById = async(req, res, next) => {
    try {
        const id = parseId(req.params.id);
        if(!id) return res.status(400).json({
            message: 'Id tidak valid.'
        });

        const { rows } = await pool.query('SELECT * FROM books WHERE id = $1', [id]);

        if(rows.length === 0) {
            return res.status(404).json({
                message: 'Buku tidak ditemukan.'
            });
        }
        res.json(rows[0]);
    } catch(err) {
        next(err);
    }
}

// POST /api/books
exports.create = async(req, res, next) => {
    try {
        const body = req.body || {};
        const errors = validateBook(body);

        if(errors.length) {
            return res.status(400).json({
                message: 'Validasi gagal', errors
            });
        }

        const { title, author, year = null } = body;
        const { rows } = await pool.query('INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *', [title.trim(), author.trim(), year]);
        res.status(201).json(rows[0]);
    } catch(err) {
        next(err);
    }
}