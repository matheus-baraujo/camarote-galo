<?php
header('Content-Type: application/json');

include 'header.php';

header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$apiKey = $_GET['api_key'] ?? '';

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

// Consulta direto na tabela de compras
$query = "
    SELECT 
        COALESCE(SUM(c.ingresso), 0) AS total_ingressos,
        COALESCE(SUM(c.mesa), 0) AS total_mesas
    FROM compras_saojoao2025 c
    WHERE c.status = 'Aprovado';
";

$result = $conn->query($query);

if ($result) {
    $row = $result->fetch_assoc();
    $totalIngressos = (int)$row['total_ingressos'];
    $totalMesas = (int)$row['total_mesas'];
    echo json_encode([
        'total_ingressos' => $totalIngressos,
        'total_mesas' => $totalMesas
    ]);
  
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar os dados']);
}

$conn->close();
?>
