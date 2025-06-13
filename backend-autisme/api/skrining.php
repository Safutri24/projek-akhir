<?php
header("Content-Type: application/json");
include '../config/koneksi.php';

$data = json_decode(file_get_contents("php://input"));
if(!$data){
    echo json_encode(["success"=>false,"message"=>"No data"]);
    exit;
}

$user_id = $data->user_id ?? 0;
$nama_anak = $data->nama_anak ?? '';
$umur_anak = $data->umur_anak ?? 0;
$jenis_kelamin_anak = $data->jenis_kelamin_anak ?? '';
$hasil = $data->hasil ?? '';

$stmt = $conn->prepare("INSERT INTO skrining (user_id, nama_anak, umur_anak, jenis_kelamin_anak, hasil) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("isiss", $user_id, $nama_anak, $umur_anak, $jenis_kelamin_anak, $hasil);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Data skrining ditambahkan"]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal menambahkan data"]);
}
?>
