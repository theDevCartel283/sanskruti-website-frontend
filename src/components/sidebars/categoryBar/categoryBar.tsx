"use client";

import { FC, useState, useEffect } from "react";
import CategoryCard from "./categoryCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";
import { filters } from "@/data/filterlist";
import { useAppSelector } from "@/redux/store/hooks";
import { selectCategory } from "@/redux/slice/category.slice";

const CategoryBar: FC = () => {
  const [numberSlides, setNumberSlides] = useState(4);

  const { categories } = useAppSelector(selectCategory);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setNumberSlides(5);
      } else if (window.innerWidth > 1024) {
        setNumberSlides(4);
      } else if (window.innerWidth > 768) {
        setNumberSlides(3);
      } else {
        setNumberSlides(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full bg-white px-[3vw]">
      <div className="flex flex-col gap-3">
        <h3 className="font-ysabeau text-center text-2xl font-semibold">
          Shop by categories
        </h3>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={numberSlides}
          className="flex w-full"
          autoplay={{
            delay: 1500,
            disableOnInteraction: true,
          }}
        >
          {categories?.map((category) => (
            <SwiperSlide key={category.Title} className="w-fit">
              <CategoryCard {...category} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoryBar;
