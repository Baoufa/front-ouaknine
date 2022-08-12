import classes from './form.module.scss';
import emailForm from '../../../content/emailForm.json';
import useLocale from '../../../hooks/useLocale';
import Button from './button';
import Input from './input';
import { useState, useEffect } from 'react';
import { ChevronRightIcon, MailIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';

function Form() {
  const locale = useLocale();
  const [value, setValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });


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
          console.log('here', response.data);
        })
        .catch(function (error) {
          setIsLoading(false);
          console.log('errorhere', error.response.data);
        });
  }

  return (
    <form
      className={`${classes.form} ${viewed && classes.show}`}
      autoComplete={'off'}
      onSubmit={onSubmitHandler}
      ref={ref}
    >
      <div className={classes.titleblock}>
        <h2 className={`${classes.title}`}>Envoyer un message</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique
          voluptas sapiente cum, quo deserunt ab obcaecati laborum numquam,
          ipsam maxime laboriosam. Quae neque magni ipsa. Excepturi quo debitis
          nisi maiores!
        </p>
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
        id='email'
        content={emailForm[locale].email}
        val={value.email}
        onChange={onValueHandler}
      />
      <Input
        type='text'
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
          <ChevronRightIcon className={classes.svgsend} />
        </Button>
      </div>
    </form>
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
