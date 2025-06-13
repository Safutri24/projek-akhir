// beranda.js
// Import CONFIG jika Anda berencana mengambil data dari API di masa depan
// import CONFIG from '../../utils/config.js'; 

export default class HomePage {
  constructor() {
    this._articles = []; // Tambahkan properti untuk menyimpan data artikel
  }

  async render() {
    return `
      <section class="hero">
        <div class="container">
          <h1>SKRINING WAJAH ANAK</h1>
          <p>Deteksi Dini Autisme Melalui Pengenalan Wajah</p>
          <div class="face-scan-icon">
            <img src="img/scan.jpg" alt="Icon Scan Wajah" class="scan-icon-img">
          </div>
          <button class="scan-btn">Scan disini</button>
        </div>
      </section>

      <section class="tentang-kami">
        <h2>TENTANG KAMI</h2>
        <div class="tentang-content">
          <img src="img/anak.jpg" alt="Ilustrasi anak-anak" class="tentang-img" />
          <div class="tentang-text">
            <p>
              Tujuan dibuatnya website ini adalah untuk menyediakan platform yang lebih mudah dan
              terjangkau bagi individu dengan autisme dan keluarga mereka. Website ini dirancang untuk
              memberikan berbagai sumber daya, dukungan, dan informasi dalam satu tempat, sehingga mereka
              tidak perlu mencari di banyak tempat atau merasa kewalahan.
            </p>
            <p>
              Dengan menyatukan semuanya, kami berharap dapat mempermudah kehidupan sehari-hari,
              meningkatkan pemahaman, dan membangun rasa kebersamaan yang lebih kuat.
            </p>
            <a href="#/tentang-kami" class="btn selengkapnya-btn">Selengkapnya</a> </div>
        </div>
      </section>

      <section class="artikel">
        <div class="container">
          <h2>ARTIKEL</h2>
          <div class="artikel-grid" id="beranda-artikel-list"> <div class="artikel-card kosong"></div>
            <div class="artikel-card kosong"></div>
            <div class="artikel-card kosong"></div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    console.log('HomePage: afterRender() called.');
    // Inisialisasi tombol "Scan disini" jika ada logika di baliknya
    const scanBtn = document.querySelector('.scan-btn');
    if (scanBtn) {
        scanBtn.addEventListener('click', () => {
            window.location.hash = '#/skrining'; // Contoh: arahkan ke halaman skrining
        });
    }

    // Inisialisasi tombol "Selengkapnya" di Tentang Kami
    const selengkapnyaBtn = document.querySelector('.selengkapnya-btn');
    if (selengkapnyaBtn) {
        // Karena sudah jadi link, tidak perlu event listener jika href sudah ada
        // selengkapnyaBtn.addEventListener('click', () => {
        //     window.location.hash = '#/tentang-kami';
        // });
    }


    // Logika untuk merender artikel di halaman beranda
    const berandaArtikelListContainer = document.getElementById('beranda-artikel-list');
    if (!berandaArtikelListContainer) {
      console.error('HomePage Error: Container artikel-list tidak ditemukan.');
      return;
    }

    try {
      // Data dummy artikel (sesuaikan dengan data artikel Anda)
      this._articles = [
        {
          id: 1,
          title: 'Pengertian Autisme dan Gejalanya',
          image: 'img/artikel1.jpg', // Ganti dengan path gambar yang benar
          date: '10 April 2024',
          summary: 'Memahami apa itu autisme dan gejala umum yang sering muncul pada anak-anak.',
        },
        {
          id: 2,
          title: 'Cara Dukungan bagi Orang Tua Anak dengan Autisme',
          image: 'img/artikel2.jpg', // Ganti dengan path gambar yang benar
          date: '15 April 2024',
          summary: 'Panduan praktis untuk orang tua dalam memberikan dukungan terbaik.',
        },
        {
          id: 3,
          title: 'Metode Skrining untuk Diagnostik Autisme',
          image: 'img/artikel3.jpg', // Ganti dengan path gambar yang benar
          date: '20 April 2024',
          summary: 'Berbagai metode skrining yang digunakan untuk mendeteksi autisme lebih awal.',
        },
        // Anda bisa membatasi jumlah artikel yang ditampilkan di beranda jika terlalu banyak
        // Misalnya, hanya 3 artikel terbaru atau terpopuler
      ];

      // Hapus placeholder kosong
      berandaArtikelListContainer.innerHTML = '';

      // Render artikel ke dalam container
      this._articles.forEach(article => {
        const articleCard = document.createElement('a'); // Gunakan tag <a> untuk link
        articleCard.href = `#/artikel/${article.id}`; // Sesuaikan dengan rute detail artikel Anda
        articleCard.classList.add('artikel-card');
        articleCard.innerHTML = `
          <img src="${article.image}" alt="${article.title}">
          <h3>${article.title}</h3>
          <p class="artikel-date">${article.date}</p>
          <p>${article.summary}</p>
          <span class="btn btn-primary read-more-btn">Baca Selengkapnya</span> `;
        berandaArtikelListContainer.appendChild(articleCard);
      });

    } catch (error) {
      console.error('HomePage Error: Gagal memuat artikel beranda:', error);
      berandaArtikelListContainer.innerHTML = `<div class="status-message error-message">Gagal memuat artikel.</div>`;
    }
  }
}