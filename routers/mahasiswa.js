const express = require('express');
const routerMahasiswa = express.Router();
const controllerMahasiswa = require('../controllers/mahasiswa');

routerMahasiswa
    .route('/mahasiswa')
    .get(controllerMahasiswa.getMahasiswa)
    .post(controllerMahasiswa.insert);

routerMahasiswa
    .route('/mahasiswa/:nim')
    .get(controllerMahasiswa.getMahasiswaByNim)
    .put(controllerMahasiswa.update)
    .delete(controllerMahasiswa.delete);

routerMahasiswa
    .route('/nilai/:nim')
    .get(controllerMahasiswa.getNilaiByNim)
    .put(controllerMahasiswa.insertNilai);


routerMahasiswa
    .route('/nilai/:nim/:smt')
    .get(controllerMahasiswa.getNilaiByNimSemester)

routerMahasiswa
    .route('/nilai/:nim/program/:program')
    .get(controllerMahasiswa.getNilaiByNimProgram)
    .put(controllerMahasiswa.updateNilaiByNimProgram);

routerMahasiswa
    .route('/nilai/:nim/:id')
    .put(controllerMahasiswa.updateNilaiByNimId);


module.exports = routerMahasiswa;