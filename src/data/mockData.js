import BTCLogo from '../assets/btc.png';
import ETHLogo from '../assets/eth.png';
import USDTLogo from '../assets/usdt.png';
import XRPLogo from '../assets/xrp.png';
import BNBLogo from '../assets/bnb.png';
import SOLLogo from '../assets/sol.png';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const generateSparklineData = (base) => ({
  labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
  datasets: [
    {
      data: Array.from({ length: 7 }, () => base + (Math.random() - 0.5) * base * 0.1),
      borderColor: 'lightgreen',
      borderWidth: 1,
      pointRadius: 0,
      tension: 0.2,
    },
  ],
});

export const initialCryptoData = [
  {
    id: 'bitcoin',
    logo: BTCLogo,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 93759.48,
    change1h: 0.43,
    change24h: 0.93,
    change7d: 11.11,
    marketCap: 1861618902186,
    volume24h: 43874350047,
    circulatingSupply: 19.65,
    maxSupply: 21.00,
    sparklineData: generateSparklineData(90000),
  },
  {
    id: 'ethereum',
    logo: ETHLogo,
    name: 'Ethereum',
    symbol: 'ETH',
    price: 1802.46,
    change1h: -0.60,
    change24h: -3.21,
    change7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23547469307,
    circulatingSupply: 120.71,
    maxSupply: null,
    sparklineData: generateSparklineData(1700),
  },
  {
    id: 'tether',
    logo: USDTLogo,
    name: 'Tether',
    symbol: 'USDT',
    price: 1.00,
    change1h: -0.00,
    change24h: -0.00,
    change7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    circulatingSupply: 145.27,
    maxSupply: null,
    sparklineData: generateSparklineData(0.99),
  },
  {
    id: 'xrp',
    logo: XRPLogo,
    name: 'XRP',
    symbol: 'XRP',
    price: 2.22,
    change1h: -0.46,
    change24h: 0.54,
    change7d: -6.18,
    marketCap: 130073814966,
    volume24h: 5731481491,
    circulatingSupply: 58.39,
    maxSupply: null,
    sparklineData: generateSparklineData(2.1),
  },
  {
    id: 'binance-coin',
    logo: BNBLogo,
    name: 'Binance Coin',
    symbol: 'BNB',
    price: 606.65,
    change1h: -0.09,
    change24h: -1.20,
    change7d: -3.73,
    marketCap: 85471956947,
    volume24h: 1874281784,
    circulatingSupply: 140.89,
    maxSupply: 200.00,
    sparklineData: generateSparklineData(620),
  },
  {
    id: 'solana',
    logo: SOLLogo,
    name: 'Solana',
    symbol: 'SOL',
    price: 151.51,
    change1h: 0.53,
    change24h: 1.26,
    change7d: 14.74,
    marketCap: 78381858631,
    volume24h: 4681874486,
    circulatingSupply: 517.31,
    maxSupply: null,
    sparklineData: generateSparklineData(130),
  },
];