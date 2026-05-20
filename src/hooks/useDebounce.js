// Custom hook som "saktar ner" ett värde
// Används för att t.ex. inte göra ett API-anrop på varje tangenttryck
// utan vänta tills användaren slutat skriva
//
// Användning:
//   const [search, setSearch] = useState("");
//   const debouncedSearch = useDebounce(search, 300);
//
//   useEffect(() => {
//     // körs först 300ms efter att search slutat ändras
//     fetch(`/api/search?q=${debouncedSearch}`);
//   }, [debouncedSearch]);

import { useEffect, useState } from "react";

export function useDebounce(value, delay = 300) {

  // State som håller det "saktade" värdet
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {

    // Startar en timer som uppdaterar värdet efter "delay" ms
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Om value ändras INNAN timern hunnit gå ut → rensa timern
    // → starta om från noll. Detta är själva debounce-magin.
    return () => clearTimeout(timer);

  }, [value, delay]); // Körs varje gång value ändras

  return debouncedValue;
}
