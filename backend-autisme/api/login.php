<?php
header("Content-Type: application/json");
include '../config/koneksi.php';

$data = json_decode(file_get_contents("php://input"));
if(!$data){
    echo json_encode(["success"=>false,"message"=>"No data"]);
    exit;
}
$email = $data->email ?? '';
$password = $data->password ?? '';

$query = $conn->prepare("SELECT * FROM users WHERE email = ?");
$query->bind_param("s", $email);
$query->execute();
$result = $query->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $token = md5($user['id'] . time());

        echo json_encode([
            "success" => true,
            "message" => "Login berhasil",
            "token" => $token,
            "user_id" => $user['id'],
            "nama" => $user['nama']
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Password salah"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Email tidak ditemukan"]);
}
?>
