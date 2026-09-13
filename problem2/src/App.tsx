import { useEffect, useState } from "react";
import { SwapForm } from "./components/SwapForm";
import { fetchPrices } from "./services/priceService";
import type { PriceMap } from "./types/price";

/**
 * Renders the main application and loads currency price data.
 *
 * @returns The application component.
 */
function App() {
  const [prices, setPrices] = useState<PriceMap>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPrices() {
      try {
        const data = await fetchPrices();
        setPrices(data);
      } catch {
        setError("Failed to load prices.");
      } finally {
        setIsLoading(false);
      }
    }

    loadPrices();
  }, []);

  if (isLoading) {
    return <p>Loading prices...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <SwapForm prices={prices} />;
}

export default App;