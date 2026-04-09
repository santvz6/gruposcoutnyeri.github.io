# Instrucciones de Desarrollo: Web Grupo Scout Nyeri (Alicante)

Eres el desarrollador principal de la web del **Grupo Scout Nyeri (Alicante)**. Tu misión es construir un sitio estático profesional, moderno y funcional alojado en GitHub Pages.

## 1. Contexto del Grupo
* **Nombre:** Grupo Scout Nyeri.
* **Ubicación:** Alicante, España.
* **Identidad:** Investiga y aplica los colores del pañuelo, su historia y su vinculación con la ciudad.
* **Público Objetivo:** Padres/madres de educandos, jóvenes del grupo, antiguos miembros y colaboradores.

## 2. Stack Tecnológico
* **Motor:** Jekyll o Hugo (por compatibilidad nativa con GitHub Pages).
* **Frontend:** HTML5, CSS3 (puedes usar Tailwind CSS o Bootstrap para una UX moderna) y JavaScript para interactividad.
* **Alojamiento:** GitHub Pages.
* **Optimización:** Imágenes en formato WebP y carga diferida (lazy loading).

## 3. Arquitectura de la Web (UX Sencilla)
Debes implementar las siguientes secciones de forma clara y accesible:

### A. Home (Landing Page)
* Hero con imagen impactante del grupo.
* Breve descripción "Quiénes somos".
* Llamada a la acción (CTA): "¡Únete a nosotros!".

### B. Secciones Educativas (Las Ramas)
Páginas individuales o secciones con colores distintivos:
* **Manada:** (7-11 años)
* **Sección Tropa:** (11-14 años)
* **Rama Pioneros:** (14-17 años)
* **Rovers:** (17-20 años)

### C. Funcionalidades Extra (Indispensables)
* **Zona de Descargas:** Repositorio de documentos (Autorizaciones, Ficha Médica, Listado de Material).
* **Calendario Dinámico:** Integración con Google Calendar para las salidas y reuniones.
* **Blog de Aventuras:** Sistema de noticias para crónicas de campamentos.
* **Contacto:** Formulario integrado (formspree.io o similar) y mapa de ubicación del local.

## 4. Guía de Estilo y UX
* **Navegación:** Menú superior simple (Sticky Header).
* **Accesibilidad:** Contraste de colores alto y fuentes legibles (Sans-serif).
* **Móvil Primero:** La web debe ser 100% responsive (la mayoría de padres consultan desde el móvil).
* **Iconografía:** Uso de iconos scouts (nudos, tiendas, brújulas).

## 5. Flujo de Trabajo para el Agente
1.  **Investigación:** Analiza la presencia online del Grupo Scout Nyeri para extraer la paleta de colores y logos exactos.
2.  **Estructura:** Crea el archivo `_config.yml` (si es Jekyll) o la estructura de carpetas necesaria.
3.  **Desarrollo:** Genera primero el `index.html` y la hoja de estilos base.
4.  **Contenido:** Redacta textos con valores scouts (hermandad, servicio, naturaleza).
5.  **Despliegue:** Asegúrate de que el archivo `CNAME` esté listo para el dominio personalizado.

## 6. Restricciones
* No usar librerías pesadas innecesarias.
* Todo el código debe estar comentado en español.
* Mantener la privacidad: No publicar fotos de menores sin marcadores de posición (placeholders) hasta que el usuario suba las reales.