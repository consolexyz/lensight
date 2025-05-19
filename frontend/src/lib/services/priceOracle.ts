/**
 * PriceOracleService
 * 
 * Fetches price data from external sources like CoinGecko for use in
 * automated prediction resolution.
 */

import axios from 'axios';

export class PriceOracleService {
    private coinGeckoBaseUrl = 'https://api.coingecko.com/api/v3';
    private alphavantageBaseUrl = 'https://www.alphavantage.co/query';
    private alphavantageApiKey = process.env.ALPHAVANTAGE_API_KEY || '';

    /**
     * Fetches cryptocurrency price data from CoinGecko API
     * 
     * @param symbol Cryptocurrency symbol (e.g., 'bitcoin', 'ethereum')
     * @returns Current price in USD
     */
    async getCryptoPrice(symbol: string): Promise<number> {
        try {
            // Normalize the symbol for CoinGecko
            symbol = symbol.toLowerCase();

            // Handle common symbol mappings
            const symbolMap: Record<string, string> = {
                'btc': 'bitcoin',
                'eth': 'ethereum',
                'sol': 'solana',
                'avax': 'avalanche-2',
                'matic': 'matic-network',
            };

            const coinId = symbolMap[symbol] || symbol;

            const response = await axios.get(
                `${this.coinGeckoBaseUrl}/simple/price?ids=${coinId}&vs_currencies=usd`
            );

            if (!response.data || !response.data[coinId]) {
                throw new Error(`Price data not found for ${symbol}`);
            }

            return response.data[coinId].usd;
        } catch (error) {
            console.error(`Error fetching crypto price for ${symbol}:`, error);
            throw new Error(`Failed to fetch price for ${symbol}: ${(error as Error).message}`);
        }
    }

    /**
     * Fetches stock price data from Alpha Vantage API
     * 
     * @param symbol Stock symbol (e.g., 'AAPL', 'MSFT')
     * @returns Current price in USD
     */
    async getStockPrice(symbol: string): Promise<number> {
        try {
            if (!this.alphavantageApiKey) {
                throw new Error('Alpha Vantage API key not configured');
            }

            const response = await axios.get(
                `${this.alphavantageBaseUrl}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.alphavantageApiKey}`
            );

            if (!response.data || !response.data['Global Quote'] || !response.data['Global Quote']['05. price']) {
                throw new Error(`Price data not found for ${symbol}`);
            }

            return parseFloat(response.data['Global Quote']['05. price']);
        } catch (error) {
            console.error(`Error fetching stock price for ${symbol}:`, error);
            throw new Error(`Failed to fetch price for ${symbol}: ${(error as Error).message}`);
        }
    }

    /**
     * Gets price for any asset type
     * 
     * @param category Asset category ('crypto', 'stock', 'sports', 'social', etc.)
     * @param symbol Asset symbol or identifier
     * @returns Current price in USD or relevant metric
     */
    async getPrice(category: string, symbol: string): Promise<number> {
        switch (category.toLowerCase()) {
            case 'crypto':
                return this.getCryptoPrice(symbol);
            case 'stocks':
            case 'stock':
                return this.getStockPrice(symbol);
            case 'sports':
                // For sports and other categories, we would implement specific data fetching
                // For now, return a placeholder value and log that it's not implemented
                console.log(`Sports price oracle not yet implemented, returning placeholder`);
                return 0;
            case 'social':
                // Social metrics would be implemented here
                console.log(`Social price oracle not yet implemented, returning placeholder`);
                return 0;
            case 'other':
                // For other categories, we might use generic data sources
                console.log(`Generic oracle not yet implemented, returning placeholder`);
                return 0;
            default:
                // Default to trying crypto price as fallback
                console.log(`Unsupported category ${category}, trying crypto as fallback`);
                try {
                    return this.getCryptoPrice(symbol);
                } catch (error) {
                    throw new Error(`Unsupported asset category: ${category}`);
                }
        }
    }

    /**
     * Evaluates a price prediction by comparing current price with target price
     * 
     * @param category Asset category
     * @param symbol Asset symbol
     * @param targetPrice Target price to compare against
     * @param operator Comparison operator ('>', '<', '>=', '<=', '==')
     * @returns Boolean indicating if the prediction is correct
     */
    async evaluatePricePrediction(
        category: string,
        symbol: string,
        targetPrice: number,
        operator: string
    ): Promise<boolean> {
        try {
            const currentPrice = await this.getPrice(category, symbol);

            switch (operator) {
                case '>':
                    return currentPrice > targetPrice;
                case '>=':
                    return currentPrice >= targetPrice;
                case '<':
                    return currentPrice < targetPrice;
                case '<=':
                    return currentPrice <= targetPrice;
                case '==':
                    return currentPrice === targetPrice;
                default:
                    throw new Error(`Unsupported comparison operator: ${operator}`);
            }
        } catch (error) {
            console.error('Error evaluating price prediction:', error);
            throw new Error(`Failed to evaluate prediction: ${(error as Error).message}`);
        }
    }
}

export default new PriceOracleService();
