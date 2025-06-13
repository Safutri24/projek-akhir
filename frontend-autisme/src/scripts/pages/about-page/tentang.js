export default class AboutPage {
  async render() {
    return `
      <section class="tentang-kami">
        <h2>TENTANG KAMI</h2>
        <div class="tentang-content">
          <img src="img/anak.jpg" alt="Ilustrasi anak-anak" class="tentang-img" />
          <div class="tentang-text">
            <p>
              Kami adalah sebuah platform yang peduli terhadap individu dengan autisme dan keluarga mereka.
              Website ini hadir sebagai bentuk dukungan dan solusi untuk mempermudah akses terhadap informasi,
              layanan, dan komunitas yang dibutuhkan oleh penyandang autisme.
            </p>
            <p>
              Kami percaya bahwa setiap individu berhak mendapatkan kesempatan yang sama untuk berkembang,
              berdaya, dan hidup mandiri. Melalui platform ini, kami menyediakan berbagai fitur seperti
              artikel edukatif, direktori layanan, forum komunitas, dan tips parenting yang dapat membantu
              dalam kehidupan sehari-hari.
            </p>
            <p>
              Dengan semangat inklusivitas dan kepedulian, kami berkomitmen untuk terus menjadi jembatan
              antara para penyandang autisme, keluarga, tenaga profesional, dan masyarakat luas.
            </p>
          </div>
        </div>
      </section>

      <section class="tujuan">
        <h2>TUJUAN</h2>
        <div class="tujuan-box">
          <ul>
            <li>Memberikan akses informasi yang mudah dan terpercaya tentang autisme.</li>
            <li>Menjadi wadah edukasi bagi orang tua, pendidik, dan masyarakat umum.</li>
            <li>Menyediakan dukungan emosional dan praktis melalui komunitas daring.</li>
            <li>Mendorong inklusi dan pemahaman yang lebih baik terhadap individu dengan autisme.</li>
            <li>Menciptakan lingkungan digital yang ramah, aman, dan penuh harapan.</li>
          </ul>
        </div>
      </section>

      <section class="definisi-logo">
        <h2>DEFINISI LOGO</h2>
        <div class="logo-box">
          <img src="img/logo.jpg" alt="Logo Autism" class="logo-definisi" />
          <div class="logo-description">
            <p>
              Logo ini terdiri dari empat potongan puzzle berwarna pastel yang saling berdekatan, serta tulisan “AUTISM”
              dengan huruf berwarna-warni. Potongan puzzle melambangkan keragaman, keunikan, dan keterkaitan dalam
              spektrum autisme. Warna pastel yang lembut menciptakan kesan ramah, hangat, dan inklusif.
            </p>
            <p>
              Tulisan “AUTISM” yang menggunakan warna berbeda pada setiap huruf merepresentasikan bahwa setiap individu
              dalam spektrum autisme memiliki karakter dan potensi yang unik. Huruf-huruf yang ceria ini juga menggambarkan
              semangat positif, keterbukaan, dan harapan akan masa depan yang lebih inklusif bagi semua.
            </p>
            <p>
              Secara keseluruhan, logo ini mencerminkan visi kami untuk menciptakan platform yang penuh warna, empati,
              dan dukungan bagi komunitas autisme.
            </p>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const sections = document.querySelectorAll('.tentang-kami, .tujuan, .definisi-logo');
    sections.forEach(section => section.classList.add('fade-in'));
  }
}
