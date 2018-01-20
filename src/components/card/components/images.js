import React from 'react';
import '../scss/index.scss';

import { withRouter } from "react-router-dom";


// 파일 이름 변경
import default_image from 'images/icons/ic-image-black-24-px.svg';
import person_image from 'images/icons/ic-profile.svg';

class Images extends React.Component {

  constructor(props){
    super(props);

    this.goToClub = this.goToClub.bind(this);
  }

  goToClub() {
    const club_id = this.props.club_id;
    
    this.props.history.push(`/club/${club_id}`);
  }

  render() {
    return(
      <div>
        <a className="default" onClick={this.goToClub}>
          <img src={default_image} alt="" />
        </a>
        {/* <img src={img} /> */}

        <a href="" className="float">
          <img src={person_image} alt="" />
        </a>
      </div>
    );
  }
}

Images.propTypes = {

};

export default withRouter(Images);
