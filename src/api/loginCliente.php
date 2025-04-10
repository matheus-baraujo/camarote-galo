<?php
header('Content-Type: application/json');

include 'header.php';

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Carrega as classes da biblioteca JWT
require_once __DIR__ . '/../includes/PHP-JWT/JWT.php';
require_once __DIR__ . '/../includes/PHP-JWT/Key.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Configurações do JWT
$JWT_SECRET = "chave_super_secreta";
$JWT_EXPIRACAO = 3600; // 1 hora

// Lidar com requisições preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

// Recebe os dados JSON enviados via POST
$data = json_decode(file_get_contents('php://input'), true);
$cpf = $data['cpf'] ?? '';
$senha = $data['senha'] ?? '';

// Verifica se a chave foi enviada na requisição
$apiKey = $data['api_key'] ?? '';

if ($apiKey !== $validApiKey) {
    http_response_code(403);
    echo json_encode(['error' => 'Acesso não autorizado']);
    exit;
}

try {
    // Conexão com o banco de dados
    $conn = new mysqli($host, $user, $password, $dbname);

    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao conectar ao banco de dados']);
        exit;
    }

    // Busca o cliente pelo CPF
    $stmt = $conn->prepare("SELECT * FROM cliente WHERE cpf = ?");
    $stmt->bind_param('s', $cpf);
    $stmt->execute();
    $result = $stmt->get_result();
    $cliente = $result->fetch_assoc();


    if ($cliente) {

        $hash = $senha;
        $rounds = 10;

        for ($i = 0; $i < $rounds; $i++) {
            $hash = md5($hash . $cliente['salt']);
        }

        if ($hash === $cliente['senha']) {
            unset($cliente['senha']); // Remove senha antes de enviar

            $payload = [
                'iat' => time(),
                'exp' => time() + $JWT_EXPIRACAO,
                'data' => [
                    'id' => $cliente['id'],
                    'nome' => $cliente['nome'],
                    'cpf' => $cliente['cpf'],
                    'email' => $cliente['email'],
                    'telefone' => $cliente['telefone']
                ]
            ];

            $jwt = JWT::encode($payload, $JWT_SECRET, 'HS256');

            echo json_encode(['success' => true, 'token' => $jwt]);
        } else {
            echo json_encode(['success' => false, 'message' => 'CPF ou senha inválidos']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'CPF ou senha inválidos']);
    }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erro no servidor']);
}
