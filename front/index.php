<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Movidown</title>
    <meta property='og:title'  content="Movidown">
    <meta name='twitter:title' content="Movidown">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="¿Quieres saber si Movistar está bloqueando las IPs y webs de Cloudflare otra vez? ¡Esta es tu web!">
    <meta property='og:description' content="¿Quieres saber si Movistar está bloqueando las IPs y webs de Cloudflare otra vez? ¡Esta es tu web!">
    <meta name='twitter:description' content="¿Quieres saber si Movistar está bloqueando las IPs y webs de Cloudflare otra vez? ¡Esta es tu web!">
    <meta property="og:image" content="./img/movidown.png">
    <meta name="twitter:image" content="./img/movidown.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="./fa/css/all.css">
    <link rel="icon" type="image/png" href="./img/favicon.png">
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <script src="fetch.js"></script>
</head>
<body>
    <nav>
        <div class="navbar-section">
            <p id="mini-status">
                ¿Está Movistar bloqueando Cloudflare?
                <span class="mini-status loading">
                    <i class="fa-solid fa-refresh fa-spin"></i>
                </span>
            </p>
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
        <section id="monitors">
            <h2>Estado de las direcciones IP</h2>
            <div class="monitors-grid">

            </div>
        </section>
        <section id="explanation">
            <h2>¿Qué es esto?</h2>
            <h3>Primero, la problemática</h3>
            <p>
                Actualmente en España estamos teniendo un serio problema que ataca a la neutralidad de la red. Movistar,
                uno de los principales proveedores de Internet en España, está bloqueando las direcciones IP de
                Cloudflare, una de las mayores empresas de servicios de red y seguridad en Internet.
                <strong>No solo es Movistar quien lo hace,</strong> la inmensa mayoría de compañías están participando
                en estos bloqueos de una forma u otra:
            </p>
            <ul>
                <li>
                    <strong>Grupo Telefónica (Movistar, O2), Digi:</strong> Bloquean todo el tráfico hacia las IPs de,
                    Cloudflare, rotando las IPs bloqueadas para evitar que los usuarios puedan acceder a los servicios.
                </li>
                <li>
                    <strong>Grupo MasMóvil (Yoigo, MasMóvil, Pepephone):</strong> Bloquean el acceso a los puertos 80 y
                    443 de las IPs de Cloudflare. No tan agresivo, pero sigue siendo un bloqueo.
                </li>
                <li>
                    <strong>Orange y Vodafone:</strong> Bloquean "solo el acceso web directo a la IP sin especificar
                    host"
                </li>
            </ul>
            <p>
                <small>
                    Fuente:
                    <a href="https://x.com/bandaanchaeu/status/1895869904819274145" target="_blank" referrerpolicy="no-referrer">
                        BandaAncha en Twitter/X
                    </a>
                </small>
            </p>
            <h3>¿Por qué lo están haciendo?</h3>
            <p>
                Fácil, <strong>el fútbol.</strong> Vale, no es tan fácil. Una sentencia judicial de hace relativamente
                poco le ha facilitado a LaLiga la posibilidad de ordenar a las compañías de telecomunicaciones a
                bloquear sitios web que emitían fútbol de forma ilegal. El problema es que, en vez de bloquear solo esos
                sitios, debido a la forma en la que Cloudflare funciona, al bloquear las IPs de esos sitios web pirata,
                también están afectando a muchísimas otras webs que usan Cloudflare y que no tienen
                <strong>absolutamente nada que ver con la piratería.</strong> Es más, algo irónico es que están
                bloqueando páginas oficiales de clubs de fútbol de LaLiga, e incluso páginas de Telefónica, uno de los
                "partners estratégicos" de LaLiga. Algo que se está diciendo mucho estos días es que están matando
                moscas a cañonazos.
            </p>
            <h3>¿Dónde me puedo informar más al respecto?</h3>
            <p>
                Hay varios sitios web y cuentas de Twitter que están informando sobre el tema, y que están
                proporcionando algunas formas de acceder a los servicios bloqueados. Algunos de ellos son:
            </p>
            <ul>
                <li>
                    <a href="https://x.com/search?q=%23bloqueoterceros" target="_blank" referrerpolicy="no-referrer">
                        Búsqueda de Twitter/X con el hashtag #bloqueoterceros
                    </a>
                </li>
                <li>
                    <a href="https://tebas.tv/" target="_blank" referrerpolicy="no-referrer">
                        Tebas.tv (muy recomendado leer)
                    </a>
                </li>
            </ul>
        </section>
    </main>
    <footer>
        <p>
            &copy; 2025 BetTD • Este sitio web no está afiliado con Movistar, Telefónica de España S.A.U., Cloudflare Inc. o cualquier otra empresa relacionada.
        </p>
    </footer>
</body>
</html>
