import api from '../../data/api.js'; // Import fungsi API Anda

export default class ScreeningPage {
  async render() {
    return `
      <section class="skrining-section">
        <h2>SKRINING AUTISME DINI</h2>
        <p>
          Skrining dini sangat penting untuk mendeteksi tanda-tanda autisme pada anak sejak usia dini.
          Jawablah pertanyaan-pertanyaan berikut dengan jujur untuk mengetahui apakah ada indikasi yang perlu diperhatikan.
        </p>
        <form id="skrining-form" class="skrining-form">
          <h3>Informasi Anak</h3>
          <div class="form-group">
            <label for="nama-anak">Nama Anak:</label>
            <input type="text" id="nama-anak" required><br>
          </div>
          <div class="form-group">
            <label for="umur-anak">Umur Anak (tahun):</label>
            <input type="number" id="umur-anak" required min="0"><br>
          </div>
          <div class="form-group">
            <label for="jenis-kelamin-anak">Jenis Kelamin Anak:</label>
            <select id="jenis-kelamin-anak" required>
              <option value="">Pilih</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select><br>
          </div>
          
          <h3>Pertanyaan Skrining</h3>
          <div class="question">
            <label for="q1">1. Apakah anak Anda sering menghindari kontak mata?</label>
            <select id="q1" required>
              <option value="">Pilih jawaban</option>
              <option value="ya">Ya</option>
              <option value="tidak">Tidak</option>
            </select>
          </div>
          <div class="question">
            <label for="q2">2. Apakah anak Anda merespons ketika namanya dipanggil?</label>
            <select id="q2" required>
              <option value="">Pilih jawaban</option>
              <option value="ya">Ya</option>
              <option value="tidak">Tidak</option>
            </select>
          </div>
          <div class="question">
            <label for="q3">3. Apakah anak Anda menunjuk ke arah objek untuk menunjukkan ketertarikan?</label>
            <select id="q3" required>
              <option value="">Pilih jawaban</option>
              <option value="ya">Ya</option>
              <option value="tidak">Tidak</option>
            </select>
          </div>
          <button type="submit">Kirim Hasil Skrining</button>
        </form>
        <div id="skrining-status" class="status-message"></div>
        <div id="skrining-result-display" class="skrining-result"></div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById('skrining-form');
    const statusContainer = document.getElementById('skrining-status');
    const resultDisplay = document.getElementById('skrining-result-display'); // Untuk menampilkan hasil teks

    if (!form) return;

    // Pastikan user sudah login
    const userId = localStorage.getItem('userId');
    if (!userId) {
      statusContainer.innerHTML = `<div class="error-message">Anda harus login untuk melakukan skrining. Silakan <a href="#/login">login</a>.</div>`;
      form.style.display = 'none'; // Sembunyikan formulir jika belum login
      return;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Ambil data informasi anak
      const namaAnak = document.getElementById('nama-anak').value.trim();
      const umurAnak = parseInt(document.getElementById('umur-anak').value.trim()); // Pastikan jadi integer
      const jenisKelaminAnak = document.getElementById('jenis-kelamin-anak').value;

      // Validasi dasar informasi anak
      if (!namaAnak || isNaN(umurAnak) || umurAnak < 0 || !jenisKelaminAnak) {
        statusContainer.innerHTML = `<div class="error-message">Harap isi semua informasi anak dengan benar.</div>`;
        return;
      }

      // Ambil jawaban skrining
      const answers = [
        document.getElementById('q1').value,
        document.getElementById('q2').value,
        document.getElementById('q3').value,
      ];

      // Validasi jawaban skrining
      if (answers.some(answer => answer === '')) {
        statusContainer.innerHTML = `<div class="error-message">Harap jawab semua pertanyaan skrining.</div>`;
        return;
      }

      const skorTidak = answers.filter(jawaban => jawaban === 'tidak').length;
      let hasilSkrining = '';

      if (skorTidak >= 2) {
        hasilSkrining = 'Kemungkinan ada indikasi gejala autisme. Konsultasikan dengan profesional.';
        resultDisplay.innerHTML = `
          <p class="warning">
            ${hasilSkrining}
          </p>`;
      } else {
        hasilSkrining = 'Tidak ada indikasi kuat. Tetap pantau perkembangan anak secara rutin.';
        resultDisplay.innerHTML = `
          <p class="safe">
            ${hasilSkrining}
          </p>`;
      }

      // Kirim data ke backend
      statusContainer.innerHTML = `<div class="info-message">Mengirim data skrining...</div>`;
      try {
        const skriningData = {
          user_id: userId,
          nama_anak: namaAnak,
          umur_anak: umurAnak,
          jenis_kelamin_anak: jenisKelaminAnak,
          hasil: hasilSkrining // Kirim hasil teks ke backend
        };

        const result = await api.submitSkrining(skriningData); // Panggil fungsi API Anda

        if (result.success) {
          statusContainer.innerHTML = `<div class="success-message">Data skrining berhasil disimpan.</div>`;
          form.reset(); // Bersihkan formulir setelah sukses
        } else {
          statusContainer.innerHTML = `<div class="error-message">Gagal menyimpan data skrining: ${result.message || 'Terjadi kesalahan.'}</div>`;
        }
      } catch (error) {
        console.error('Error saat mengirim data skrining:', error);
        statusContainer.innerHTML = `<div class="error-message">Terjadi kesalahan koneksi atau server saat menyimpan data.</div>`;
      }
    });
  }
}