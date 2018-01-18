import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class TypeOfClubSelection extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      finalType : 0,
    }

    this.onFinalType = this.onFinalType.bind(this);
  }

  onFinalType = (value) => (e) => {
    switch(value){
      case 1:
        this.setState({
          finalType : 0,
        });
        break;
      case 2:
        this.setState({
          finalType : 1,
        });
        break;
      case 3:
        this.setState({
          finalType : 2,
        });
        break;
      default: break;
    }
  }

  render() {
    const normalClass = 'circle';
    const selectedClass = 'circle selected';

    return (
      <div className='type-of-Club-Selection-inner'>
        <h3>단체회원가입</h3>
        <p>
          어떤 단체이신가요?
        </p>
        <ul>
          <li><span className={this.state.finalType === 0 ? selectedClass : normalClass} onClick={this.onFinalType(1)}>동아리</span></li>
          <li><span className={this.state.finalType === 1 ? selectedClass : normalClass} onClick={this.onFinalType(2)}>학회</span></li>
          <li><span className={this.state.finalType === 2 ? selectedClass : normalClass} onClick={this.onFinalType(3)}>소모임</span></li>
        </ul>
        <button onClick={this.props.toggleToBack} className="gray-btn left">이전</button>
        <NavLink className="emerald-btn right" to={`/register/${this.state.finalType}`}>확인</NavLink>
      </div>
    );
  }
}

TypeOfClubSelection.propTypes = {
  toggleToBack: PropTypes.func,
};

export default TypeOfClubSelection;
