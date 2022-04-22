import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Paginas/Home';
import { FavoritePokemonProvider } from './Context/FavoritePokemon';
import Favorites from './Paginas/Favorites'
import GroupPokemon from './Paginas/GroupPokemon';
import Portfolio from './Paginas/Portfolio';
import { PokemonGroupProvider } from './Context/PokemonGroup';

function App() {
  return (
    <FavoritePokemonProvider>
      <PokemonGroupProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/grupo-Pokemon' element={<GroupPokemon />} />
            <Route path='/favoritos' element={<Favorites />} />
            <Route path='/portfolio' element={<Portfolio />} />
          </Routes>
        </BrowserRouter>
      </PokemonGroupProvider>
    </FavoritePokemonProvider>
  );
}

export default App;
