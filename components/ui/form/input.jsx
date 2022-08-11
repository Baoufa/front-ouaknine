import { useState, useRef } from 'react';
import classes from './input.module.scss';
import useAutosizeTextArea from '../../../hooks/useAutoSizeTextarea';
import { useInView } from 'react-intersection-observer';
import {useEffect} from 'react';

function Input({ type, id, content, val, onChange }) {
  const [isFocus, setIsFocus] = useState(false);
  const textareaRef = useRef();


  const [viewed, setViewed] = useState(false);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if(inView && !viewed){
      setViewed(true);
    }
  }, [inView, viewed])

  useAutosizeTextArea(textareaRef.current, val);

  function toggleFocusHandler(event) {
    if(event.target.autocomplete)
    {
      event.target.autocomplete = "whatever";
    }
    setIsFocus(bol => !bol);
  }


  return (
    <div className={`${classes.inputgroup} ${viewed && classes.show}`} ref={ref}>
      <label
        htmlFor={id}
        className={`${classes.label} ${
          (isFocus || val?.length) && classes.labelfocus
        }`}
      >
        {content}
      </label>
      {type !== 'textarea' && (
        <input
          type='text'
          name={id}
          id={id}
          className={classes.input}
          onFocus={toggleFocusHandler}
          onBlur={toggleFocusHandler}
          onChange={onChange}
          value={val}
          autoComplete={"none"}
          required
        />
      )}
      {type === 'textarea' && (
        <textarea
          type={type}
          id={id}
          className={classes.textarea}
          onFocus={toggleFocusHandler}
          onBlur={toggleFocusHandler}
          onChange={onChange}
          value={val}
          autoComplete={"none"}
          ref={textareaRef}
        ></textarea>
      )}
    </div>
  );
}

export default Input;
