function Article() {
  return (
    <div>
      Enter
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

export default Article;