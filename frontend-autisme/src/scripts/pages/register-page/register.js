import CONFIG from '../../utils/config.js';

export default class RegisterPage {
  async render() {
    return `
      <section class="register-page"> 
        <div class="register-page-content"> 
            <h1 id="content" class="register-title">Daftar Akun</h1>
            <div class="auth-form">
                <form id="register-form">
                    <div class="form-group">
                        <label for="nama">Nama</label>
                        <input type="text" id="nama" name="nama" required placeholder="Masukkan nama Anda" />
                    </div>

                    <div class="form-group">
                        <label for="email">Alamat Email</label>
                        <input type="email" id="email" name="email" required placeholder="Masukkan alamat email Anda" />
                    </div>

                    <div class="form-group">
                        <label for="password">Kata Sandi</label>
                        <input type="password" id="password" name="password" required placeholder="Minimal 6 karakter" minlength="6" />
                    </div>

                    <div class="form-group">
                        <label for="jenis_kelamin">Jenis Kelamin</label>
                        <select id="jenis_kelamin" name="jenis_kelamin">
                            <option value="">Pilih</option>
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="tanggal_lahir">Tanggal Lahir</label>
                        <input type="date" id="tanggal_lahir" name="tanggal_lahir">
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary register-btn">Daftar Akun</button>
                    </div>
                </form>

                <div class="auth-links">
                    <p>Sudah punya akun? <a href="#/login">Masuk di sini</a></p>
                </div>

                <div id="register-status" class="status-message"></div>
            </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this._initRegisterForm();
  }

  _initRegisterForm() {
    const form = document.getElementById("register-form");
    const statusContainer = document.getElementById("register-status");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nama = document.getElementById("nama").value.trim(); // Perubahan: 'name' jadi 'nama'
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const jenis_kelamin = document.getElementById("jenis_kelamin").value; // Tambahan
      const tanggal_lahir = document.getElementById("tanggal_lahir").value; // Tambahan

      if (!nama || !email || !password) { // Perubahan: cek 'nama' juga
        statusContainer.innerHTML = `<div class="error-message">Harap isi semua kolom wajib</div>`;
        return;
      }

      if (password.length < 6) {
        statusContainer.innerHTML = `<div class="error-message">Kata sandi minimal 6 karakter</div>`;
        return;
      }

      try {
        // URL API Register yang benar: http://localhost/backend-autisme/api/register.php
        const response = await fetch(`${CONFIG.BASE_URL}/register.php`, { // Perubahan di sini: tambahkan .php
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nama, // Perubahan: 'name' jadi 'nama'
            email,
            password,
            jenis_kelamin, // Tambahan
            tanggal_lahir // Tambahan
          })
        });

        const data = await response.json();

        // Cek jika `data.success` adalah false, atau jika respons HTTP tidak OK (misalnya 4xx, 5xx)
        if (!data.success) { // Perubahan di sini: Cukup cek data.success dari backend
          throw new Error(data.message || 'Registrasi gagal.'); // Ambil pesan error dari backend
        }

        statusContainer.innerHTML = `<div class="success-message">${data.message}. Mengalihkan ke login...</div>`;
        form.reset(); // Bersihkan formulir

        setTimeout(() => {
          window.location.hash = "#/login"; // Arahkan ke halaman login
        }, 2000);
      } catch (error) {
        statusContainer.innerHTML = `<div class="error-message">${error.message}</div>`;
      }
    });
  }
}