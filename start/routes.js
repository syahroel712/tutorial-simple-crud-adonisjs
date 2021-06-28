"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
// routing home
// Route.on("/").render("welcome");
// // routing secara langsung tanpa bawa parametersdasd
// Route.get("/about", () => "About Me!!");
// // routing dengan controller dengan views
// Route.get("/user/tampil", "Admin/UserController.index");

// routing admin home
Route.get("/admin/dashboard", "Admin/HomeController.index").middleware(['Authenticate']);

Route.get("/login", "Admin/HomeController.login").middleware(['RedirectIfAuthenticated']);
Route.post("/login/check", "Admin/HomeController.loginCheck").as('login.check').middleware(['RedirectIfAuthenticated']);

Route.get("logout", "Admin/HomeController.logout").as('logout').middleware(['Authenticate'])

Route.get("/register", "Admin/HomeController.register");
Route.post('/admin/home/registerAdd', "Admin/HomeController.registerAdd").as('register.add')

// routing siswa
Route.get("/admin/siswa", "Admin/SiswaController.index").as('siswa').middleware(['Authenticate']);
Route.get("/admin/siswa/tambah", "Admin/SiswaController.tambah").as('siswa.tambah').middleware(['Authenticate']);
Route.post("/admin/siswa/add", "Admin/SiswaController.add").as('siswa.add').validator('ValidasiSiswa').middleware(['Authenticate']);
Route.get("/admin/siswa/edit/:id", "Admin/SiswaController.edit").as('siswa.edit').middleware(['Authenticate']);
Route.post("/admin/siswa/update/:id", "Admin/SiswaController.update").as('siswa.update').validator('ValidasiSiswa').middleware(['Authenticate']);
Route.get("/admin/siswa/hapus/:id", "Admin/SiswaController.hapus").as('siswa.hapus').middleware(['Authenticate']);


// routing api siswa
Route.get("api/siswa", "Api/ApiSiswaController.index").as('api.siswa');
Route.post("api/siswa/add", "Api/ApiSiswaController.add").as('api.siswa.add');
Route.get("api/siswa/edit/:id", "Api/ApiSiswaController.edit").as('api.siswa.edit');
Route.post("api/siswa/update/:id", "Api/ApiSiswaController.update").as('api.siswa.update');
Route.get("api/siswa/hapus/:id", "Api/ApiSiswaController.hapus").as('api.siswa.hapus')
