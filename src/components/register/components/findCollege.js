import React from 'react';
import { CSSTransition } from "react-css-transition";
import Pagination from "react-js-pagination";

import * as AnimationStyle from 'helper/animationStyle';
import { InnerLoading } from 'components/';

import * as College from 'services/colleges';

class FindCollege extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: false,
      popupContainerHeight: 0,
      data: [],
      msg : '대학교를 검색해주세요!',
      active: false,
      activePage: 1,
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);

    this.setPopupContainerHeight = this.setPopupContainerHeight.bind(this);

    this.handleSearch = this.handleSearch.bind(this);

    this.handlePageChange = this.handlePageChange.bind(this);

    this.setCollegeName = this.setCollegeName.bind(this);
  }

  componentDidMount() {
    //Click outside of inner div
    window.addEventListener('load', this.setPopupContainerHeight());
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.setPopupContainerHeight());
  }

  handleClose() {
    this.handleToggle();
    setTimeout(() => {
      this.props.close();
    }, 300);
  }

  handleToggle() {
    this.setState({
      active: !this.state.active,
    });
  }

  setPopupContainerHeight() {
    this.setState({
      active : !this.state.active,
      popupContainerHeight : document.getElementById('popup-wrapper').offsetHeight,
    });
  }

  handlePageChange(pageNumber) {
    this.setState({
      isLoading: !this.state.isLoading,
    });

    College.getColleges(pageNumber, 5, this.refs.college_keyword.value)
      .then((res) => {
        if(res.data) {
          this.setState({
            isLoading: !this.state.isLoading,
            data : res.data.dataSearch.content,
            msg : res.data.dataSearch.content.length === 0 ? '검색 결과가 없습니다.' : '대학교를 검색해주세요!',
          });
        }
      })
      .catch((err) => {
        this.setState({
          isLoading: !this.state.isLoading,
          msg : '네트워크 상태가 좋지 않습니다. 잠시 후에 이용해주세요.',
        });
      })

    this.setState({
      activePage: pageNumber,
    });
  }

  handleSearch(e) {
    e.preventDefault();

    this.handlePageChange(1);
  }

  setCollegeName = (value) => (e) => {
    this.props.setCollegeName(value);
    this.handleClose();
  }

  render() {
    const _thisContainerMinHeight = this.state.popupContainerHeight;
    const _thisInnerWindowHeight = window.innerHeight;
    const _animationStartFrom = (_thisInnerWindowHeight - _thisContainerMinHeight) / 2 - 100;
    const loading = (
      <div className='global-loading fixed'>
        <InnerLoading loading={this.state.isLoading} />
      </div>
    );

    const college_data = this.state.data.length !== 0 ? this.state.data.map((item, key) => {
      return (
        <li key={key} onClick={this.setCollegeName(item.schoolName)}>
          {item.schoolName} ({item.adres})
        </li>
      )
    }) : '';

    return (
      <div id='popup_container' className='popup_container'>
        <CSSTransition
          id = 'popup_container'
          transitionAppear={true}
          {...AnimationStyle.transitionStyles(_animationStartFrom)}
          active={this.state.active}>
          <div id='popup-wrapper' className='find-college-container'>
            <div className='close-btn-right' onClick={this.handleClose}>
              <span className='x-icon'></span>
            </div>
            <div className='contents'>
              <h3>대학찾기</h3>
              <form onSubmit={this.handleSearch}>
                <input type='text' ref='college_keyword' id='college_keyword' />
                <input type='submit' ref='submit' id='submit' value='검색' />
              </form>

              <ul className='college-list'>
                {this.state.data.length === 0 ? <li className='at-first'>{this.state.msg}</li> : college_data}
              </ul>
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={5}
                totalItemsCount={this.state.data[0] ? this.state.data[0].totalCount : 0}
                pageRangeDisplayed={4}
                onChange={this.handlePageChange}
                prevPageText={'이전'}
                nextPageText={'다음'}
                linkClassPrev={'previous'}
                linkClassNext={'next'}
                getPageUrl={this.getPageUrl}
              />
            </div>
            {this.state.isLoading ? loading : ''}
          </div>
        </CSSTransition>
      </div>
    );
  }
}

FindCollege.propTypes = {
};

export default FindCollege;
