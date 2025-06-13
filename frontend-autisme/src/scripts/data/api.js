import CONFIG from '../utils/config.js';

const api = {
    /**
     * Fungsi untuk mendaftar pengguna baru
     * @param {Object} userData - Data pengguna (nama, email, password, jenis_kelamin, tanggal_lahir)
     * @returns {Promise<Object>} - Respons dari API
     */
    registerUser: async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/register.php`, {
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
            const response = await fetch(`${API_BASE_URL}/login.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            return await response.json();
        } catch (error) {
            console.error('API Error (Login):', error);
            throw new new Error('Gagal terhubung ke server untuk login.');
        }
    },

    /**
     * Mengambil data profil pengguna
     * @param {string} userId - ID pengguna
     * @returns {Promise<Object>}
     */
    getProfile: async (userId) => {
        try {
            // Perbaikan sintaks URL: hapus <span class="math-inline"> dan }
            const response = await fetch(`${API_BASE_URL}/profil.php?user_id=${userId}`);
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
            const response = await fetch(`${API_BASE_URL}/skrining.php`, {
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
            // Perbaikan sintaks URL: hapus <span class="math-inline"> dan }
            const response = await fetch(`${API_BASE_URL}/riwayat.php?user_id=${userId}`);
            return await response.json();
        } catch (error) {
            console.error('API Error (Get Riwayat):', error);
            throw new Error('Gagal mengambil riwayat skrining.');
        }
    }
};

export default api;