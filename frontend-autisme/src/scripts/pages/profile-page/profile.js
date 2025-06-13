import api from '../../data/api.js';

class ProfilePage {
  async render() {
    return `
      <section class="container fade-in profile-page">
        <h1 id="content" class="profile-title">Profil Pengguna</h1>
        <div class="profile-card">
          <div class="profile-avatar">
            <i class="fas fa-user-circle fa-5x text-gray-500"></i>
          </div>
          <div class="profile-info">
            <p class="profile-name"><strong>Nama:</strong> <span id="profile-nama"></span></p>
            <p><strong>Email:</strong> <span id="profile-email"></span></p>
            <p><strong>Jenis Kelamin:</strong> <span id="profile-jenis-kelamin"></span></p>
            <p><strong>Tanggal Lahir:</strong> <span id="profile-tanggal-lahir"></span></p>
            <p class="text-sm text-gray-400">ID Pengguna: <span id="profile-id"></span></p>
          </div>
        </div>

        <div class="profile-actions">
          <button id="logout-btn" class="btn btn-danger">Logout</button>
        </div>
        
        <div id="profile-status" class="status-message"></div>

        <h2 class="mt-8">Riwayat Skrining Anak</h2>
        <div id="skrining-history" class="skrining-history">
          <!-- Riwayat skrining akan dirender di sini -->
          <p class="text-gray-500">Memuat riwayat...</p>
        </div>
        <div id="skrining-history-status" class="status-message"></div>
      </section>
    `;
  }

  async afterRender() {
    this._initProfilePage();
  }

  _initProfilePage() {
    const profileIdElement = document.getElementById('profile-id');
    const profileNamaElement = document.getElementById('profile-nama');
    const profileEmailElement = document.getElementById('profile-email');
    const profileJenisKelaminElement = document.getElementById('profile-jenis-kelamin');
    const profileTanggalLahirElement = document.getElementById('profile-tanggal-lahir');
    const statusContainer = document.getElementById('profile-status');
    const logoutBtn = document.getElementById('logout-btn');
    const skriningHistoryContainer = document.getElementById('skrining-history');
    const skriningHistoryStatus = document.getElementById('skrining-history-status');

    const userId = localStorage.getItem('userId');

    if (!userId) {
      statusContainer.innerHTML = `<div class="error-message">Anda belum login. Silakan <a href="#/login">login</a>.</div>`;
      setTimeout(() => {
        window.location.hash = '#/login';
      }, 1500);
      return;
    }

    // Ambil data profil dari API
    this._fetchProfileData(userId, {
      profileIdElement,
      profileNamaElement,
      profileEmailElement,
      profileJenisKelaminElement,
      profileTanggalLahirElement,
      statusContainer
    });

    // Ambil riwayat skrining dari API
    this._fetchSkriningHistory(userId, {
      skriningHistoryContainer,
      skriningHistoryStatus
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            this._handleLogout();
        });
    }
  }

  async _fetchProfileData(userId, elements) {
    const { profileIdElement, profileNamaElement, profileEmailElement, profileJenisKelaminElement, profileTanggalLahirElement, statusContainer } = elements;

    statusContainer.innerHTML = `<div class="info-message">Memuat data profil...</div>`;

    try {
      const result = await api.getProfile(userId);

      if (result.success) {
        const userData = result.data;
        profileIdElement.textContent = userData.id || 'N/A';
        profileNamaElement.textContent = userData.nama || 'N/A';
        profileEmailElement.textContent = userData.email || 'N/A';
        profileJenisKelaminElement.textContent = userData.jenis_kelamin || 'N/A';
        profileTanggalLahirElement.textContent = userData.tanggal_lahir || 'N/A';
        statusContainer.innerHTML = '';
      } else {
        statusContainer.innerHTML = `<div class="error-message">Gagal memuat profil: ${result.message || 'Data tidak ditemukan.'}</div>`;
      }
    } catch (error) {
      console.error('Error saat mengambil data profil:', error);
      statusContainer.innerHTML = `<div class="error-message">Terjadi kesalahan koneksi atau server saat memuat profil.</div>`;
    }
  }

  async _fetchSkriningHistory(userId, elements) {
    const { skriningHistoryContainer, skriningHistoryStatus } = elements;
    skriningHistoryStatus.innerHTML = `<div class="info-message">Memuat riwayat skrining...</div>`;

    try {
        const result = await api.getRiwayat(userId); // Menggunakan api.getRiwayat()

        if (result.success && result.data && result.data.length > 0) {
            let historyHtml = '<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">'; // Contoh grid dengan Tailwind CSS
            result.data.forEach(item => {
                const tanggal = new Date(item.tanggal_skrining).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
                historyHtml += `
                    <div class="skrining-item bg-white p-4 rounded-lg shadow">
                        <p><strong>Nama Anak:</strong> ${item.nama_anak || 'N/A'}</p>
                        <p><strong>Umur:</strong> ${item.umur_anak || 'N/A'} tahun</p>
                        <p><strong>Jenis Kelamin:</strong> ${item.jenis_kelamin_anak || 'N/A'}</p>
                        <p><strong>Hasil:</strong> ${item.hasil || 'N/A'}</p>
                        <p class="text-sm text-gray-500"><em>Tanggal Skrining: ${tanggal}</em></p>
                    </div>
                `;
            });
            historyHtml += '</div>';
            skriningHistoryContainer.innerHTML = historyHtml;
            skriningHistoryStatus.innerHTML = '';
        } else if (result.success && result.data && result.data.length === 0) {
            skriningHistoryContainer.innerHTML = '<p class="text-gray-500 mt-4">Belum ada riwayat skrining untuk pengguna ini.</p>';
            skriningHistoryStatus.innerHTML = '';
        } else {
            skriningHistoryStatus.innerHTML = `<div class="error-message">Gagal memuat riwayat skrining: ${result.message || 'Terjadi kesalahan.'}</div>`;
        }
    } catch (error) {
        console.error('Error saat mengambil riwayat skrining:', error);
        skriningHistoryStatus.innerHTML = `<div class="error-message">Terjadi kesalahan koneksi atau server saat memuat riwayat.</div>`;
    }
  }

  _handleLogout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');

    alert('Anda telah berhasil logout.');
    window.location.hash = '#/login';
  }
}

export default ProfilePage;
