
import Bestseller from '../components/Bestseller.jsx'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Latestproducts from '../components/Latestproducts'
import SwiperSlider from '../components/SwiperSlider.jsx'





const Home = () => {

  return (
    <>

      <SwiperSlider />
      <Latestproducts />
      <Bestseller/>
      <Footer />
    </>
  )
}
export default Home