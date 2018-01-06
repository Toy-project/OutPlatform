import React from 'react';
import '../scss/common.scss';
import Footer from '../components/footer/footer';
import MainViewList from '../components/mainViewList/mainViewList';
import Header from '../components/header/header';

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
