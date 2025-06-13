// artikel.js
// Asumsi Anda punya data artikel dari suatu sumber (misalnya API atau array lokal)
// import ArticleSource from '../../data/article-source'; // Contoh jika Anda punya sumber data artikel
// import CONFIG from '../../utils/config.js'; // Jika Anda butuh akses ke API

export default class ArticlePage { // Nama class yang konsisten: ArticlePage
  async render() {
    return `
      <section class="artikel-section">
        <div class="container"> <h2>Artikel</h2>
          <div class="artikel-container">
            <div class="artikel-list">
              <a href="#/artikel/detail/1" class="artikel-item"> <img src="https://img.icons8.com/color/96/brain.png" alt="ikon" />
                <div>
                  <h3>Pengertian Autisme dan Gejalanya</h3>
                  <p class="artikel-date">12 April 2024</p>
                </div>
              </a>
              <a href="#/artikel/detail/2" class="artikel-item"> <img src="https://img.icons8.com/color/96/family--v1.png" alt="ikon" />
                <div>
                  <h3>Cara Dukungan bagi Orang Tua Anak dengan Autisme</h3>
                  <p class="artikel-date">5 April 2024</p>
                </div>
              </a>
              <a href="#/artikel/detail/3" class="artikel-item"> <img src="https://img.icons8.com/color/96/checklist--v1.png" alt="ikon" />
                <div>
                  <h3>Metode Screening untuk Diagnostik Autisme</h3>
                  <p class="artikel-date">30 Maret 2024</p>
                </div>
              </a>
              <a href="#/artikel/detail/4" class="artikel-item"> <img src="https://img.icons8.com/color/96/boy.png" alt="ikon" />
                <div>
                  <h3>Berkomunikasi dengan Anak Penyandang Autisme</h3>
                  <p class="artikel-date">15 Maret 2024</p>
                </div>
              </a>
            </div>

            <aside class="pakar-card">
              <p class="pakar-label">Pakar Autisme</p>
              <img class="pakar-img" src="https://img.icons8.com/ios-filled/100/000000/user-male-circle.png" alt="pakar" />
              <h3>Dr. Andi Wijaya, S.Psi., M.Psi.</h3>
              <p class="pakar-deskripsi">
                Autisme adalah spektrum gangguan perkembangan yang berpengaruh pada perilaku serta kemampuan komunikasi dan interaksi sosial.
              </p>
              <a href="#/artikel/pakar" class="btn pakar-btn">baca artikel</a>
            </aside>
          </div>
        </div> </section>
    `;
  }

  async afterRender() {
    // Fungsi ini tidak perlu diubah karena kita sudah langsung mengatur link di HTML
    const artikelList = document.querySelector('.artikel-list');
    if (artikelList) {
      artikelList.classList.add('fade-in');
    }
  }
}