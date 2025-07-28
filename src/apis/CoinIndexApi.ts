import Coins from "../typs/Coins";

const CoinIndexApi = async (): Promise<Coins[]> => {
    const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&orderBy=marketCap&orderDirection=desc&limi';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${process.env.REACT_APP_CRYPTO_KEY}`,
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const coinIndex: Coins[] = data.data.coins
      .map((e: any): Coins => ({
        change: parseFloat(e.change),
        name: e.name,
        price: e.price,
        uuid: e.uuid,
        symbol: e.symbol,
      }))
      .sort((a: Coins, b: Coins) => parseFloat(b.price) - parseFloat(a.price));

    return coinIndex;
  } catch (error) {
    console.error("Error fetching coin index:", error);
    return [];
  }
}

export default CoinIndexApi;
