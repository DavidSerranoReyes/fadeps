<?php
// Habilitar errores para depuración
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $nombre = $_POST["nombre"] ?? '';
    $email = $_POST["email"] ?? '';
    $telefono = $_POST["telefono"] ?? '';
    $asunto = $_POST["asunto"] ?? '';
    $mensaje = $_POST["mensaje"] ?? '';

    // Depurar: Mostrar los datos recibidos
    echo '<pre>';
    print_r($_POST);  // Mostrar todo lo que se recibe en el POST
    echo '</pre>';

    // Dirección de destino del correo
    $para = "fadeps@fadeps.org"; 
    $asuntoCorreo = "Nuevo mensaje desde el formulario de contacto";
    
    // Contenido del correo
    $contenido = "Nombre: $nombre\nCorreo: $email\nTeléfono: $telefono\nAsunto: $asunto\nMensaje:\n$mensaje";
    
    // Cabeceras del correo
    $cabeceras = "From: $email";

    // Enviar el correo
    if (mail($para, $asuntoCorreo, $contenido, $cabeceras)) {
        echo "Mensaje enviado correctamente.";
    } else {
        echo "Error al enviar el mensaje.";
    }
} else {
    echo "Acceso no permitido.";
}
?>
