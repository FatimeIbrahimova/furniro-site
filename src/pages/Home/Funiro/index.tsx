import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import "./styles.css";

import { Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import { fetchGrid } from "../../../redux/features/gridSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { gridTypes } from "../../../types";
SwiperCore.use([Pagination]);

const Funiro:React.FC<gridTypes> = () => {
	const [swiperRef, setSwiperRef] = useState<SwiperCore | null>(null);
	const dispatch: ThunkDispatch<{}, void, AnyAction> = useDispatch();
	const gridData = useSelector((state: RootState) => state.grid.data);
	const status = useSelector((state: RootState) => state.grid.status);
 

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchGrid());
		}
	}, [dispatch,status]);

	return (
		<div className="funiro-section">
			<div className="funiro-section-container">
				<div className="funiro-section-container_title">
					<span>Share your setup with</span>
					<h2>#FuniroFurniture</h2>
				</div>
				<div className="funiro-section-container_">
					<div className="grid-container">
						{gridData?.map((grid,index)=>(
						<div className={`item item${index + 1}`} key={grid.id}><img src={grid.imageUrls} alt="img" /></div>
						))}
					</div>
					<Swiper
						onSwiper={() => setSwiperRef(swiperRef)}
						pagination={{
							clickable: true,
						}}
						breakpoints={{
							320: {
								slidesPerView: 1,
							},
							640: {
								slidesPerView: 2,
							},
							800: {
								slidesPerView: 3,
							},
							992: {
								slidesPerView: 3,
							},
						}}
						modules={[Pagination]}
						className="mySwiper"
					>
						{gridData?.map((grid)=>(
							<SwiperSlide key={grid.id}>
							<img src={grid.imageUrls} alt="img" />
						</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default Funiro;
