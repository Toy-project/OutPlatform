import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../assets/sass/materialize.scss';
const css = classNames.bind(styles);

class App extends Component {
  render() {
    return (
      <div>
        <a className={css('waves-effect','waves-light','btn')}>Button</a>
      </div>
    );
  }
}

export default App;
