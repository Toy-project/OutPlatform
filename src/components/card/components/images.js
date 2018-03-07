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
    const image = this.props.club_photo ? this.props.club_photo.split(',') : [''];
    return(
      <div onClick={this.goToClub}>
        <Scroll offset={0}>
          {image[0] ? <img src={`/${image[0]}`} alt='' className='card-image' /> :
                      <span className="default"></span>}
        </Scroll>
        {this.props.club_profle_photo ? <img src={`/${this.props.club_profle_photo}`} alt='' className='float' /> : <div href="" className="float"></div>}
      </div>
    );
  }
}

Images.propTypes = {

};

export default withRouter(Images);
