import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function DownloadSlider() {
  return (
    <div className="download-fslide">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        <SwiperSlide>
          <Image 
            src="/images/imgslide1.png"
            alt="Martial Artist image"
            width={500}
            height={300}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image 
            src="/images/imgslide2.png"
            alt="Second slide image"
            width={500}
            height={300}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image 
            src="/images/imgslide3.png"
            alt="Third slide image"
            width={500}
            height={300}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image 
            src="/images/imgslide4.png"
            alt="Fourth slide image"
            width={500}
            height={300}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
