import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from './Components/NavBar';
import StartUpPage from './Components/StartUpPage';
import AdministratorPage from './Components/AdministratorPage';
import About from "./Components/About";

const ThemeStored = () => {
  let Theme = localStorage.getItem('Theme');
  if (Theme) {
    return (
      JSON.parse(localStorage.getItem('Theme'))
    )
  }
  else {
    return [];
  }
}

function App() {

  // eslint-disable-next-line
  const [Theme, setTheme] = useState(ThemeStored);
  useEffect(() => {
    localStorage.setItem('Theme', JSON.stringify(Theme))
  }, [Theme]);

  return (
    <div className={`App ${Theme}`}>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' exact element={<StartUpPage />} />
          <Route path='/AdministratorPage' element={<AdministratorPage />} />
          <Route path='/About' element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
