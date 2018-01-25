import React from 'react';
import 'scss/common.scss';

class TypeFace extends React.Component {
    constructor(props){
      super(props);

      this.handleChange = this.handleChange.bind(this);

      this.state = {
        fw: 100,
        fs: 12,
      }
    }

    handleChange(e){
      const id = e.target.id;
      const element = document.getElementById(id);

      if(id === 'fw'){
        this.setState({
          ...this.state,
          fw: element.value,
        });
      }

      if(id === 'fs'){
        this.setState({
          ...this.state,
          fs: element.value,
        });
      }
    }

    render() {
      return (
        <div Style="margin:30px;">
          <h1>폰트</h1>
          Font-weight<input type='text' id='fw' onChange={this.handleChange} />
          Font-size<input type='text' id='fs' onChange={this.handleChange} />
          <div Style={`margin-top:30px;font-weight:${this.state.fw};font-size:${this.state.fs}px;`}>
            여기는 한글입니다.
          </div>
          <div Style={`margin-top:30px;font-weight:${this.state.fw};font-size:${this.state.fs}px;`}>
            This is English
          </div>
        </div>
      );
    }
}

TypeFace.propTypes = {
};

export default TypeFace;
