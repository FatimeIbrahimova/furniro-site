import { GridLoader } from "react-spinners";
import "./style.scss";


 interface isModalType{
	isModal?:boolean
 }

const Loading = ({isModal}:isModalType) => {
	return (
		
		<div className={`${isModal ? "modal-loading" : "loading"}`}>
			<GridLoader color="hsla(44, 67%, 53%, 1)" className="color"/>
		</div>
		
	);
};

export default Loading;
