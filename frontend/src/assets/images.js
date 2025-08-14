import hero_img from './hero_img.webp';
import hero_img2 from './hero_img2.webp';
import p1 from './p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import bglanding from './bg-landing.jpg';
import p4 from '../assets/p4.jpg';
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.avif'
const images = {
  bglanding,
  hero_img,
  hero_img2,
 p1,
 p2,
 p3,
 p4,
img2,
img1,
};

export const products = [
    {
      _id: 'P01',
      title:'GREEN PLEATED HOODIE ',
      img: p1,
      description:'Adith is King',
      price:999,
      percentage:'60',
      category: 'women',
      subcategory:'dress',
    },
    {
      _id: 'P02',
      title:'BLACK PLEATED JACKET',
      img: p2,
      description:'Adith is King',
      price:2141.5,
      percentage:'30',
      category: 'women',
      subcategory:'dress',
    },
    {
      _id: 'P03',
      title:'ORANGE PLEATED SHIRT',
      img: p3,
      description:'Adith is King',
      price:1998.5,
      percentage:'50',
      category: 'women',
      subcategory:'dress',
    },
    {
      _id: 'P04',
      title:'RED PLEATED TOP',
      img: p4,
      description:'Adith is King',
      price:999,
      percentage:'40',
      category: 'women',
      subcategory:'dress',
    },
    {
      _id: 'P02',
      title:'BLACK PLEATED JACKET',
      img: p2,
      description:'Adith is King',
      price:2141.5,
      percentage:'30',
      category: 'women',
      subcategory:'dress',
    },
    {
      _id: 'P03',
      title:'ORANGE PLEATED SHIRT',
      img: p3,
      description:'Adith is King',
      price:1998.5,
      percentage:'50',
      category: 'women',
      subcategory:'dress',
    },
]

export default images;