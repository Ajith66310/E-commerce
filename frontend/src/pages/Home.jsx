
import Bestseller from '../components/Bestseller.jsx'
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
    </>
  )
}
export default Home