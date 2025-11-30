import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FavoritesProvider } from './context/FavoritesContext'; // <--- Import this

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FavoritesProvider>  {/* <--- Wrap App inside this */}
      <App />
    </FavoritesProvider>
  </React.StrictMode>,
)