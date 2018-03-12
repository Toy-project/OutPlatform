import React from 'react';
import { Nav, Search, Footer } from 'components/';

const SearchPage = ({ match }) => (
  <div>
    <Nav/>
    <Search keyword={match.params.keyword} />
    <Footer />
  </div>
);

export default SearchPage;
