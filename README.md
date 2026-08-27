# Park Bistro

Interaktivní webová aplikace pro malé bistro v parku.

## Co prototyp umí

- responzivní minimalistické rozhraní inspirované moderním Apple-style UI principy,
- menu s filtrováním podle kategorií,
- e-shop s 10 suvenýry,
- přidávání produktů do košíku,
- změnu množství a výpočet ceny,
- checkout formulář,
- generování čísla objednávky,
- uložení objednávek do `localStorage`,
- rezervační formulář se jménem, e-mailem, datem, časem a počtem osob,
- kontrolu kolize rezervací pro stejný čas v daném prohlížeči,
- potvrzovací obrazovky a toast notifikace,
- dynamický stav otevřeno/zavřeno podle času zařízení,
- automatické nasazení přes GitHub Pages.

## Struktura

```text
web-park/
├── index.html
├── README.md
├── .gitignore
├── assets/
│   ├── css/style.css
│   ├── js/app.js
│   └── images/
└── .github/workflows/pages.yml
```

## Spuštění lokálně

Stačí otevřít `index.html` v prohlížeči. Projekt nemá závislosti ani build krok.

## Demo režim

Rezervace a objednávky jsou prototypově ukládány do `localStorage` prohlížeče:

- `park-bistro-reservations`
- `park-bistro-orders`
- `park-bistro-cart`

Nejde o skutečný backend, skutečnou odeslanou e-mailovou zprávu ani platební bránu. Pro produkční provoz je potřeba přidat backend/databázi a napojit e-mailové a platební služby.

## Deployment

Každý push do `main` spouští GitHub Actions workflow `.github/workflows/pages.yml` a publikuje obsah repozitáře na GitHub Pages.
