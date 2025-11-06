
import Bestseller from '../components/Bestseller.jsx'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Latestproducts from '../components/Latestproducts'
import SwiperSlider from '../components/SwiperSlider.jsx'
import Contact from '../components/Contact.jsx'





const Home = () => {

  return (
    <>

      <SwiperSlider />
      <Latestproducts />
      <Bestseller/>
      <Contact/>
      <Footer />
    </>
  )
}
export default Home