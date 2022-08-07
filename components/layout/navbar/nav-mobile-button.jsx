import { useContext } from 'react';
import { NavContextSchema } from '../../../context/nav-context';
import classes from './nav-mobile-button.module.scss';

function NavMobileButton() {
 
  const { isOn, toggleNav } = useContext(NavContextSchema);
  return (
      <button className={classes.hamburger} onClick={toggleNav}>
        <span
          className={`${classes.line} ${classes['line--top']} ${
            isOn && classes.rotatetop
          }`}
        ></span>
        <span
          className={`${classes.line} ${classes['line--middle']} ${
            isOn && classes.rotatemiddle
          }`}
        ></span>
        <span
          className={`${classes.line} ${classes['line--bottom']} ${
            isOn && classes.rotatebottom
          }`}
        ></span>
      </button>
  
  );
}

export default NavMobileButton;
