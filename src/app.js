const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const { notFound, errorHandler } =  require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'API perpustakaan berjalan'
    })
})

app.use('/api/books', bookRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;