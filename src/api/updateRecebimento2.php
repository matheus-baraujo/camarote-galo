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


// Recebe os dados via POST (codigoRecebimento e statusRecebimento)
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


if (!isset($data['codigo']) || !isset($data['entregue']) || !isset($data['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'id, codigo e entregue são necessários']);
    exit;
}

// Obtém os valores de codigoRecebimento e statusRecebimento
$idPagamento = $data['id'];
$codigoRecebimento = $data['codigo'];
$statusRecebimento = $data['entregue'];

// Usando prepared statements para atualizar o statusRecebimento da compra no banco de dados
$stmt = $conn->prepare("UPDATE compras_saojoao2025 SET statusRecebimento = ? WHERE codigoRecebimento = ? AND idPagamento = ?");
$stmt->bind_param('iss', $statusRecebimento, $codigoRecebimento, $idPagamento); // 's' para string e 'i' para inteiro

if ($stmt->execute()) {
    echo json_encode(['message' => 'Status de recebimento atualizado com sucesso']);
} else {
    http_response_code(500); // Erro 500 (Erro Interno do Servidor)
    echo json_encode(['error' => 'Erro ao atualizar o status de recebimento']);
}

$stmt->close();
$conn->close();
?>
