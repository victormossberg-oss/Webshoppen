# Webshoppen

En webshop byggd i React som hämtar produkter från [DummyJSON](https://dummyjson.com/). Användaren kan bläddra bland produkter, söka, välja antal, lägga i kundvagn och slutföra ett köp via en kassa.

Projektet är skapat som kursuppgift i React & Avancerad JavaScript på Företagsuniversitetet i Stockholm.

## Funktioner

- Startsida med hero-sektion och utvalda produkter
- Produktsida med alla produkter och sökfunktion (med debounce)
- Detaljerad produktsida där användaren väljer antal innan tillägg i kundvagn
- Kundvagn som sparas i `localStorage` (försvinner inte vid omladdning)
- Kassa med formulär för kontaktuppgifter, adress och betalning
- Bekräftelsesida efter slutfört köp

## Teknikstack

- **React 19** (Vite)
- **React Router 7** för navigering
- **Tailwind CSS 4** för styling
- **Context API** för global state (kundvagnen)
- **DummyJSON** som externt produkt-API

## Installation

Klona projektet och kör:

```bash
npm install
npm run dev
```

Appen startar på `http://localhost:5173`.

## Projektstruktur

```
src/
├── components/
│   └── Navbar.jsx           Navigation med kundvagn-räknare
├── context/
│   ├── CartContext.jsx      Context-objekt + useCart-hook
│   └── CartProvider.jsx     State och logik för kundvagnen
├── hooks/
│   └── useDebounce.js       Återanvändbar debounce-hook
├── pages/
│   ├── Home.jsx             Startsida (hero + utvalda produkter)
│   ├── Products.jsx         Alla produkter + sökfunktion
│   ├── ProductPage.jsx      Detaljsida för en produkt
│   ├── Cart.jsx             Kundvagn
│   └── Checkout.jsx         Kassa med formulär
├── App.jsx                  Routing
└── main.jsx                 Entrypoint
```

## Implementation av debounce

Debounce används på sökfältet i `Products.jsx` för att undvika att API:et anropas på varje tangenttryck. Istället väntar appen 300 ms efter att användaren slutat skriva innan sökningen körs.

### Återanvändbar custom hook

Logiken ligger i [`src/hooks/useDebounce.js`](src/hooks/useDebounce.js):

```js
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

Hooken tar ett värde och en fördröjning, och returnerar en "saktad" version av värdet. Varje gång `value` ändras startas en ny `setTimeout`. Om värdet ändras igen *innan* timern hunnit gå ut, rensas den gamla timern (`clearTimeout` i return-funktionen) — och en ny timer startar från noll. Resultatet är att `debouncedValue` bara uppdateras när användaren faktiskt pausat.

### Användning i Products.jsx

```jsx
const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search, 300);

useEffect(() => {
  // Körs först 300 ms efter att search slutat ändras
  fetchProducts();
}, [debouncedSearch]);
```

Eftersom `useEffect` har `debouncedSearch` (inte `search`) som dependency, anropas API:et endast när användaren slutat skriva. Om du skriver "phone" snabbt blir det **ett** API-anrop istället för fem.

## Felhantering med try...catch

Alla API-anrop som görs i `useEffect` är inlindade i `try...catch` för att fånga upp nätverksfel utan att kraschar appen.

### Mönster som används

```jsx
useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products);

    } catch (error) {
      // Loggar felet så det går att felsöka
      console.log("Fel vid hämtning:", error);

    } finally {
      // Körs alltid — även vid fel — så laddtexten försvinner
      setLoading(false);
    }
  };

  fetchProducts();
}, [debouncedSearch]);
```

### Varför det är viktigt

Om en användare t.ex. tappar internetuppkopplingen mitt i en sökning kastar `fetch` ett fel. Utan `try...catch` skulle hela komponenten krascha och en vit skärm visas. Med `try...catch`:

- **`try`** kör koden som *kan* gå fel.
- **`catch`** fångar felet och loggar det — appen fortsätter köra.
- **`finally`** körs alltid (även vid fel), vilket gör att vi alltid stänger av loading-state. Annars skulle "Laddar..." fastna för evigt om något gick fel.

Samma mönster används i `Home.jsx` och `ProductPage.jsx`.

## Licens

Skoluppgift — fri att använda och modifiera.
