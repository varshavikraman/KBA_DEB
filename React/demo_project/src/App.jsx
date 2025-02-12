import { useState } from 'react'
import Logos from './Logos.jsx'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [like, setLike] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  function handleToggleLike() {
    setLike((prelike)=>!prelike)
  };

  function handleToggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <Logos />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <button onClick={handleToggleLike}>
          {like ? "Liked" : "Disliked"}
        </button>
        <button onClick={handleToggleDarkMode} className="dark-mode-btn">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
