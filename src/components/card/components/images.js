import React from 'react';
import Scroll from 'react-scroll-to-element';

import { withRouter } from "react-router-dom";

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
      <div onClick={this.goToClub}>
        <Scroll offset={0}>
          <span className="default"></span>
        </Scroll>
        {/* <img src={img} /> */}

        <div href="" className="float"></div>
      </div>
    );
  }
}

Images.propTypes = {

};

export default withRouter(Images);
