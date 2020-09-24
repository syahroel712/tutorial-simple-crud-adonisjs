"use strict";

// ambil model pengguna
const pengguna = use("App/Models/Pengguna");

class UserController {
  // function index, tidak perlu buat function
  index({ request, response, view }) {
    return view.render("admin.page.user.index");
  }
}

module.exports = UserController;
