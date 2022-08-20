import { useState, useRef } from 'react';
import classes from './input.module.scss';
import useAutosizeTextArea from '../../../hooks/useAutoSizeTextarea';

function Input({ type, inputMode, id, content, val, onChange }) {
  const [isFocus, setIsFocus] = useState(false);
  const textareaRef = useRef();


  useAutosizeTextArea(textareaRef.current, val);

  function toggleFocusHandler(event) {
    if(event.target.autocomplete)
    {
      event.target.autocomplete = "whatever";
    }
    setIsFocus(bol => !bol);
  }


  return (
    <div className={`${classes.inputgroup}`}>
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
          type={type}
          inputMode={inputMode}
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
