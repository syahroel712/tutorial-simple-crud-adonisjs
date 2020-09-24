'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SiswaSchema extends Schema {
  up() {
    this.create('tb_siswa', (table) => {
      table.increments('siswa_id')
      table.string('siswa_nama', 255)
      table.string('siswa_foto', 255)
    })
  }

  down() {
    this.drop('tb_siswa')
  }
}

module.exports = SiswaSchema
