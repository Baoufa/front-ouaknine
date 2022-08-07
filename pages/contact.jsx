function Contact() {
  return (
    <div>
      Contact
    </div>
  );
}

export async function getStaticProps(ctx){

  return {
    props:{
      data:null
    }
  }
}

export default Contact;