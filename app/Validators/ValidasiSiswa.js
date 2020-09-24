'use strict'

class ValidasiSiswa {
  get rules() {
    return {
      // validation rules
      siswa_nama: 'required',
      // siswa_foto: 'file|file_ext:jpg,png|file_size:2mb'
    }
  }

  get messages() {
    return {
      'siswa_nama.required': 'Wajib Di Isi',
      'siswa_foto.required': 'Wajib Di Isi',
    }
  }

  get sanitizationRules() {
    return {
      // 
    }
  }
}

module.exports = ValidasiSiswa
