import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import MovieThumbnail from './MovieThumbnail';

const Carousel = ({ movies }: { movies: any[] }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
      spaceBetween={10}
      className="py-4"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie._id}>
          <MovieThumbnail movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
