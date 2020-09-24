"use strict";

// deklarasikan/gunakan model
const siswaModel = use('App/Models/Siswa');

// gunakan helpers untuk bawaan helpers
const Helpers = use('Helpers')

// gunakan drive untuk hapus file
const Drive = use('Drive')

// gunakan validator
const {
  validate,
  sanitize,
  sanitizor
} = use('Validator')

class SiswaController {

  async index({
    request,
    response,
    view
  }) {
    // ambil data semua data siswa
    let siswa = await siswaModel.all();
    // membuat judul untuk tampilan awal
    let title = "Data Siswa";

    // mengembalikan data ke view
    return view.render("admin.page.siswa.index", {
      'title': title,
      'siswa': siswa.rows
    });
  }


  tambah({
    request,
    response,
    view
  }) {
    // membuat judul untuk tampilan tambha data
    let title = "Tambah Data Siswa";
    // menampilkan view
    return view.render("admin.page.siswa.tambah", {
      'title': title
    });
  }


  async add({
    request,
    response,
    view,
    session
  }) {
    // membuat object baru siswa
    const siswa = new siswaModel();
    // menangkap gambar
    const siswa_foto = request.file('siswa_foto', {
      type: ['image'],
      size: '2mb'
    })

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
        return siswa_foto.error()
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

    //menggunakan pesan jika berhasil
    session.flash({
      pesan: 'Tambah Data Berhasil!'
    })

    // proses balik ke route awal
    response.redirect('/admin/siswa', true)
  }

  async edit({
    request,
    response,
    view,
    params
  }) {
    const id = params.id
    const siswa = await siswaModel.find(id)
    // membuat judul untuk tampilan awal
    let title = "Edit Data Siswa";
    return view.render('admin.page.siswa.edit', {
      'title': title,
      'siswa': siswa
    });
  }

  async update({
    request,
    response,
    view,
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
    //menggunakan pesan jika berhasil
    session.flash({
      pesan: 'Edit Data Berhasil'
    })
    // proses balik ke route awal
    response.redirect('/admin/siswa', true)
  }

  async hapus({
    request,
    response,
    view,
    params,
    session
  }) {
    const id = params.id;
    const siswa = await siswaModel.find(id)
    const gambar_lama = siswa.siswa_foto;
    // hapus file lama
    await Drive.delete('img/siswa/' + gambar_lama);

    await siswa.delete()

    //menggunakan pesan jika berhasil
    session.flash({
      pesan: 'Hapus Data Berhasil'
    })

    // proses balik ke route awal
    response.redirect('/admin/siswa', true)
  }

}

module.exports = SiswaController;
