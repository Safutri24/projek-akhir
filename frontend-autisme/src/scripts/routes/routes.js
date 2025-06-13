// routes.js
import HomePage from '../pages/home-page/beranda.js'; // Pastikan ada .js
import AboutPage from '../pages/about-page/tentang.js'; // Pastikan ada .js
import ArticlePage from '../pages/artikel-page/artikel.js'; // Pastikan ada .js
import ScreeningPage from '../pages/screening-page/skrining.js';
import ProfilePage from '../pages/profile-page/profile.js';
import LoginPage from '../pages/login-page/login.js'; // Pastikan ada .js
import RegisterPage from '../pages/register-page/register.js'; // Pastikan ada .js

const routes = {
  '#/': HomePage,      // <--- HANYA CLASS, BUKAN new HomePage()
  '#/about': AboutPage,
  '#/articel': ArticlePage,
  '#/login': LoginPage,   // <--- HANYA CLASS, BUKAN new LoginPage()
  '#/screening': ScreeningPage,
  '#/profile': ProfilePage,
  '#/register': RegisterPage,
};

export default routes;