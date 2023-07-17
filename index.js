const express = require('express');
const app = express();
const port = 5000;
const routerMahasiswa = require('./routers/mahasiswa');
const cors = require('cors');

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'koneksi error'));
db.once('open', () => console.log('berhasil terkoneksi ke mongodb'));

app.use(routerMahasiswa);

app.listen(port, () => console.log(`server listening on port ${port}`));