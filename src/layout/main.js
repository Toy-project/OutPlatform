import React from 'react';
import '../scss/common.scss';
import Footer from '../components/footer/footer';
import ClubList from '../components/clubList/clubList';

class main extends React.Component {
  render() {
    return(
      <div className="wrapper">
        <div className="container">
          <ClubList />
          <Footer />
        </div>
      </div>
    )
  }
}

export default main;
