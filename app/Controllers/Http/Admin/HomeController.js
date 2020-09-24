"use strict";

const User = use('App/Models/User');
const {
  validate,
  sanitize,
  sanitizor
} = use('Validator')

class HomeController {

  index({
    request,
    response,
    view
  }) {
    return view.render("admin.page.index");
  }

  login({
    request,
    response,
    view
  }) {
    return view.render("admin.page.auth.login")
  }

  async loginCheck({
    request,
    response,
    auth,
    session
  }) {
    const {
      email,
      password
    } = request.all()

    await auth.attempt(email, password)
    return response.route('/admin/dashboard')
  }

  async logout({
    auth,
    response
  }) {
    await auth.logout()
    return response.route('/login')
  }

  register({
    request,
    response,
    view
  }) {
    return view.render("admin.page.auth.register");
  }

  async registerAdd({
    request,
    response,
    view,
    session
  }) {
    // buat aturan validasi
    const rules = {
      nama: 'required',
      email: 'required|unique:users,email',
      password: 'required'
    }
    // buat pesan validasi
    const messages = {
      'nama.required': 'Nama wajib di isi',
      'email.required': 'Email wajib di isi',
      'email.unique': 'Email sudah terdaftar!',
      'password.required': 'Password wajib di isi'
    }
    // cek data apakah sudah tervalidasi
    const validation = await validate(request.all(), rules, messages)

    // jika validasi gagal
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept(['password'])
      return response.redirect('back')
    }

    const user = await User.create({
      nama: request.input('nama'),
      email: request.input('email'),
      password: request.input('password')
    })

    session.flash({
      pesan: 'Register Berhasil'
    })
    return response.redirect('back')
  }
}

module.exports = HomeController;
