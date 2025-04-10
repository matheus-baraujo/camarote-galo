<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'includes/PHPMailer/src/Exception.php';
require 'includes/PHPMailer/src/PHPMailer.php';
require 'includes/PHPMailer/src/SMTP.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $destinatario = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $codigo = isset($_POST['codigo']) ? trim($_POST['codigo']) : '';

    if ($destinatario && $codigo) {
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host       = 'smtp.hostinger.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'no-reply@sevcnaoforeuvou.com.br'; // Seu e-mail
            $mail->Password   = 'Y4Q2iU$2v'; // Sua senha
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port       = 465;
            $mail->CharSet    = 'UTF-8';

            $mail->addReplyTo('no-reply@sevcnaoforeuvou.com.br', 'Se você não for eu vou');
            $mail->setFrom('no-reply@sevcnaoforeuvou.com.br', 'Se você não for eu vou');
            $mail->addAddress($destinatario);

            $mail->isHTML(true);
            $mail->Subject = 'Seu ingresso está aqui!';
            
            $mail->Body = "
            <div style='
                font-family: Arial, sans-serif;
                background-color: #ffffff;
                color: #222;
                padding: 20px;
                max-width: 600px;
                margin: auto;
                border: 1px solid #eee;
                border-radius: 10px;
                text-align: center;
            '>
                <h2 style='font-size: 22px; margin-bottom: 10px;'>Código de acesso ao evento</h2>
                <div style='
                    display: inline-flex;
                    justify-content: center;
                    gap: 4px; /* menor espaçamento */
                    margin: 20px 0;
                    flex-wrap: wrap;
                '>";
            
            foreach (str_split($codigo) as $letra) {
                $mail->Body .= "
                    <div style='
                        background: #111;
                        color: #ffdf00;
                        padding: 10px 12px;
                        border-radius: 6px;
                        font-size: 18px;
                        font-weight: bold;
                        min-width: 24px;
                    '>{$letra}</div>
                ";
            }
            
            $mail->Body .= "
                </div>
                <p style='margin: 10px 0 30px;'>Apresente este código na entrada do evento</p>
                <hr style='border: none; border-top: 1px solid #ccc; margin: 30px 0;' />
                <h2 style='font-size: 20px;'>São João do Se você não for eu vou</h2>
                <p style='margin: 10px 0; font-size: 16px;'>📅 Sábado, 7 de Junho de 2025 - 19h</p>
                <p style='margin: 5px 0;'>📍 Freje – Recife Antigo</p>
            </div>
            ";

            
            $mail->AltBody = "Seu ingresso: {$codigo}";

            $mail->send();
            echo json_encode(['status' => 'success', 'message' => 'E-mail enviado com código!']);
        } catch (Exception $e) {
            echo json_encode(['status' => 'error', 'message' => "Erro ao enviar e-mail: {$mail->ErrorInfo}"]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'E-mail ou código inválido.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método não permitido.']);
}
