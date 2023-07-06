<?php
session_start();

// distruge sesiunea si redirecteaza utilizatorul la pagina de autentificare
session_destroy();
header('Location: login.php');
exit;
?>