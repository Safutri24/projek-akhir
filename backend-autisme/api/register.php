<?php
header("Content-Type: application/json");
include '../config/koneksi.php';
$data = json_decode(file_get_contents("php://input"));

if(!$data){
    echo json_encode(["success"=>false,"message"=>"No data"]);
    exit;
}

$nama = $data->nama ?? '';
$email = $data->email ?? '';
$password_raw = $data->password ?? '';
$password = password_hash($password_raw, PASSWORD_BCRYPT);
$jenis_kelamin = $data->jenis_kelamin ?? NULL;
$tanggal_lahir = $data->tanggal_lahir ?? NULL;

$stmt = $conn->prepare("INSERT INTO users (nama, email, password, jenis_kelamin, tanggal_lahir) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $nama, $email, $password, $jenis_kelamin, $tanggal_lahir);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Registrasi berhasil"]);
} else {
    echo json_encode(["success" => false, "message" => "Email sudah digunakan"]);
}
?>
