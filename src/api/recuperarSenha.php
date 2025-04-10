<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

include 'api/header.php';

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require 'includes/PHPMailer/src/Exception.php';
require 'includes/PHPMailer/src/PHPMailer.php';
require 'includes/PHPMailer/src/SMTP.php';

// Verifica se é uma requisição POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $cpf = isset($_POST['cpf']) ? preg_replace('/[^0-9]/', '', $_POST['cpf']) : '';

    if (strlen($cpf) === 11) {
        // Formata como 123.456.789-00
        $cpf_formatado = substr($cpf, 0, 3) . '.' .
                        substr($cpf, 3, 3) . '.' .
                        substr($cpf, 6, 3) . '-' .
                        substr($cpf, 9, 2);
    } else {
        $cpf_formatado = 'CPF inválido';
    }
  

    if (!empty($cpf)) {
        // Conexão com o banco de dados
        $conn = new mysqli($host, $user, $password, $dbname);
        if ($conn->connect_error) {
            die(json_encode(['status' => 'error', 'message' => 'Erro ao conectar ao banco de dados.']));
        }

        // Prepara e executa a consulta
        $stmt = $conn->prepare("SELECT id, email, senha FROM cliente WHERE cpf = ?");
        $stmt->bind_param("s", $cpf_formatado);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $cliente = $result->fetch_assoc();
            $id = $cliente['id'];
            $email = $cliente['email'];
            $hash = $cliente['senha'];
            $codigo = $id . $hash;

            $linkRecuperacao = "https://sevcnaoforeuvou.com.br/RecuperarSenha?code=" . urlencode($codigo);

            // Envio de e-mail
            $mail = new PHPMailer(true);

            try {
                // Configuração do servidor SMTP
                $mail->isSMTP();
                $mail->Host       = 'smtp.hostinger.com'; // Host SMTP da Hostinger
                $mail->SMTPAuth   = true;
                $mail->Username   = 'no-reply@sevcnaoforeuvou.com.br'; // Seu e-mail da Hostinger
                $mail->Password   = 'Y4Q2iU$2v'; // Senha do e-mail
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Segurança TLS
                $mail->Port       = 465; // Porta do servidor SMTP (465 para SSL)
                $mail->CharSet = 'UTF-8';

                // Configurações do e-mail
                $mail->setFrom('no-reply@sevcnaoforeuvou.com.br', 'Camarote - Se você não for eu vou'); // E-mail e nome do remetente
                $mail->addReplyTo('no-reply@sevcnaoforeuvou.com.br', 'Camarote - Se você não for eu vou');
                $mail->addAddress($email);
                $mail->isHTML(true);

                $mail->Subject = 'Recuperação de senha - Se você não for eu vou';

                $mail->Body = "
                <div style='
                    font-family: Arial, sans-serif;
                    background-color: #ffffff;
                    color: #222;
                    padding: 30px 20px;
                    max-width: 600px;
                    margin: auto;
                    border: 1px solid #eee;
                    border-radius: 10px;
                    text-align: center;
                '>
                    <h2 style='color: #111; margin-bottom: 10px;'>Recuperação de senha</h2>
                    <p style='font-size: 16px; margin: 20px 0;'>
                        Recebemos uma solicitação para redefinir sua senha.<br>
                        Clique no botão abaixo para criar uma nova senha:
                    </p>

                    <a href='{$linkRecuperacao}' style='
                        display: inline-block;
                        margin: 25px 0;
                        padding: 12px 20px;
                        background-color: #ffdf00;
                        color: #111;
                        text-decoration: none;
                        font-weight: bold;
                        border-radius: 8px;
                        font-size: 16px;
                    '>
                        Redefinir senha
                    </a>

                    <p style='font-size: 14px; margin-top: 30px; color: #555;'>
                        Se você não solicitou esta recuperação, apenas ignore este e-mail.
                    </p>

                    <hr style='border: none; border-top: 1px solid #ccc; margin: 40px 0;' />

                    <p style='font-size: 13px; color: #888;'>Se você não for eu vou © 2025</p>
                </div>
                ";

                $mail->AltBody = "Olá, para redefinir sua senha acesse: {$linkRecuperacao}\nSe você não solicitou essa recuperação, ignore este e-mail.";


                $mail->send();
                echo json_encode(['status' => 'success', 'message' => 'E-mail de recuperação enviado com sucesso!']);
            } catch (Exception $e) {
                echo json_encode(['status' => 'error', 'message' => "Erro ao enviar e-mail: {$mail->ErrorInfo}"]);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'CPF não encontrado na base de dados.']);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'CPF inválido ou não enviado.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método de requisição inválido.']);
}
