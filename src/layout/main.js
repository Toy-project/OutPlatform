import React from 'react';
import '../scss/common.scss';
import { Header, MainViewList, Footer } from '../components/';

class main extends React.Component {
  render() {
    return(
      <div>
        <Header />
        <MainViewList />
        <Footer />
      </div>
    )
  }
}

export default main;
