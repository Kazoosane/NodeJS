const notFound = (req, res) => {
    res.status(404).json({
        message: `Route ${req.method} ${req.originalUrl} tidak ditemukan.`
    });
}

const errorHandler = (err, req, res, next) => {
    const status = err.status || err.statusCode || 500;

    if(status >= 500) {
        console.log(err)
    }

    res.status(status).json({
        message: status >= 500 ? 'Terjadi kesalahan pada server' : err.message
    });
}
module.exports = { notFound, errorHandler };