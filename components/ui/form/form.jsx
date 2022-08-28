import classes from './form.module.scss';
import emailForm from '../../../content/emailForm.json';
import useLocale from '../../../hooks/useLocale';
import Button from '../button';
import Input from './input';
import { useState, useEffect } from 'react';
import { ChevronRightIcon, MailIcon, RefreshIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import RichText from '../rich-text';
import Modal from '../modal';
import EmailRes from './email-res';

function Form({ titleform, subform }) {
  const locale = useLocale();
  const [modal, setModal] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false)

  const [value, setValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const toggleModal = (e) => {
    document.body.classList.toggle('body-full');
    setModal(bol => !bol);
  };

  const [viewed, setViewed] = useState(false);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !viewed) {
      setViewed(true);
    }
  }, [inView, viewed]);

  const [isLoading, setIsLoading] = useState(false);

  function onValueHandler(e) {
    setValue(s => ({ ...s, [e.target.id]: e.target.value }));
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    setIsLoading(true),
      axios
        .post('/api/email', {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          phone: value.phone,
          message: value.message,
        })
        .then(function (response) {
          setIsLoading(false);
          // setValue({
          //   firstName: '',
          //   lastName: '',
          //   email: '',
          //   phone: '',
          //   message: '',
          // });
          setEmailStatus(true);
          toggleModal();
          console.log('here', response.data);
        })
        .catch(function (error) {
          setEmailStatus(false);
          toggleModal();
          setIsLoading(false);
          console.log('errorhere', error.response.data);
        });
  }

  return (
    <>
    <form
      className={`${classes.form} ${viewed && classes.show}`}
      autoComplete={'off'}
      onSubmit={onSubmitHandler}
      ref={ref}
    >
  
      {modal && (
        <Modal type={'normal'} comp={EmailRes} closeModal={toggleModal} modal={modal} ok={emailStatus} />
      )}

      <div className={classes.titleblock}>
        <h2 className={`${classes.title}`}>{titleform ? titleform : ''}</h2>
        {subform && <RichText value={subform} />}
      </div>

      <Input
        type='text'
        id='firstName'
        content={emailForm[locale].firstname}
        val={value.firstName}
        onChange={onValueHandler}
      />
      <Input
        type='text'
        id='lastName'
        content={emailForm[locale].lastname}
        val={value.lastName}
        onChange={onValueHandler}
      />
      <Input
        type='email'
        inputMode='email'
        id='email'
        content={emailForm[locale].email}
        val={value.email}
        onChange={onValueHandler}
      />
      <Input
        type='tel'
        inputMode='tel'
        id='phone'
        content={emailForm[locale].phone}
        val={value.phone}
        onChange={onValueHandler}
      />
      <Input
        type='textarea'
        id='message'
        content={emailForm[locale].textarea}
        val={value.message}
        onChange={onValueHandler}
      />
      <div>
        <Button disabled={isLoading && true}>
          <span>{emailForm[locale].send}</span>
          {!isLoading && <ChevronRightIcon className={classes.svgsend} />}
          {isLoading && <RefreshIcon className={`${classes.svgsend} ${classes.sending}`} />}
        </Button>
      </div>
    </form>
    </>
  );
}

export async function getStaticProps(ctx) {
  return {
    props: {
      data: null,
    },
  };
}

export default Form;
