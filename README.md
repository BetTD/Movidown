# Movidown

Este es un proyecto muy básico que hace público el estado del acceso a las direcciones IP de Cloudflare desde una red de Movistar.

Está basado en dos componentes, en la raíz del repositorio hay un archivo JavaScript que contacta con la "API" de una instancia de
Uptime Kuma alojada localmente bajo firewall, transforma los datos en un JSON consumible y los expone en un servicio web público.

Por otro lado, en la carpeta ``front`` se encuentra la raíz de la web pública. La idea es que este componente se aloja en un
servidor totalmente ajeno a la red de Movistar y Cloudflare, para que pueda acceder a la salida JSON del primer componente, el cual
sí está protegido por Cloudflare. De esta forma, por mucho que Telefónica (y otros ISPs) esté bloqueando Cloudflare, BunnyCDN, etc.
el servicio no se verá interrumpido.

Como digo, es muy básico, pero funciona. La versión pública se encuentra [aquí](https://movidown.raul.md/)
