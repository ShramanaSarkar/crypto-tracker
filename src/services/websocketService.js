import { store } from '../store/store';
import { updateAsset } from '../store/cryptoSlice';

const BINANCE_WS_URL = 'wss://stream.binance.com/ws';
const tickers = ['btcusdt', 'ethusdt', 'usdtusdt', 'xrpusdt', 'bnbusdt', 'solusdt'];

class WebSocketService {
  ws = null;

  connect() {
    this.ws = new WebSocket(BINANCE_WS_URL);

    this.ws.onopen = () => {
      console.log('Connected to Binance WebSocket');
      tickers.forEach(ticker => {
        this.subscribeTicker(ticker);
      });
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.e === 'trade') {
          const symbol = data.s.toLowerCase();
          const price = parseFloat(data.p);
          const baseSymbol = symbol.slice(0, -4).toUpperCase();
          if (store.getState().crypto.assets.find(asset => asset.symbol === baseSymbol)) {
            store.dispatch(updateAsset({ id: baseSymbol.toLowerCase(), updatedData: { price } }));
          }
        } else if (data.e === '24hrTicker') {
          const symbol = data.s.toLowerCase();
          const priceChangePercent = parseFloat(data.P);
          const volume24h = parseFloat(data.v);
          const baseSymbol = symbol.slice(0, -4).toUpperCase();
          if (store.getState().crypto.assets.find(asset => asset.symbol === baseSymbol)) {
            store.dispatch(updateAsset({
              id: baseSymbol.toLowerCase(),
              updatedData: {
                change24h: priceChangePercent,
                volume24h: volume24h * parseFloat(store.getState().crypto.assets.find(asset => asset.symbol === baseSymbol)?.price || 0),
              },
            }));
          }
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('Disconnected from Binance WebSocket. Attempting to reconnect in 5 seconds...');
      setTimeout(this.connect.bind(this), 5000);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }

  subscribeTicker(ticker) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        method: 'SUBSCRIBE',
        params: [`${ticker}@trade`, `${ticker}@ticker`],
        id: 1,
      }));
    }
  }

  unsubscribeTicker(ticker) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        method: 'UNSUBSCRIBE',
        params: [`${ticker}@trade`, `${ticker}@ticker`],
        id: 2,
      }));
    }
  }
}

const websocketService = new WebSocketService();
export default websocketService;