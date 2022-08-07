function Expertise() {
  return (
    <div>
      Expertise
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

export default Expertise;