<?php
header('Content-Type: application/json');

include 'header.php';

header('Access-Control-Allow-Methods: GET, OPTIONS'); // Permite o método GET
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Permite cabeçalhos específicos


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
  // Envia uma resposta 200 para a requisição OPTIONS
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
  http_response_code(403); // Código HTTP 403 (Proibido)
  echo json_encode(['error' => 'Acesso não autorizado']);
  exit;
}

try {
    // Conexão com o banco de dados (ajuste os dados conforme necessário)
    $conn = new mysqli($host, $user, $password, $dbname);

    // Verifica se há erro na conexão
    if ($conn->connect_error) {
        http_response_code(500); // Erro 500 (Erro Interno do Servidor)
        echo json_encode(['error' => 'Erro ao conectar ao banco de dados']);
        exit;
    }

    // Usando prepared statements para buscar o cliente no banco de dados
    $stmt = $conn->prepare("SELECT * FROM cliente WHERE cpf = ?");
    $stmt->bind_param('s', $cpf); // 's' indica que o parâmetro é uma string

    $stmt->execute();

    // Obter os resultados da consulta
    $result = $stmt->get_result();
    $cliente = $result->fetch_assoc();

    $hash = $senha;
    $rounds = 10;
    
    for ($i=0; $i < $rounds; $i++) { 
      $hash = md5($hash+$cliente['salt']);
    }

    // Verifica se o usuário existe e se a senha confere
    if ($cliente && password_verify($hash, $cliente['senha'])) {
        unset($usuario['senha']); // Remove a senha dos dados retornados

        // Cria o payload do token
        $payload = [
            'iat' => time(),
            'exp' => time() + $JWT_EXPIRACAO,
            'data' => [
                'id' => $usuario['id'],
                'nome' => $usuario['nome'],
                'cpf' => $usuario['cpf'],
                'email' => $usuario['email'],
                'telefone' => $usuario['telefone']
            ]
        ];

        // Gera o JWT
        $jwt = JWT::encode($payload, $JWT_SECRET, 'HS256');

        // Retorna o token
        echo json_encode(['success' => true, 'token' => $jwt]);
    } else {
        echo json_encode(['success' => false, 'message' => 'CPF ou senha inválidos']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro no servidor']);
}
