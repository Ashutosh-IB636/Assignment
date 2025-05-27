
import { useEffect, useState } from 'react'
import Card from './components/Card.jsx'
import './index.css'
import Loader from './components/Loader.jsx';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // (async () => {
    //   // const products = await fetch('https://dummyjson.com/products').then(res => res.json());
    //   // console.log(skip);
    //   if (skip > 50) {
    //     return;
    //   }
    //   setLoader(true);
    //   const products = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`).then(res => res.json());
    //   setAllProducts((prev) => [...prev, products.products]);
    //   setSkip((prev) => prev + 10);
    //   setLoader(false);
      
    // })();
  }, []);

  async function fetchMore(){
    
      // setLoader(true);
      const products = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`).then(res => res.json());
      setAllProducts((prev) => [...prev, products.products]);
      setSkip((prev) => prev + 10);
      setLoader(false);
  }

  // useEffect(() => {
  //   console.log(prodCount);
  // }, [prodCount]);

  function func() {
    fetchMore().then(()=>console.log("fetched"));
  }

  return (
    <>
      <div className="card-container" onScroll={func}>
        {allProducts.map((product,idx) => (
          <Card
            key={String(product.id)+"-"+ idx}
            title={product.title}
            description={product.description}
            image={product.thumbnail}
            price={product.price}
          />
        ))}
        {loader && <Loader />}
      </div>
    </>
  )
}

export default App
