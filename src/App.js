import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/Navbar/BottomNav';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='main-container'>
        <Container className='container'>
          <Routes>
            <Route path='/' element={<Trending />} exact />
            <Route path='/movies' element={<Movies />} />
            <Route path='/series' element={<Series />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </Container>
      </div>
      <ArrowDownwardIcon
        style={{
          color: 'white',
          position: 'fixed',
          bottom: '7rem',
          right: '1rem',
          fontSize: '4rem',
          backgroundColor: 'red',
          borderRadius: '50%',
          padding: '1rem',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.scroll(0, document.body.scrollHeight)
        }}
      />

      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
