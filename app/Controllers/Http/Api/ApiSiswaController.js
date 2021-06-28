'use strict'

// panggil model siswa
const siswaModel = use('App/Models/Siswa')

// gunakan helpers untuk bawaan helpers
const Helpers = use('Helpers')

// gunakan drive untuk hapus file
const Drive = use('Drive')


class ApiSiswaController {
  async index({
    request,
    response,
  }) {
    let siswa = await siswaModel.all()
    try {
      var res = {
        status: true,
        message: 'Success',
        data: siswa
      }
    } catch (err) {
      var res = {
        status: false,
        message: 'Error',
        data: []
      }
    }

    response.json(res);
  }

  async add({
    request,
    response,
    session
  }) {
    // membuat object baru siswa
    const siswa = new siswaModel();
    // menangkap gambar
    const siswa_foto = request.file('siswa_foto', {
      type: ['image'],
      size: '2mb'
    })

    try {

      if (siswa_foto != null) {
        // ambil nama foto
        let ambil_foto = siswa_foto.clientName;
        let n_foto = ambil_foto.split(".", 1);
        let nama_foto = `${n_foto}-${new Date().getTime()}.${siswa_foto.subtype}`;

        // memindahkan foto ke folder img/siswa/ di public
        await siswa_foto.move(Helpers.publicPath('img/siswa/'), {
          name: nama_foto,
          overwrite: true
        })
        // tampilkan pesan jika tidak berhasil
        if (!siswa_foto.moved()) {
          response.json(siswa_foto.error())
        }

        // deklarasikan nama field di tabel
        siswa.siswa_nama = request.input('siswa_nama')
        siswa.siswa_foto = nama_foto
        // proses insert
        await siswa.save()
      } else {
        // deklarasikan nama field di tabel
        siswa.siswa_nama = request.input('siswa_nama')
        // proses insert
        await siswa.save()
      }

      var res = {
        status: true,
        message: 'Success'
      }
    } catch (err) {
      console.log(err)
      var res = {
        status: false,
        message: 'Error'
      }
    }
    response.json(res)
  }

  async edit({
    request,
    response,
    params
  }) {
    const id = params.id
    const siswa = await siswaModel.find(id)
    // membuat judul untuk tampilan awal
    try {
      var res = {
        status: true,
        message: 'Success',
        data: siswa
      }
    } catch (err) {
      var res = {
        status: false,
        message: 'Error',
        data: []
      }
    }
    response.json(res);
  }

  async update({
    request,
    response,
    params,
    session
  }) {
    const id = params.id;
    const siswa = await siswaModel.find(id);
    const gambar_lama = siswa.siswa_foto;
    // console.log('img/siswa/' + gambar_lama);
    const siswa_foto = request.file('siswa_foto', {
      type: ['image'],
      size: '2mb'
    })
    try {
      if (siswa_foto != null) {
        let ambil_foto = siswa_foto.clientName;
        let n_foto = ambil_foto.split(".", 1);
        let nama_foto = `${n_foto}-${new Date().getTime()}.${siswa_foto.subtype}`;

        // hapus file lama
        await Drive.delete('img/siswa/' + gambar_lama);

        // memindahkan foto ke folder img/siswa/ di public
        await siswa_foto.move(Helpers.publicPath('img/siswa/'), {
          name: nama_foto,
          overwrite: true
        })

        // tampilkan pesan jika tidak berhasil
        if (!siswa_foto.moved()) {
          return siswa_foto.error()
        }

        // deklarasikan nama field di tabel
        siswa.siswa_nama = request.input('siswa_nama')
        siswa.siswa_foto = nama_foto
        siswa.siswa_id = id
        // proses insert
        await siswa.save()
      } else {
        // deklarasikan nama field di tabel
        siswa.siswa_nama = request.input('siswa_nama')
        siswa.siswa_id = id
        // proses insert
        await siswa.save()
      }
      var res = {
        status: true,
        message: 'Success'
      }
    } catch (err) {
      var res = {
        status: false,
        message: 'Error'
      }
    }
    response.json(res)
  }

  async hapus({
    request,
    response,
    params,
    session
  }) {
    const id = params.id;
    const siswa = await siswaModel.find(id)
    const gambar_lama = siswa.siswa_foto;

    try {
      // hapus file lama
      await Drive.delete('img/siswa/' + gambar_lama);
      await siswa.delete()
      var res = {
        status: true,
        message: 'Success'
      }
    } catch (err) {
      var res = {
        status: false,
        message: 'Error'
      }
    }
    response.json(res)
  }



}

module.exports = ApiSiswaController
