<?php
// ===== CONFIGURACIÓN =====
// Cambia este email por el tuyo
$destinatario = "Liberatuluzinterior.guia@gmail.com";
$asunto = "Nuevo mensaje desde Libera tu Luz Interior";

// ===== VALIDACIÓN Y SANITIZACIÓN =====
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Obtener datos del formulario y limpiarlos
    $nombre = filter_var(trim($_POST["nombre"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensaje = filter_var(trim($_POST["mensaje"]), FILTER_SANITIZE_STRING);
    
    // Validar campos requeridos
    if (empty($nombre) || empty($email) || empty($mensaje)) {
        http_response_code(400);
        echo "Por favor, completa todos los campos.";
        exit;
    }
    
    // Validar formato de email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Por favor, ingresa un email válido.";
        exit;
    }
    
    // ===== CONSTRUIR EMAIL =====
    $cuerpo = "
    ========================================
    NUEVO MENSAJE DE CONTACTO
    ========================================
    
    Nombre: $nombre
    Email: $email
    
    Mensaje:
    $mensaje
    
    ========================================
    Enviado desde: Libera tu Luz Interior
    Fecha: " . date('d/m/Y H:i:s') . "
    ========================================
    ";
    
    // Cabeceras del email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // ===== ENVIAR EMAIL =====
    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
        http_response_code(200);
        echo "Mensaje enviado con éxito.";
    } else {
        http_response_code(500);
        echo "Error al enviar el mensaje. Por favor, intenta de nuevo.";
    }
    
} else {
    // Si no es POST, redirigir a la página principal
    header("Location: index.html");
    exit;
}
?>