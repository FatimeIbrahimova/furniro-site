import { useEffect } from "react";
import "./style.scss";

const NotFound = () => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, []);
	return (
		<>
			<div className="not-found">
				<div className="container not-found">
					<div className="not-found_desc">
						<h2>This Page Was Lost</h2>
						<p>
							The Page You are looking for isn’t available. Try to search again
							or use the Go Back button below.
						</p>
						<a href="/">
							<i className="fa-solid fa-arrow-left"></i> Go Back
						</a>
					</div>
					<div className="not-found_img">
						<img
							src="https://storyhub-beauty-redq.vercel.app/static/3e89880fa3f03870db04c781ec892372/f26e3/404.png"
							alt="img"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default NotFound;