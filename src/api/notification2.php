<?php
header('Content-Type: application/json');
include 'header.php';

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao conectar ao banco de dados']);
    exit;
}

function makeCod() {
    $result = '';
    $letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    $numbers = '0123456789';

    for ($i = 0; $i < 7; $i++) {
        $result .= ($i < 2) ? $letters[rand(0, strlen($letters) - 1)] : $numbers[rand(0, strlen($numbers) - 1)];
    }
    return $result;
}

if (isset($data['type']) && $data['type'] === 'payment') {
    $paymentId = $data['data']['id'] ?? null;
    if (!$paymentId) exit;

    $accessToken = 'APP_USR-8863321753051093-112114-41a86e2093152d19ff5b839604fa15b9-2108742539';
    $url = "https://api.mercadopago.com/v1/payments/$paymentId";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer $accessToken"
    ]);
    $response = curl_exec($ch);
    curl_close($ch);

    $paymentDetails = json_decode($response, true);

    if (isset($paymentDetails['id'])) {
        $externalReference = $paymentDetails['external_reference'] ?? '';
        $status = $paymentDetails['status'] ?? '';
        // $idPreference = $paymentDetails['preference_id'] ?? '';
        $items = $paymentDetails['additional_info']['items'] ?? [];

        $quantity1 = $items[0]['quantity'] ?? 0;
        $quantity2 = $items[1]['quantity'] ?? 0;

        $jsonResponse = json_encode($paymentDetails, JSON_UNESCAPED_UNICODE);
        $stmtLog = $conn->prepare("INSERT INTO logs_pagamentos (idPagamento, status, response) VALUES (?, ?, ?)");
        if ($stmtLog) {
            $stmtLog->bind_param('sss', $paymentId, $status, $jsonResponse);
            $stmtLog->execute();
        }

        $stmt = $conn->prepare("SELECT * FROM compras_saojoao2025 WHERE idPagamento = ?");
        $stmt->bind_param('s', $paymentId);
        $stmt->execute();
        $result = $stmt->get_result();

        $codigo = makeCod();

        if ($result->num_rows === 0) {
            if ($status === "approved") {
                $stmtInsert = $conn->prepare("INSERT INTO compras_saojoao2025 (cpfCliente, idPagamento, ingresso, mesa, status, codigoRecebimento) VALUES (?, ?, ?, ?, ?, ?)");
                if ($stmtInsert) {
                    $statusAprovado = "Aprovado";
                    $stmtInsert->bind_param('ssiiss', $externalReference, $paymentId,  $quantity1, $quantity2, $statusAprovado, $codigo);
                    $stmtInsert->execute();
                }
            } else {
                $stmtInsert = $conn->prepare("INSERT INTO compras_saojoao2025 (cpfCliente, idPagamento, ingresso, mesa, status) VALUES (?, ?, ?, ?, ?)");
                if ($stmtInsert) {
                    $status2 = match($status) {
                        'refunded' => "Reembolsado",
                        'cancelled' => "Cancelado",
                        default => "Aguardando pagamento"
                    };
                    $stmtInsert->bind_param('sssiis', $externalReference, $paymentId, $quantity1, $quantity2, $status2);
                    $stmtInsert->execute();
                }
            }

        } else {
            $compra = $result->fetch_assoc();

            if ($compra['status'] != "Aprovado" && $status == "approved") {
                $codigo = makeCod();
                $stmtUpdate = $conn->prepare("UPDATE compras_saojoao2025 SET status = ?, codigoRecebimento = ? WHERE idPagamento = ?");
                if ($stmtUpdate) {
                    $statusAprovado = "Aprovado";
                    $stmtUpdate->bind_param('sss', $statusAprovado, $codigo, $paymentId);
                    $stmtUpdate->execute();
                }
            } elseif (in_array($status, ['refunded', 'cancelled', 'in_process', 'pending'])) {
                $stmtUpdate = $conn->prepare("UPDATE compras_saojoao2025 SET status = ?, codigoRecebimento = '' WHERE idPagamento = ?");
                if ($stmtUpdate) {
                    $status2 = match($status) {
                        'refunded' => "Reembolsado",
                        'cancelled' => "Cancelado",
                        default => "Aguardando pagamento"
                    };
                    $stmtUpdate->bind_param('ss', $status2, $paymentId);
                    $stmtUpdate->execute();
                }
            }
        }

        $conn->close();
    }
}
