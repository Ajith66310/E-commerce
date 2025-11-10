
import Bestseller from '../components/Bestseller.jsx'
import BonkersCornerAnimation from '../components/BonkersCornerAnimation.jsx'
import Latestproducts from '../components/Latestproducts'
import SwiperSlider from '../components/SwiperSlider.jsx'
import Contact from '../components/Contact.jsx'





const Home = () => {

  return (
    <>
      <SwiperSlider />
      <Latestproducts />
      <BonkersCornerAnimation />
      <Bestseller/>
      <Contact/>
    </>
  )
}
export default Home