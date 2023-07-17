// memanggil schema yang telah di buat yang di tampung di variable Mahasiswa
const Mahasiswa = require('../models/mhsEmbedded');

module.exports = {
    insert : async (req, res) => {
        try {
            // insert data menggunakan modal Mahasiswa yang telah di buat
          const dataMhs = new Mahasiswa(req.body);
          await dataMhs.save();
          res.status(201).json(dataMhs)
        } catch (error) {
          res.status(400).json({ error: 'Terjadi kesalahan saat menambahkan data mahasiswa' });
        }
    },
    
    getMahasiswa : async (req, res) => {
        try {
            // menampilkan semua data dengan menggunakan perintah Mahasiswa.find()
            const dataKtm = await Mahasiswa.find();
            res.json(dataKtm);
        } catch (error) {
            console.log(`gagal menampilkan data ${error}`);
            res.status(500).json({ error: `Terjadi kesalahan saat mendapatkan data mahasiswa ${error}` });
        }
    },

    getMahasiswaByNim : async (req, res) => {
        const nim = req.params.nim;
        try {
            // mencari data berdasarkan nim yang telah di minta dari client
            // .find() perintah menampilkan semua data
            // .where('nim') dengan dimana key 'nim'
            // .equals(nim) sesuai dengan nim yang telah di terima dari req
            const data = await Mahasiswa.find().where('nim').equals(nim);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message : error.message });
        }
    },

    update : async (req, res) => {
        const filter = { nim : req.params.nim};
        const updateData = {
                ttl: req.body.ttl,
                alamat: req.body.alamat,
                nama: req.body.nama,
                nim: req.params.nim,
                angkatan: req.body.angkatan,
                jurusan: req.body.jurusan
            };
        try {      
            // Lakukan pembaruan updateData mahasiswa berdasarkan NIM
            // menggunakan updateOne yang dimana parameter pertama yaitu filter
            // yakni mencari data yang sesuai dengan filter
            // untuk parameter ke dua yaitu data update untuk memperbaharui data yang lama
            await Mahasiswa.updateOne(filter, {$set: updateData});
            res.status(200).json(updateData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete : async (req, res) => {
        const filter = { nim : req.params.nim };
        try{
            // hapus data dengan parameter nim yang telah di tentukan menggunakan .deleteOne()
            await Mahasiswa.deleteOne(filter);
            res.json({ message: 'Data mahasiswa berhasil dihapus' });
      
        } catch (error){
            res.status(409).json({ message : error.message });
        }
    },

    // embedded
    insertNilai : async (req, res) => {
        const { nim } = req.params;
        try{
            // update embeded data
            // embeded data collection bersarang
            // di embeded data insert update delete itu menggunakan perintah update
            await Mahasiswa.updateOne(
                // cari data yang akan di update disini update data berdasarkan nim
                { nim : nim},
                {
                    // perintah push adalah untuk memperbahrui data
                    $push: {
                        nilai: {
                            program : req.body.program,
                            sks : req.body.sks,
                            dosen : req.body.dosen,
                            nilai : req.body.nilai,
                            NxK : req.body.NxK,
                            smt: req.body.smt
                        }
                    }
                });
            res.send('Nilai telah di simpan')
        }catch (error){
            res.status(500).json({ message: error.message });
        }
    },
    
    getNilaiByNim : async (req, res) => {
        const { nim } = req.params;
        try {
            // mencari data
            const result = await Mahasiswa.findOne( 
                {'nim': nim}, 
                { '_id': 0, 'nilai': 1 } );
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getNilaiByNimSemester : async (req, res) => {
        const { nim, smt } = req.params;
        console.log(nim,smt);
        try{
            const result = await Mahasiswa.aggregate([
                { $match: { nim: nim } },
                { $unwind: "$nilai" },
                { $match: { "nilai.smt": smt } },
                { $group: { _id: null, nilai: { $push: "$nilai" } } },
                { $project: { _id: 0, nilai: 1 } }
            ]);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateNilaiByNimProgram: async (req, res ) => {
        const { nim, program } = req.params;
        const { nilai } = req.body;
        try {
            const mahasiswa = await Mahasiswa.findOneAndUpdate(
                { nim, 'nilai.program': program },
                { $set: { 'nilai.$': nilai } },
                { new: true }
            );
            res.status(200).json({ message : mahasiswa.nilai });
        } catch ( error ){
            res.status(500).json({ message : error.message });
        }
    },

    getNilaiByNimProgram: async (req, res ) => {
        const { nim, program } = req.params;
        console.log(nim, program);
        try {
            const result = await Mahasiswa.aggregate([
                { $match: { nim: nim } },
                { $unwind: "$nilai" },
                { $match: { "nilai.program": program } },
                { $group: { _id: null, nilai: { $push: "$nilai" } } },
                { $project: { _id: 0, nilai: 1 } }
            ]);

            // const result = await Mahasiswa.find( 
            //     {'nim': nim, 'nilai.program': { $eq: program }}, 
            //     { '_id': 0, 'nilai': 1 } );
            res.json(result);
        } catch ( error ){
            res.status(500).json({ message : error.message });
        }
    },

    updateNilaiByNimId: async (req, res ) => {
        const { nim, id } = req.params;
        try{

        }catch ( error ) {
            res.status(500).json({ message: error.message });
        }
    }
    
}