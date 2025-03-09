"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const DiscoverSection = () => {
  const images = [
    "/images/event1.png",
    "/images/event2.png",
    "/images/event3.png",
  ];

  return (
    <section className="py-10 mx-20">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1.5}
        breakpoints={{
          768: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-lg overflow-hidden shadow-md">
              <Image src={src} alt={`Event ${index + 1}`} width={400} height={250} className="w-full h-auto" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default DiscoverSection;
