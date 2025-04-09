<?php
header('Content-Type: application/json');

include 'header.php'; // Conexão e $validApiKey

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$apiKey = $data['apiKey'] ?? '';
if ($apiKey !== $validApiKey) {
    http_response_code(403);
    echo json_encode(['error' => 'Acesso não autorizado']);
    exit;
}

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao conectar ao banco de dados']);
    exit;
}

// Coleta os dados recebidos
$id         = $data['id'] ?? '';
$senha      = $data['senha'] ?? '';
$salt       = $data['salt'] ?? '';
$novaSenha  = $data['hash'] ?? '';

// Verifica se os campos obrigatórios foram preenchidos
if (!$id || !$senha || !$salt || !$novaSenha) {
    http_response_code(400);
    echo json_encode(['error' => 'Campos obrigatórios ausentes']);
    exit;
}

// Verifica se o cliente existe com o ID e senha atual
$stmt = $conn->prepare("SELECT id FROM cliente WHERE id = ? AND senha = ?");
$stmt->bind_param('is', $id, $senha);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(['error' => 'Cliente não encontrado ou senha incorreta']);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();

// Atualiza a senha e o salt com os dados recebidos
$stmt = $conn->prepare("UPDATE cliente SET salt = ?, senha = ? WHERE id = ?");
$stmt->bind_param('ssi', $salt, $novaSenha, $id);

if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode(['success' => 'Senha atualizada com sucesso']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao atualizar a senha']);
}

$stmt->close();
$conn->close();
