<?php
header("Content-Type: application/json");
include '../config/koneksi.php';

$user_id = $_GET['user_id'] ?? 0;

$stmt = $conn->prepare("SELECT * FROM skrining WHERE user_id = ? ORDER BY tanggal_skrining DESC");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode(["success" => true, "data" => $data]);
?>
