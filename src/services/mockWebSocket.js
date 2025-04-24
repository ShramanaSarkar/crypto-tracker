import { store } from '../store/store';
import { updateAsset } from '../store/cryptoSlice';

class MockWebSocket {
  constructor() {
    this.intervalId = null;
    this.assets = store.getState().crypto.assets;
  }

  connect() {
    this.intervalId = setInterval(() => {
      this.simulateUpdate();
    }, Math.random() * 1000 + 1000); 
  }

  disconnect() {
    clearInterval(this.intervalId);
  }

  simulateUpdate() {
    const randomIndex = Math.floor(Math.random() * this.assets.length);
    const assetToUpdate = this.assets[randomIndex];

    const priceChange = (Math.random() - 0.5) * 10;
    const change1hChange = (Math.random() - 0.5) * 0.2;
    const change24hChange = (Math.random() - 0.5) * 0.5;
    const volume24hChange = (Math.random() - 0.5) * 1000000000;

    const updatedData = {
      price: parseFloat((assetToUpdate.price + priceChange).toFixed(2)),
      change1h: parseFloat((assetToUpdate.change1h + change1hChange).toFixed(2)),
      change24h: parseFloat((assetToUpdate.change24h + change24hChange).toFixed(2)),
      volume24h: parseFloat((assetToUpdate.volume24h + volume24hChange).toFixed(2)),
    };

    store.dispatch(updateAsset({ id: assetToUpdate.id, updatedData }));
  }
}

const mockWebSocket = new MockWebSocket();
export default mockWebSocket;