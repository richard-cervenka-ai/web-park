# Park Bistro

Interaktivní webová aplikace pro malé bistro v parku a zároveň ukázková laboratoř moderních webových technologií.

## Technologická stezka

Samostatná učební stránka je na `technologie.html`.

Obsahuje všech 35 původně požadovaných technologií. Každá lekce má:

- jasný název technologie,
- živý experiment nebo přesně označenou simulaci/architekturu,
- vysvětlení lidskou řečí,
- malý úkol,
- ukázku skutečného kódu,
- stav splnění uložený v prohlížeči.

## Technologie

HTML5, CSS3, JavaScript, Responsive Web Design, Dark/Light Mode, Web Components, SVG, Canvas API, React, Vue, Svelte, Vite, Tailwind CSS, Bootstrap, Leaflet, OpenStreetMap, Google Maps API, External API, Weather API, Charts, localStorage, IndexedDB, SPA, PWA, Service Worker, Lottie, GSAP, WebGL/Three.js, Framer Motion, Authentication, Stripe, Email API, Database, GitHub Actions a GitHub Pages.

## Proč mají některé lekce režim ARCHITEKTURA

GitHub Pages hostuje statický frontend. Databáze, autentizace, skutečné platby a odesílání e-mailů proto nejsou vydávány za hotový backend. Lekce ukazuje jejich skutečný tok a kde se v reálné aplikaci připojují.

## Deployment

Každý push do `main` spouští `.github/workflows/pages.yml` a publikuje web přes GitHub Pages.
