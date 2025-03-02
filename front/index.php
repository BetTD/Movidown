<!doctype html>
<html lang="es">
<head>
    <title>Front</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="./fa/css/all.css">
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <script src="fetch.js"></script>
</head>
<body>
    <nav>
        <div class="navbar-section">
            <p id="mini-status">¿Está Movistar bloqueando Cloudflare?</p>
        </div>
        <div class="navbar-section">
            <p class="darker"><i class="fa-solid fa-refresh fa-spin"></i> <span id="refresh-label">Esta página se recarga automáticamente</span></p>
        </div>
    </nav>
    <header>
        <h1 id="status-header">
            <span class="status-remark">Cargando</span> estado...
        </h1>
    </header>
    <main>
        <h2>Estado de las direcciones IP</h2>
        <div class="monitors-grid">

        </div>
    </main>
    <footer>
        <p>
            &copy; 2025 BetTD • Este sitio web no está afiliado con Movistar, Telefónica de España S.A.U., Cloudflare Inc. o cualquier otra empresa relacionada.
        </p>
    </footer>
</body>
</html>
