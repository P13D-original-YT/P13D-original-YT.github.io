# CSTG Entertainment

Página principal (menú) de mi centro multimedia y blog personal: **Películas & Series**, **Música & Soundtrack** y **Turismo & Destinos**.

Sitio estático, sin dependencias ni proceso de compilación: solo HTML, CSS y JavaScript.

## Estructura

```
.
├── index.html     # Estructura de la página
├── index.css      # Estilos y animaciones
├── index.js       # Paralaje de fondo e inclinación 3D de tarjetas
├── README.md      # Este archivo
└── portadas/      # Imágenes de las tarjetas (crear esta carpeta)
    ├── pelis.png
    ├── musica.png
    └── info.png
```

## Publicar con GitHub Pages

1. Crea un repositorio en GitHub (para tu sitio personal usa el nombre `tu-usuario.github.io`).
2. Sube los archivos `index.html`, `index.css`, `index.js`, `README.md` y la carpeta `portadas/`.
3. Ve a **Settings → Pages**.
4. En **Source** elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
5. Guarda. En uno o dos minutos tu sitio estará en `https://tu-usuario.github.io/`.

## Personalizar

- **Enlaces de las tarjetas:** edita el atributo `href` de cada `<a class="card">` en `index.html`.
- **Imágenes:** cambia las rutas `url('portadas/...')` en cada `card-bg`.
- **Botón "Volver al inicio":** reemplaza el `href="#"` del pie de página por tu dirección.
- **Colores y fuentes:** están en las variables `:root` al inicio de `index.css`.

## Notas

- Las rutas son relativas, así que funcionan igual en local y en GitHub Pages.
- Si una carpeta enlazada (por ejemplo `CSTGPELIS/`) no está en el repositorio, la tarjeta dará error 404.
- Los archivos de video y audio pesados no son recomendables en GitHub (límite de 100 MB por archivo); para ellos conviene otro hosting.
- Las animaciones se desactivan automáticamente si el sistema tiene activada la opción "reducir movimiento".
