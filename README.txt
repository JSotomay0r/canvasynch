a Tener imágenes, texto, audio (opcional), geolocalización y video
b Debe de presentar animaciones en partes específicas para enriquecer la experiencia del usuario
c Debe ser desarrollado en HTML5, CSS3 y JavaScript
d Debe estar documentado, de manera que se pueda comprobar el avance de principio a fin
e Coloca tu proyecto en algún sitio Web gratuito que se pueda acceder desde cualquier partes

la aplicación consta de 6 páginas
index, seleccion, canvas, canvas2, canvas3 y canvas4
Descrita entéramente en HTML, haciendo uso de etiquetas específicas de HTML5 como <video>
Todos los elementos repetidos, como botones se han maquetado con <template>, para reutilizar código.

Se estila con CSS, utilizando tanto el framework de bootstrap5 para el maquetado general, como css escrito específicamente para la aplicación.
Se hace fuerte uso de custom properties (variables de css) para estandarizar los espaciados, y para facilitar las animaciones del canvas bauhaus
Tiene estilos y animaciones para resaltar los botones en :hover, así como transiciones en lso dialogos modal (mayormente hechas con bootstrap)

La funcionalidad, en ECMAScript 6 (javascript) incluye:
-fetching y randomización de avatares
-randomización de canvas
-geolocalización del usuario y renderizado del mapa
-generación y animación del canvas "bauhaus"

Los avatares hacen uso de una API externa. El dispositivo ha de estar conectado a internet para mostrarlos.
La api prové imágenes SVG que usamos como avatares. Se customiza el color de fondo para una mayor variedad.
Aunque se están cargando de manera aleatoria, se ha programado para que un mismo usaurio+correo produzca siempre el mismo avatar

El mapa hace uso de 3 librerías cargadas vía CDN y ha de estar conectado a internet para mostrarlos.
Además ha de contar con algún modo de aportar datos de longitud y latitud (pedirá permiso para ello).
Este mapa existe solo como demostración de la geolocalización que se demanda por la tarea. Pero la aplicación no requiere de este tipo de servicio.

Se considera autodocumentado.
Todos los ficheros están organizados de manera fácilmente entendible.
Los métodos JS, y los estilos css, son sencillos y fáciles de seguir.

se han colocado multitud de botones para futura funcionalidad, pero ahora mismo solo se puede navegar con los siguientes
- el botón "log in" en la página de index
- todos los botones "log out"
- los botones de herramientas llevan a distintos canvas

Hay 4 tipos de canvas que se pueden activar en los botones de herramientas
El canvas que muestra cada botón cicla cada 4 botones (el 1º, el 5º, el 9º todos apuntan a 'bauhaus')
-bauhaus: un svg generado y animado programáticamente
-img: una imágen aleatoria de la galería de imágenes
-video: un video aleatorio de la galería de video
-map: un mapa geolocalizado

La aplicación se considera WIP. Tiene gran cantidad de elementos para mostrarla su funcionamiento, pero las partes más ambiciosas no se han desarrollado.
En particular no se ha creado la infraestructura necesaria para que rconozca usuarios, ni persistencia en database, ni tampoco herramientas para dibujar.

