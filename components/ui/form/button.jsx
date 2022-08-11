import classes from './button.module.scss';

function Button(props) {
  if (props.href) {
    return (
      <a className={classes.btn} href={props.href} target='_blank' rel='noreferrer'>
        {props.children}
      </a>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onclick} {...props}>
      {props.children}
    </button>
  );
}

export default Button;
