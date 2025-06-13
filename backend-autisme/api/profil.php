<?php
header("Content-Type: application/json");
include '../config/koneksi.php';

$user_id = $_GET['user_id'] ?? 0;

$sql = "SELECT id, nama, email, jenis_kelamin, tanggal_lahir FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => true, "data" => $result->fetch_assoc()]);
} else {
    echo json_encode(["success" => false, "message" => "User tidak ditemukan"]);
}
?>
