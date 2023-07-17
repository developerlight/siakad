const mongoose = require('mongoose');

const mhsSchema = new mongoose.Schema({
    nama: {
      type: String,
      required: [true, 'Nama harus diisi']
    },
    nim: {
      type: String,
      required: [true, 'NIM harus diisi']
    },
    angkatan: {
      type: String,
      required: [true, 'Angkatan harus diisi']
    },
    jurusan: {
      type: String,
      required: [true, 'Jurusan harus diisi']
    },
    ttl: {
      tempat: String,
      tanggal: String,
      bulan: String,
      tahun: String
    },
    alamat: {
      ds: String,
      kec: String,
      kab: String,
      prov: String
    },
    nilai:[{
      program : String,
      sks : Number,
      dosen : String,
      nilai : String,
      NxK : Number,
      smt: String
    }]
});

module.exports = mongoose.model('Mahasiswa', mhsSchema, 'ktm');