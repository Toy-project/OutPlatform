import React from 'react';
import '../scss/common.scss';
import Footer from '../components/footer/footer';
import ClubList from '../components/clubList/clubList';
import Header from '../components/header/header';

class main extends React.Component {
  render() {
    return(
      <div>
        <Header />
        <ClubList />
        <Footer />
      </div>
    )
  }
}

export default main;
