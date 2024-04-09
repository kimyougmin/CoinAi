import Coins from "../typs/Coins";

const CoinIndexApi = async (): Promise<Coins[]> => {
    const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
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

        const coinIndex: Coins[] = data.data.coins.map((e: Coins) => {
            return {
                change: e.change,
                name: e.name,
                price: e.price,
                uuid: e.uuid,
                symbol: e.symbol,
            };
        });
        return coinIndex;
    } catch (error) {
        console.error("Error fetching coin index:", error);
        return [];
    }
}

export default CoinIndexApi;