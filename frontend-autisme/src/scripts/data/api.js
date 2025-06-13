import CONFIG from '../utils/config.js'; // Import objek CONFIG secara default

const api = {
    /**
     * Fungsi untuk mendaftar pengguna baru
     * @param {Object} userData - Data pengguna (nama, email, password, jenis_kelamin, tanggal_lahir)
     * @returns {Promise<Object>} - Respons dari API
     */
    registerUser: async (userData) => {
        try {
            // Menggunakan CONFIG.BASE_URL untuk mengakses base URL API
            const response = await fetch(`${CONFIG.BASE_URL}/register.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            return await response.json();
        } catch (error) {
            console.error('API Error (Register):', error);
            throw new Error('Gagal terhubung ke server untuk registrasi.');
        }
    },

    /**
     * Fungsi untuk login pengguna
     * @param {Object} credentials - Kredensial pengguna (email, password)
     * @returns {Promise<Object>} - Respons dari API (termasuk token, user_id, nama)
     */
    loginUser: async (credentials) => {
        try {
            // Menggunakan CONFIG.BASE_URL untuk mengakses base URL API
            const response = await fetch(`${CONFIG.BASE_URL}/login.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            return await response.json();
        } catch (error) {
            console.error('API Error (Login):', error);
            // Memperbaiki typo: throw new new Error menjadi throw new Error
            throw new Error('Gagal terhubung ke server untuk login.');
        }
    },

    /**
     * Mengambil data profil pengguna
     * @param {string} userId - ID pengguna
     * @returns {Promise<Object>}
     */
    getProfile: async (userId) => {
        try {
            // Menggunakan CONFIG.BASE_URL untuk mengakses base URL API
            const response = await fetch(`${CONFIG.BASE_URL}/profil.php?user_id=${userId}`);
            return await response.json();
        } catch (error) {
            console.error('API Error (Get Profile):', error);
            throw new Error('Gagal mengambil data profil.');
        }
    },

    /**
     * Mengirim data skrining
     * @param {Object} skriningData - Data skrining (user_id, nama_anak, umur_anak, jenis_kelamin_anak, hasil)
     * @returns {Promise<Object>}
     */
    submitSkrining: async (skriningData) => {
        try {
            // Menggunakan CONFIG.BASE_URL untuk mengakses base URL API
            const response = await fetch(`${CONFIG.BASE_URL}/skrining.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skriningData)
            });
            return await response.json();
        } catch (error) {
            console.error('API Error (Submit Skrining):', error);
            throw new Error('Gagal menyimpan data skrining.');
        }
    },

    /**
     * Mengambil riwayat skrining
     * @param {string} userId - ID pengguna
     * @returns {Promise<Object>}
     */
    getRiwayat: async (userId) => {
        try {
            // Menggunakan CONFIG.BASE_URL untuk mengakses base URL API
            const response = await fetch(`${CONFIG.BASE_URL}/riwayat.php?user_id=${userId}`);
            return await response.json();
        } catch (error) {
            console.error('API Error (Get Riwayat):', error);
            throw new Error('Gagal mengambil riwayat skrining.');
        }
    }
};

export default api;