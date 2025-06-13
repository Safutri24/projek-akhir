# Fullstack Autism Early Screening App

## Backend (PHP + MySQL)

**Database:** Create `db_autisme` on your XAMPP MySQL.

```sql
CREATE DATABASE IF NOT EXISTS db_autisme;
USE db_autisme;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    jenis_kelamin ENUM('Laki-laki','Perempuan'),
    tanggal_lahir DATE,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skrining (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    nama_anak VARCHAR(100),
    umur_anak INT,
    jenis_kelamin_anak ENUM('Laki-laki','Perempuan'),
    hasil VARCHAR(255),
    tanggal_skrining TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

Place the **backend-autisme** folder inside `htdocs` of XAMPP.

## Frontend

The frontend files are included in the `frontend` directory (extracted from your original zip).  
Open `index.html` via a local server (e.g., Live Server VSCode) or place inside `htdocs` as well.

### API endpoints

| Route | Method | Description |
|-------|--------|-------------|
| `/backend-autisme/api/register.php` | POST | JSON body: `nama, email, password, jenis_kelamin, tanggal_lahir` |
| `/backend-autisme/api/login.php` | POST | JSON body: `email, password` |
| `/backend-autisme/api/profil.php?user_id=ID` | GET | Get user profile |
| `/backend-autisme/api/skrining.php` | POST | Add screening record |
| `/backend-autisme/api/riwayat.php?user_id=ID` | GET | List screening history |

After successful login, store `token` and `user_id` in `localStorage` then pass `user_id` when calling endpoints.

---

Generated on 2025-06-12 04:52:12
