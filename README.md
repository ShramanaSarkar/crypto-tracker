📘 Assignment: Real-Time Crypto Price Tracker

🎯 Objective:
Build a responsive React + Redux Toolkit app that tracks real-time crypto prices (like CoinMarketCap), simulating WebSocket updates and managing all state via Redux.

🛠️ Tech Requirements:

📊 UI Table:
- Display 5 assets (e.g., BTC, ETH, USDT) in a table:  
  "# | Logo | Name | Symbol | Price | 1h % | 24h % | 7d % | Market Cap | 24h Volume | Circulating Supply | Max Supply | 7D Chart"
- Use sample crypto data.
- Color-code % changes: green (positive), red (negative).
- 7D chart can be static (SVG/image).
- Make table responsive.

🔄 Real-Time Updates:
- Simulate WebSocket using setInterval/mocked class.
- Every 1–2 seconds, randomly change:
  - Price
  - % Changes
  - 24h Volume
- Dispatch Redux actions (no local state).

🧠 Redux State Management:
- Use Redux Toolkit (createSlice, configureStore).
- Store all asset data in Redux.
- Use selectors to optimize re-renders.

🌟 Bonus (Optional):
- Integrate real WebSocket (e.g., Binance)
- Filters/sorting (top gainers, etc.)
- localStorage support
- Unit tests (reducers/selectors)
- TypeScript

# Real-Time Crypto Price Tracker

This project is a real-time cryptocurrency price tracker built with ReactJS and Material UI, leveraging Redux Toolkit for state management and simulating real-time updates via WebSocket (with the option to integrate with a real WebSocket like Binance). It displays a table of popular cryptocurrencies with their current prices, percentage changes, market capitalization, volume, circulating supply, max supply, and a mini 7-day price chart. It also includes filtering and sorting options, and persists sorting preferences using `localStorage`.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd crypto-tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn add
    ```

3.  **Run the application:**
    ```bash
    npm start
    # or
    yarn start
    ```

    This will start the development server, and the application will be accessible at `http://localhost:3000` in your web browser.

## Tech Stack

* **Frontend Framework:** [ReactJS](https://react.dev/) - A JavaScript library for building user interfaces.
* **UI Library:** [Material UI (MUI)](https://mui.com/) - A comprehensive suite of UI components following Google's Material Design guidelines.
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) - An opinionated toolset for efficient Redux development.
* **Real-Time Updates (Simulation):** `setInterval` and mocked class for simulating WebSocket behavior.
* **Real-Time Updates (Optional - Binance):** `ws` (Node.js WebSocket client) for connecting to the Binance WebSocket API.
* **Charting:** [Chart.js](https://www.chartjs.org/) with [react-chartjs-2](https://react-chartjs-2.netlify.app/) for rendering the 7-day price charts.
* **Styling:** [Emotion](https://emotion.sh/docs/introduction) - CSS-in-JS library used by Material UI for styling.
* **Local Storage:** Built-in browser `localStorage` API for persisting user preferences.

## Architecture

The application follows a component-based architecture typical of React applications, with Redux Toolkit managing the global application state.

crypto-tracker/
├── public/
│   └── index.html
│   └── ...
├── src/
│   ├── assets/             # Contains static assets like cryptocurrency logos
│   ├── components/         # Reusable UI components
│   │   └── CryptoTable.js  # Main component displaying the crypto data table
│   ├── data/               # Contains static or mock data
│   │   └── mockData.js     # Initial and sample cryptocurrency data
│   ├── services/           # Handles external services and data fetching
│   │   └── websocketService.js # Handles WebSocket connection (simulated or real)
│   ├── store/              # Redux store configuration and slices
│   │   ├── cryptoSlice.js  # Redux slice for managing cryptocurrency data
│   │   ├── filterSlice.js  # Redux slice for managing filtering and sorting options
│   │   └── store.js        # Redux store configuration
│   ├── App.js              # Main application component
│   ├── index.js            # Entry point of the application
│   └── ...
├── package.json
├── README.md

**Key Architectural Points:**

1.  **Component-Based UI:** The user interface is built using reusable React components provided by Material UI. The `CryptoTable` component is responsible for rendering the main table.

2.  **Redux for State Management:**
    * The global application state, including the cryptocurrency data and sorting options, is managed by Redux Toolkit.
    * **Slices:** `cryptoSlice` manages the array of cryptocurrency assets and provides reducers to update individual asset data. `filterSlice` manages the current sorting option and persists it in `localStorage`.
    * **Store:** The `store.js` configures the Redux store by combining the reducers from the different slices.
    * **Selectors:** Selectors (e.g., `selectCryptoAssets`) are used to efficiently access and derive data from the Redux store within components, optimizing re-renders.
    * **Actions:** Redux actions (e.g., `updateAsset`, `setSortOption`) are dispatched to update the state in response to events (like receiving WebSocket data or changing the sorting option).

3.  **WebSocket Service:**
    * The `websocketService.js` handles the connection to a WebSocket (either simulated using `setInterval` initially or a real WebSocket like Binance).
    * It is responsible for subscribing to relevant data streams and dispatching Redux actions (`updateAsset`) when new data is received.

4.  **Data Flow:** Data flows unidirectionally:
    * WebSocket service receives real-time data.
    * Actions are dispatched to the Redux store.
    * Reducers update the state in the store.
    * React components subscribe to relevant parts of the state using `useSelector`.
    * Components re-render when the selected state changes.

5.  **Filtering and Sorting:**
    * The `filterSlice` in Redux manages the `sortOption`.
    * The `CryptoTable` component uses the `sortOption` and the `useMemo` hook to efficiently sort the displayed assets based on the selected criteria.

6.  **Local Storage Persistence:**
    * The `filterSlice` interacts with `localStorage` to save the user's preferred sorting option, ensuring it persists across browser sessions.

This architecture promotes maintainability, scalability, and a clear separation of concerns within the application.


## DEMO LINK: 
https://drive.google.com/drive/folders/1lkgz-U2tObsQKW136Ll8rtNZIuvzcfLW?usp=sharing