<?php
header('Content-Type: application/json');

include 'header.php';

header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Responde requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Validação de API key
$apiKey = $_GET['api_key'] ?? '';

if ($apiKey !== $validApiKey) {
    http_response_code(403);
    echo json_encode(['error' => 'Acesso não autorizado']);
    exit;
}

$conn = new mysqli($host, $user, $password, $dbname);

// Verifica erro de conexão
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao conectar ao banco de dados']);
    exit;
}

// Query SQL corrigida com ordenação pelo status da compra e ID
$query = "
    SELECT 
        c.id, 
        c.nome, 
        c.cpf, 
        COALESCE(SUM(CASE WHEN co.status = 'Aprovado' THEN co.ingresso ELSE 0 END), 0) AS total_ingressos,
        COALESCE(SUM(CASE WHEN co.status = 'Aprovado' THEN co.mesa ELSE 0 END), 0) AS total_mesas,
        CASE 
            WHEN COUNT(CASE WHEN co.status = 'Aprovado' THEN 1 END) > 0 THEN 'Aprovado'
            WHEN COUNT(CASE WHEN co.status = 'Pendente' THEN 1 END) > 0 THEN 'Pendente'
            ELSE 'none'
        END AS status_compra
    FROM cliente c
    LEFT JOIN compras_saojoao2025 co 
        ON c.cpf = co.cpfCliente
    GROUP BY c.id, c.nome, c.cpf
    ORDER BY 
        FIELD(
            CASE 
                WHEN COUNT(CASE WHEN co.status = 'Aprovado' THEN 1 END) > 0 THEN 'Aprovado'
                WHEN COUNT(CASE WHEN co.status = 'Pendente' THEN 1 END) > 0 THEN 'Pendente'
                ELSE 'none'
            END, 
            'Aprovado', 'Pendente', 'none'
        ), 
        c.id DESC;
";


$result = $conn->query($query);

// Verifica se a query executou corretamente
if ($result) {
    $clientes = [];
    while ($row = $result->fetch_assoc()) {
        $clientes[] = [
            'id' => $row['id'],
            'nome' => $row['nome'],
            'cpf' => $row['cpf'],
            'total_ingressos' => (int)$row['total_ingressos'],
            'total_mesas' => (int)$row['total_mesas'],
            'status_compra' => $row['status_compra']
        ];
    }

    echo json_encode($clientes);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar os dados']);
}


$conn->close();
?>
