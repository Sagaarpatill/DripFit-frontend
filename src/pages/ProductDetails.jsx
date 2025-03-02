import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import Banner from '../components/Banner'
import { useLocation } from 'react-router-dom';
import axios from '../axios'
import '../stylesheets/productbanner.css'
import Productbanner from '../components/Productbanner';


const ProductDetails = () => {

  const [product, setproduct] = useState(null);
  const [error, setError] = useState(null);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const name = params.get('name');
  console.log(name);

  useEffect(() => {
  const fetchProductData = async () => {
    try {
      // Notice the change from /product/get/ to /product/details/
      const response = await axios.get(`/product/details/${name}`);
      const data = response.data;
      console.log(data);
      setproduct(data);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  fetchProductData();
}, [name]);


  useEffect(() => {
    if (product) {
      console.log(product);
    }
  }, [product]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div style={{ fontSize: '2rem' }}>Not Found</div>;
  }

  return (
    <div>
      <Navbar/>
        <Productbanner img={product.Image} name={product.Name} category={product.Category} brand={product.Brand} color={product.Color} size={product.Size} gender={product.Gender} price={product.Price} desc={product.Desc}/>
        {/* <Specifications/> */}
      <Footer/>
    </div>
  )
}

export default ProductDetails