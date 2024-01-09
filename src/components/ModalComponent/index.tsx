import ProductFeatures from "../ProductFeatures";
import "./style.scss";

const Modal = ({ itemId, onClose, isModal, like, card }: any) => {
	const closeModal = () => {
		onClose();
	};
	return (
		<div className="modal">
			{card && (
				<>
					<div className="modal-content">
						{itemId.Title}
						<i className="fa-solid fa-x" onClick={() => closeModal()}></i>
						<ProductFeatures itemId={itemId} isModal={isModal} card={card} />
					</div>
				</>
			)}
			{like && (
				<>
					<div className="modal-content">
						<ProductFeatures itemId={itemId} isModal={isModal} like={like} />
					</div>
				</>
			)}
		</div>
	);
};

export default Modal;
