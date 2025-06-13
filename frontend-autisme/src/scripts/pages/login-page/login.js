import { updateNavBasedOnAuth } from '../../main.js'; // Import ini
import CONFIG from '../../utils/config.js';

export default class LoginPage {
  async render() {
    return `
      <section class="login-page">
        <div class="login-page-content">
            <h1 id="content" class="login-title">Login</h1>
            <div class="auth-form">
                <form id="login-form">
                    <div class="form-group">
                        <label for="email">Alamat Email</label>
                        <input type="email" id="email" name="email" required placeholder="Masukkan email Anda" />
                    </div>

                    <div class="form-group">
                        <label for="password">Kata Sandi</label>
                        <input type="password" id="password" name="password" required placeholder="Masukkan kata sandi Anda" />
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary login-btn">Masuk</button>
                    </div>
                </form>

                <div class="auth-links">
                    <p>Belum punya akun? <a href="#/register">Daftar di sini</a></p>
                </div>

                <div id="login-status" class="status-message"></div>
            </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    console.log('LoginPage: afterRender() called.');
    this._initLoginForm();
  }

  _initLoginForm() {
    console.log('LoginPage: _initLoginForm() called.');
    const form = document.getElementById("login-form");
    const statusContainer = document.getElementById("login-status");

    if (!form) {
      console.error('LoginPage Error: Formulir login dengan ID "login-form" tidak ditemukan.');
      return;
    }

    console.log('LoginPage: Formulir login ditemukan, mengikat event listener.');
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log('LoginPage: Submit event terpicu.');

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        statusContainer.innerHTML = `<div class="error-message">Harap isi semua kolom</div>`;
        console.warn('LoginPage Warning: Email atau password kosong.');
        return;
      }

      try {
        statusContainer.innerHTML = `<div class="info-message">Memproses login...</div>`;
        console.log('LoginPage: Mengirim permintaan login ke API.');

        const response = await fetch(`${CONFIG.BASE_URL}/login.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log('LoginPage: Respons API diterima:', data);

        if (!data.success) {
          throw new Error(data.message || 'Login gagal.');
        }

        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userId', data.user_id);
        localStorage.setItem('userName', data.nama);

        // HAPUS KOMENTAR BARIS DI BAWAH INI untuk memanggil fungsi updateNavBasedOnAuth()
        updateNavBasedOnAuth(); // Panggil fungsi ini untuk memperbarui UI navigasi setelah login berhasil

        statusContainer.innerHTML = `<div class="success-message">Login berhasil. Mengalihkan...</div>`;
        console.log('LoginPage: Login berhasil, mengalihkan ke halaman utama.');
        setTimeout(() => {
          window.location.hash = "#/"; // Mengalihkan ke halaman utama setelah login
        }, 1000);
      } catch (error) {
        statusContainer.innerHTML = `<div class="error-message">${error.message}</div>`;
        console.error('LoginPage Error: Terjadi kesalahan saat login:', error);
      }
    });
  }
}
