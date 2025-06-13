import routes from './routes/routes.js';
import HomePage from './pages/home-page/beranda.js';
import CONFIG from './utils/config.js';

// Import CSS utama Anda agar Webpack dapat memprosesnya dan menginject ke DOM
import '../styles/styles.css';

// Fungsi untuk memperbarui tampilan navigasi berdasarkan status autentikasi
export const updateNavBasedOnAuth = () => {
    // Selector untuk link desktop dan mobile
    const desktopAuthLinks = document.querySelectorAll('.auth-required-link.desktop-link');
    const mobileAuthLinks = document.querySelectorAll('.auth-required-link.mobile-link');
    const loginMenus = document.querySelectorAll('.login-menu'); // Login/Register
    const logoutMobileLink = document.getElementById('logout-link-mobile'); // Logout di mobile drawer
    const profileIconContainer = document.getElementById('profile-icon-container'); // Container ikon profil desktop

    const token = localStorage.getItem('userToken');

    if (token) {
        // Tampilkan link yang dilindungi di desktop (tentang, artikel, skrining)
        desktopAuthLinks.forEach(link => link.style.display = 'inline-block');
        
        // Tampilkan link yang dilindungi di mobile (profil saya)
        mobileAuthLinks.forEach(link => link.style.display = 'block'); // Karena di drawer itu block
        
        loginMenus.forEach(el => el.style.display = 'none'); // Sembunyikan login/register
        
        // Tampilkan logout di mobile drawer
        if (logoutMobileLink) {
            logoutMobileLink.style.display = 'block';
        }

        // Tampilkan ikon profil di desktop
        if (profileIconContainer) {
            // Hanya tampilkan jika lebar layar di atas 768px (desktop)
            if (window.matchMedia("(min-width: 769px)").matches) {
                profileIconContainer.style.display = 'flex'; // Gunakan flex untuk tata letak ikon & dropdown
            } else {
                profileIconContainer.style.display = 'none'; // Sembunyikan di mobile
            }
        }
    } else { // Belum login
        desktopAuthLinks.forEach(link => link.style.display = 'none'); // Sembunyikan link yang dilindungi
        mobileAuthLinks.forEach(link => link.style.display = 'none'); // Sembunyikan link profil mobile
        
        loginMenus.forEach(el => el.style.display = 'block'); // Tampilkan login/register
        
        // Sembunyikan logout di mobile drawer
        if (logoutMobileLink) {
            logoutMobileLink.style.display = 'none';
        }

        // Sembunyikan ikon profil di desktop saat logout
        if (profileIconContainer) {
            profileIconContainer.style.display = 'none';
        }
    }
};

// Fungsi untuk mengikat event listener ke tombol drawer dan profil dropdown
const bindDrawer = () => {
    const drawerButton = document.getElementById('drawer-button');
    const navigationDrawer = document.getElementById('navigation-drawer');
    const profileIcon = document.getElementById('profile-icon'); // Ikon profil desktop
    const profileDropdown = document.getElementById('profile-dropdown'); // Dropdown profil desktop
    const logoutLinkDesktop = document.getElementById('logout-link-desktop'); // Logout link di dropdown desktop
    const logoutLinkMobile = document.getElementById('logout-link-mobile'); // Logout link di mobile drawer

    // Debugging log
    console.log('[Drawer Debug] bindDrawer() called.');
    if (!drawerButton) console.error('[Drawer Debug] Tombol drawer tidak ditemukan!');
    if (!navigationDrawer) console.error('[Drawer Debug] Drawer navigasi tidak ditemukan!');
    if (!profileIcon) console.warn('[Profile Nav Debug] Ikon profil desktop tidak ditemukan!');
    if (!profileDropdown) console.warn('[Profile Nav Debug] Dropdown profil desktop tidak ditemukan!');
    if (!logoutLinkDesktop) console.warn('[Profile Nav Debug] Logout link desktop tidak ditemukan!');
    if (!logoutLinkMobile) console.warn('[Profile Nav Debug] Logout link mobile tidak ditemukan!');


    // Event listener untuk drawer mobile
    if (drawerButton && navigationDrawer) {
        drawerButton.addEventListener('click', (event) => {
            event.stopPropagation();
            navigationDrawer.classList.toggle('open');
        });

        document.body.addEventListener('click', (event) => {
            if (navigationDrawer.classList.contains('open') && !navigationDrawer.contains(event.target) && !drawerButton.contains(event.target)) {
                navigationDrawer.classList.remove('open');
            }
        });

        navigationDrawer.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navigationDrawer.classList.remove('open');
            });
        });
    }

    // Event listener untuk ikon profil desktop dan dropdown-nya
    if (profileIcon && profileDropdown) {
        profileIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            profileDropdown.classList.toggle('open');
        });

        document.body.addEventListener('click', (event) => {
            if (profileDropdown.classList.contains('open') && !profileDropdown.contains(event.target) && !profileIcon.contains(event.target)) {
                profileDropdown.classList.remove('open');
            }
        });
        
        profileDropdown.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                profileDropdown.classList.remove('open');
            });
        });
    }

    // Handler untuk logout dari dropdown desktop
    if (logoutLinkDesktop) {
        logoutLinkDesktop.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('userToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            updateNavBasedOnAuth();
            window.location.hash = '#/login';
        });
    }

    // Handler untuk logout dari mobile drawer
    if (logoutLinkMobile) {
        logoutLinkMobile.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('userToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            updateNavBasedOnAuth();
            window.location.hash = '#/login';
        });
    }
};

const main = () => {
    const mainContent = document.getElementById('main-content');
    
    const renderPage = async () => {
        const currentHash = window.location.hash || '#/';
        console.log(`[Router] Memicu renderPage untuk hash: ${currentHash}`);

        const token = localStorage.getItem('userToken'); 

        // Debug log untuk memeriksa status rute - dihapus karena sudah berhasil
        // console.log(`[Router Debug] routes object:`, routes);
        // console.log(`[Router Debug] routes['/']:`, routes['/']);
        // console.log(`[Router Debug] HomePage (imported):`, HomePage);

        const protectedRoutes = ['#/about', '#/articel', '#/screening', '#/profile'];
        if (!token && protectedRoutes.includes(currentHash)) {
            console.log(`[Router] Pengguna tidak login, mengalihkan dari ${currentHash} ke #/login`);
            window.location.hash = '#/login';
            return;
        }

        const PageClass = routes[currentHash] || HomePage;
        
        if (!PageClass) {
            console.error(`[Router] Fatal: Tidak ada PageClass yang ditemukan untuk hash ${currentHash} dan HomePage juga tidak valid.`);
            mainContent.innerHTML = `<div class="error-message">Kesalahan fatal: Aplikasi tidak dapat memuat halaman.</div>`;
            return;
        }
        
        if (typeof PageClass !== 'function' || !PageClass.prototype || typeof PageClass.prototype.render !== 'function') {
            console.error(`[Router] Object yang ditemukan untuk rute ${currentHash} (atau fallback) bukan Class atau tidak memiliki method render(). Tipe: ${typeof PageClass}`);
            if (currentHash !== '#/') {
                console.warn(`[Router] Mengalihkan ke Beranda karena PageClass untuk ${currentHash} tidak valid.`);
                window.location.hash = '#/';
                return;
            } else {
                mainContent.innerHTML = `<div class="error-message">Halaman Beranda tidak dapat dimuat dengan benar.</div>`;
                console.error(`[Router] Gagal memuat halaman Beranda. Pastikan beranda.js mengekspor default class HomePage.`);
                return;
            }
        }

        const pageInstance = new PageClass();
        console.log(`[Router] Merender instance halaman untuk: ${currentHash}. Instance:`, pageInstance);

        if (mainContent) {
            try {
                mainContent.innerHTML = await pageInstance.render();
                if (pageInstance.afterRender) {
                    await pageInstance.afterRender();
                }
                console.log(`[Router] Halaman ${currentHash} berhasil dirender.`);
            } catch (renderError) {
                console.error(`[Router] Error saat merender atau afterRender halaman ${currentHash}:`, renderError);
                mainContent.innerHTML = `<div class="error-message">Terjadi kesalahan saat memuat halaman ini: ${renderError.message || renderError}</div>`;
            }
        } else {
            console.error("Elemen 'main-content' tidak ditemukan di DOM.");
        }

        updateNavBasedOnAuth();
    };

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#/"]');
        if (link) {
            const targetHash = link.getAttribute('href');
            if (targetHash === window.location.hash) {
                e.preventDefault();
                renderPage();
            }
        }
    });

    window.addEventListener('hashchange', renderPage);
    window.addEventListener('load', renderPage);
};

document.addEventListener('DOMContentLoaded', () => {
    bindDrawer();
    main();
});
