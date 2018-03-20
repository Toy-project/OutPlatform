import React from 'react';
import { connect } from 'react-redux';
import  { withRouter } from 'react-router-dom';
import Pagination from "react-js-pagination";
import dateFormat from 'dateformat';

import * as SearchService from 'actions/search';

import './scss/index.scss';

import * as Common from 'helper/common';
import { searchListEnd } from 'helper/variables';

import { isEmpty } from 'helper/regExp';

import { InnerError, InnerLoading } from 'components/';

class Search extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        activePage: 1,
      }

      this.handlePageChange = this.handlePageChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleDetectEnter = this.handleDetectEnter.bind(this);
    }

    handleDetectEnter(e) {
      return e.key === 'Enter' ? this.handleSearch(e) : false;
    }

    handleSearch(e) {
      e.preventDefault();
      const keyword = encodeURIComponent(this.refs.keyword.value);

      if(isEmpty(keyword)) {
        return false;
      }

      //세션 저장소에 저장
      sessionStorage.setItem('keyword', keyword);

      this.props.history.push(`/search`);
      this.props.fetchSearch(keyword, 0);
    }

    handlePageChange(pageNumber){
      let start; //스타트 번호

      //같은 페이지 번호일 경우
      if(pageNumber === this.state.activePage){
        return false;
      }
      //Data Fetch
      start = pageNumber * 8 - 8;

      this.props.fetchSearch(sessionStorage.getItem('keyword') ? sessionStorage.getItem('keyword') : '', start);

      this.setState({
        ...this.state,
        activePage: pageNumber,
      });
    }

    componentDidMount() {
      this.props.fetchSearch(sessionStorage.getItem('keyword') ? sessionStorage.getItem('keyword') : '', 0);
    }

    render() {
      const searchData = () => {
        if(Common.isLoading(this.props.search)) {
          return (
            <div className='global-loading'>
              <InnerLoading loading={this.props.search.isLoading} />
            </div>
          );
        }

        if(Common.isError(this.props.search)){
          return (
            <div className='global-error'>
              <InnerError component={'검색'} />
            </div>
          );
        }

        const search = this.props.search.data;

        if(Common.checkEmptyData(search)){
          return false;
        }

        return search.map((data, key) => {
          const image = data.club_photo ? data.club_photo.split(',') : [''];
          return (
            <li key={key}>
              <div className='search-card'>
                {data.club_photo ? <img alt='' src={`${process.env.API_URL}/${image[0]}`} /> : <span className="default"></span>}
                <ul className='club-info'>
                  <li><h3>단체정보</h3></li>
                  <li>단체 이름 : {data.club_name}</li>
                  <li>단체 생성일 : {dateFormat(data.club_create_date,'yyyy-mm-dd')}</li>
                  <li>대학교 : {data.club_college}</li>
                  <li>단체 설명 : {data.club_ex}</li>
                </ul>
              </div>
            </li>
          );
        });
      }

      return (
        <div className='search-container'>
          <div className='container'>
            <div className='viewList'>
              <div className='search-bar'>
                <label>
                  <i onClick={this.handleSearch}></i>
                </label>
                <input type='text' ref='keyword' placeholder='검색어를 입력해주세요.' defaultValue={sessionStorage.getItem('keyword') ? decodeURIComponent(sessionStorage.getItem('keyword')) : ''} onKeyPress={this.handleDetectEnter} />
              </div>
              <h1>총 검색 결과 {this.props.search.count}개를 찾았습니다.</h1>
              {this.props.search.count === 0 ? <h3>죄송합니다. 찾을 수 없습니다.</h3> : ''}
              <ul className='club-list'>
                {searchData()}
              </ul>
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={searchListEnd}
                totalItemsCount={this.props.search.count}
                onChange={this.handlePageChange}
                prevPageText={'이전'}
                nextPageText={'다음'}
                linkClassPrev={'previous'}
                linkClassNext={'next'}
              />
            </div>
          </div>
        </div>
      );
    }
}

Search.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearch: (keyword, start) => {
      dispatch(SearchService.fetchSearch(keyword, start));
    },
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Search));
