<?php
header('Content-Type: application/json');

include 'header.php';

header('Access-Control-Allow-Methods: POST, OPTIONS'); // Permite o método POST
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Permite cabeçalhos específicos

// Lidar com requisições preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Envia uma resposta 200 para a requisição OPTIONS
    header("HTTP/1.1 200 OK");
    exit;
}

// Recebe os dados do corpo da requisição (assumindo que a requisição seja POST)
$data = json_decode(file_get_contents('php://input'), true);

// Verifica se a chave foi enviada na requisição
$apiKey = $data['apiKey'] ?? '';

if ($apiKey !== $validApiKey) {
    http_response_code(403); // Código HTTP 403 (Proibido)
    echo json_encode(['error' => 'Acesso não autorizado']);
    exit;
}

$conn = new mysqli($host, $user, $password, $dbname);

// Verifica se há erro na conexão
if ($conn->connect_error) {
    http_response_code(500); // Erro 500 (Erro Interno do Servidor)
    echo json_encode(['error' => 'Erro ao conectar ao banco de dados']);
    exit;
}

$nome = $data['nome'] ?? '';
$email = $data['email'] ?? '';
$cpf = $data['cpf'] ?? '';

$telefone = $data['telefone'] ?? '';
$salt = $data['salt'] ?? '';
$hash = $data['hash'] ?? '';

// Verifica se todos os dados necessários foram fornecidos
if (!$nome || !$email || !$cpf || !$telefone || !$salt || !$hash) {
    http_response_code(400); // Código HTTP 400 (Bad Request)
    echo json_encode(['error' => 'Campos obrigatórios ausentes']);
    exit;
}

// Usando prepared statements para inserir o cliente na tabela
$stmt = $conn->prepare("INSERT INTO cliente (nome, email, cpf, telefone, salt, senha) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param('ssssss', $nome, $email, $cpf, $telefone, $salt, $hash); 

if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode(['success' => 'Cliente criado com sucesso']);
} else {
    http_response_code(500); // Erro 500 (Erro Interno do Servidor)
    echo json_encode(['error' => 'Erro ao inserir cliente']);
}

$stmt->close();
$conn->close();
?>
