import React from 'react';
import PropTypes from 'prop-types';

import { getClubName, updateClub } from 'services/club';
import SnippetEditPopupName from './snippetEditPopupName';
import SnippetEditPopupCopyright from './snippetEditPopupCopyright';

class Snippet extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      myPage: this.props.myPage,
      isEditToggleName: false,
      isEditToggleCopyright: false,
    }

    this.editToggleName = this.editToggleName.bind(this);
    this.editToggleCopyright = this.editToggleCopyright.bind(this);
  }

  editToggleName() {
    this.setState({
      isEditToggleName: !this.state.isEditToggleName,
    });
  }
  editToggleCopyright() {
    this.setState({
      isEditToggleCopyright: !this.state.isEditToggleCopyright,
    });
  }

  render() {
    let editNamePopup = this.state.isEditToggleName ? <SnippetEditPopupName
                                                        close={this.editToggleName}
                                                        club_name={this.props.club_name}
                                                        club_id={this.props.club_id} /> : '';
    let editCopyrightPopup = this.state.isEditToggleCopyright ? <SnippetEditPopupCopyright
                                                                  close={this.editToggleCopyright}
                                                                  club_copyright={this.props.club_copyright}
                                                                  club_id={this.props.club_id}/> : '';

    // let editCopyright = (
    //   <div>
    //     <input type='text' id='club_copyright' ref='club_copyright' onChange={this.handleChange} defaultValue={this.state.club_copyright.value} />
    //     <a>TEST</a>
    //   </div>
    // )
    // let editName = (
    //   <div>
    //     <input type='text' id='club_name' ref='club_name' onChange={this.handleChange} defaultValue={this.state.club_name.value} />
    //     <a>TEST</a>
    //   </div>
    // )

    return (
      <div className='snippet-container'>
        <div className='container'>
          <div className='snippet-inner'>
            <div className='name'>
              <h1>{this.props.club_name}</h1>
              {this.props.myPage ? <i className='ic-edit' onClick={this.editToggleName}>수정</i> : ''}
            </div>

            <p>
              {this.props.club_copyright}
              {this.props.myPage ? <i className='ic-edit' onClick={this.editToggleCopyright}>수정</i> : ''}
            </p>
          </div>
        </div>
        {editNamePopup}
        {editCopyrightPopup}
      </div>
    );
  }
}

Snippet.propTypes = {
  myPage: PropTypes.bool,
};

export default Snippet;
