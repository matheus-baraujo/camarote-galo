<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'includes/PHPMailer/src/Exception.php';
require 'includes/PHPMailer/src/PHPMailer.php';
require 'includes/PHPMailer/src/SMTP.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $destinatario = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);

    if ($destinatario && isset($_FILES['image'])) {
        $mail = new PHPMailer(true);

        try {
            // Configuração SMTP
            $mail->isSMTP();
            $mail->Host       = 'smtp.hostinger.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'no-reply@sevcnaoforeuvou.com.br'; // Seu e-mail
            $mail->Password   = 'Y4Q2iU$2v'; // Senha
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port       = 465;
            $mail->CharSet    = 'UTF-8';

            $mail->addReplyTo('no-reply@sevcnaoforeuvou.com.br', 'Se você não for eu vou');
            $mail->setFrom('no-reply@sevcnaoforeuvou.com.br', 'Se você não for eu vou');
            $mail->addAddress($destinatario);

            // Corpo do e-mail com a imagem embutida
            $cid = 'ingressoImagem';
            $mail->isHTML(true);
            $mail->Subject = 'Seu ingresso está aqui!';
            $mail->Body = "
                <p>Olá! Aqui está o seu ingresso:</p>
                <img src='cid:{$cid}' style='max-width:100%; height:auto;' />
                <p>Obrigado! Em caso de dúvidas, acesse o site ou entre em contato.</p>
            ";
            $mail->AltBody = "Olá! Seu ingresso está em anexo.";

            $mail->addEmbeddedImage($_FILES['image']['tmp_name'], $cid, 'ingresso.png');

            $mail->send();
            echo json_encode(['status' => 'success', 'message' => 'E-mail enviado com imagem!']);
        } catch (Exception $e) {
            echo json_encode(['status' => 'error', 'message' => "Erro ao enviar e-mail: {$mail->ErrorInfo}"]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'E-mail inválido ou imagem não enviada.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método de requisição não permitido.']);
}
