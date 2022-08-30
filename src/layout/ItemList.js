import { Swiper, SwiperSlide } from "swiper/react";
import Item from './Item.js';
import "./ItemList.css";


import 'swiper/swiper.min.css';


import "swiper/modules/effect-coverflow/effect-coverflow.min.css";
import "swiper/modules/pagination/pagination.min.css";

import { EffectCoverflow, Pagination } from "swiper";

export default function App() {
  return (
    <div className="container">
      <Swiper      
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
      
        initialSlide={5}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 600,
          modifier: 1,
          slideShadows: true,
        }}

        
        
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        
      >
        <SwiperSlide>
        <Item />
        </SwiperSlide>
        <SwiperSlide>
        <Item />
        </SwiperSlide>
        <SwiperSlide>
        <Item />
        </SwiperSlide>
        <SwiperSlide>
        <Item />
        </SwiperSlide>
        <SwiperSlide>
        <Item />
        </SwiperSlide>
        <SwiperSlide>
        <Item />
        </SwiperSlide>
        <SwiperSlide>
        <Item />
        </SwiperSlide>
        <SwiperSlide>
        <Item />
        </SwiperSlide>
        <SwiperSlide>
        <Item />
        </SwiperSlide>
        <SwiperSlide>
        <Item />
        </SwiperSlide>
        <SwiperSlide>
        <Item />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
