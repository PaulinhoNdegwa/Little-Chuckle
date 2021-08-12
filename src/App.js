import './App.css';
import { Fragment } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
// import Landing from './components/Landing';

function App() {
  return (
    <Fragment>
      <Header />
      {/* <Landing /> */}
      <Main />
      <Footer />
    </Fragment>
  );
}

export default App;
