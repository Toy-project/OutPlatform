import { transit } from 'react-css-transition';

export const transitionStyles = (height) => {
  return {
    defaultStyle: {
      transform: `translate(0, ${height-30}px)`,
      opacity: 0,
    },
    enterStyle: {
      transform: transit(`translate(0, ${height}px)`, 300, "cubic-bezier(0.25, 0.1, 0.25, 1)"),
      opacity: transit(1, 300, "cubic-bezier(0.25, 0.1, 0.25, 1)"),
    },
    leaveStyle: {
      transform: transit(`translate(0, ${height-30}px)`, 300, "cubic-bezier(0.25, 0.1, 0.25, 1)"),
      opacity: transit(0, 300, "cubic-bezier(0.25, 0.1, 0.25, 1)"),
    },
    activeStyle: {
      transform: `translate(0, ${height}px)`,
      opacity: 1,
    }
  }
};
