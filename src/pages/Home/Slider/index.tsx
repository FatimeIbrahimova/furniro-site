import "./style.scss";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowSvg from "../../../images/Right 16px.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Pagination, Navigation } from "swiper/modules";
import { products } from "../../../Data/Data";
import SwiperCore from "swiper";
SwiperCore.use([Pagination, Navigation]);

const Slider: React.FC = () => {
	const [swiperRef, setSwiperRef] = useState<SwiperCore | null>(null);

	const handleArrowClick = () => {
		if (swiperRef) {
			(swiperRef as any).slideNext();
		}
	};

	return (
		<div className="slider-section">
			<div className="slider-section_content">
				<h1>50+ Beautiful rooms inspiration</h1>
				<p>
					Our designer already made a lot of beautiful prototipe of rooms that
					inspire you
				</p>
				<button>Explore More</button>
			</div>
			<Swiper
				onSwiper={(swiper) => setSwiperRef(swiper)}
				slidesPerView={2.2}
				spaceBetween={30}
				loop={true}
				pagination={{
					clickable: true,
				}}
				breakpoints={{
					320: {
						slidesPerView: 1,
					},
					640: {
						slidesPerView: 1,
					},
					800: {
						slidesPerView: 1.2,
					},
					900: {
						slidesPerView: 1.5,
					},
					1024: {
						slidesPerView: 2,
					},
					1150: {
						slidesPerView: 2.2,
					},
				}}
				navigation={true}
				modules={[Pagination, Navigation]}
				className="mySwiper"
			>
				{products?.map((item,index) => (
					<SwiperSlide key={item.id}>
						<img src={item.img} alt="img" loading="lazy" />
						<div className="overlay"></div>
						<div className="slider-content">
							<div className="wrapper">
								<div className="img-info">
									<div className="info-wrapper">
										<div className="range">
											<span>0{index+1}</span>
											<div className="line"></div>
											<h3>{item.room}</h3>
										</div>
										<div className="peace">
											<h3>Inner Peace</h3>
										</div>
									</div>
								</div>
								<div className="arrow " onClick={handleArrowClick}>
									<img src={ArrowSvg} alt="svg" />
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Slider;
