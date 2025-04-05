<?php
header('Content-Type: application/json');

include 'header.php';

header('Access-Control-Allow-Methods: GET, OPTIONS'); // Permite o método GET
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Permite cabeçalhos específicos

// Lidar com requisições preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Envia uma resposta 200 para a requisição OPTIONS
    header("HTTP/1.1 200 OK");
    exit;
}

// Verifica se a chave foi enviada na requisição
$apiKey = $_GET['api_key'] ?? '';

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

// Recebe o parâmetro ID da URL
$id = $_GET['id'] ?? '';

// Verifica se o ID foi informado
if (!$id) {
    http_response_code(400); // Código HTTP 400 (Bad Request)
    echo json_encode(['error' => 'ID não fornecido']);
    exit;
}

// Usando prepared statements para buscar as compras do cliente no banco de dados
$stmt = $conn->prepare("SELECT * FROM compras_saojoao2025 WHERE idPagamento = ?");
$stmt->bind_param('s', $id); // 's' indica que o parâmetro é uma string
$stmt->execute();
$compras = $stmt->get_result();

$dados = $compras->fetch_all(MYSQLI_ASSOC);

if (!empty($compras)) {
    echo json_encode($dados, JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(404); // Código HTTP 404 (Not Found)
    echo json_encode(['error' => 'Nenhuma compra encontrada para este ID']);
}

$stmt->close();
$conn->close();
?>
