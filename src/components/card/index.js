import React from 'react';
import './scss/index.scss';

import Contents from './components/contents';
import Images from './components/images';

class Card extends React.Component {

  render () {
    return(
      <div className="card">
        <div className="card-image">
          <Images
            club_id={this.props.data.club_id}
            club_photo={this.props.data.club_photo}
            club_profle_photo={this.props.data.club_profle_photo}
          />
        </div>
        <div className="card-content-container">
          <Contents
            club_id={this.props.data.club_id}
            club_name={this.props.data.club_name}
            club_copyright={this.props.data.club_copyright}
            club_rating={this.props.data.club_rating}
            loadingForCart={this.props.loadingForCart}
            messagePopupForCart={this.props.messagePopupForCart}
            isCartButtonView={this.props.isCartButtonView === undefined ? true : this.props.isCartButtonView}
          />
        </div>
      </div>
    )
  }
}

Card.propTypes = {

};

export default Card;
