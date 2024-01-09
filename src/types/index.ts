export interface ProductTypes {
	id?: number | any;
	imageFiles?: string[] | any;
	title?: string;
	subTitle?: string;
	salePrice?: number;
	discountedPrice?: number;
	discountPercent?: number;
	isNew?: boolean;
	colors?: Array<{
		id: number;
		colorHexCode: string;
		imageFiles: Array<string>;
	}>;
	sizes?: Array<{ id: number; sizeName: string }>;
	count?: number | any;
	introduction?: string;
	sku?: string;
	category?: { id: number; categoryName: string };
	tags?: Array<{ id: number; tagName: string }> | undefined;
	products?: ProductTypes[];
	totalProductCount?: any;
	ProductImages?: string | undefined;
	length?: number;
	// productId: number;
	// colorId:number;
	// userId: number;
	// productImages:{id:number}
}

export interface ProductTypes2 {
	id?: number | any;
	imageFiles?: string[] | any;
	title?: string;
	subTitle?: string;
	salePrice?: number;
	discountedPrice?: number;
	discountPercent?: number;
	isNew?: boolean;
	colors?: Array<{
		id: number;
		colorHexCode: string;
		imageFiles: Array<string>;
	}>;
	sizes?: Array<{ id: number; sizeName: string }>;
	count?: number | any;
	introduction?: string;
	sku?: string;
	category?: { id: number; categoryName: string };
	tags?: Array<{ id: number; tagName: string }> | undefined;
	products?: ProductTypes[];
	totalProductCount?: any;
	ProductImages?: string | undefined;
	length?: number;
	productId: number;
	colorId:number;
	userId: number;
	productImages:{id:number}
}
export interface SearchData extends ProductTypes {
	productImages: Array<{ imageFile: string }>;
	imageFile?: any;
	id?: string;
}
export interface RangeTypes {
	id?: number;
	img?: string;
	room?: string;
}

export interface gridTypes {
	imageUrls?: string;
	id?: number;
}

export interface countryAndProvinceTypes {
	id?: number;
	countryName?: string;
	ccode?: string;
	provinces?: Array<{ id: number; provinceName: string }>;
	provinceName: string;
}

export interface blogTypes {
	id: number;
	header: string;
	imageUrls: string;
	createdDate: string;
	categoryName: string;
	blogCount: number;
	blogs: Array<{
		id: number;
		imageUrls: string;
		adminInfo: { id: number; roleName: string };
		createdDate: string;
		category: { id: number; categoryName: string };
		header: string;
		text: string;
	}>;
}

export interface Product {
	productId: number;
	productTitle: string;
	productImages: { id: number; imageFiles: string[] };
	discountedPrice?: number;
	salePrice?: number;
	count: number;
	subtotal: number;
}

export interface CartItem {
	cartItems?: Product[];
}

export interface ContactInfo {
	address: string;
	mobile: string;
	hotline: string;
	weekdayWorkingTime: string;
	weekendWorkingTime: string;
	id: number;
}

export interface reviewState {
	text: string;
	rate: number;
	id: number;
	userProfile: {
		payload: {
			id: number;
			userName: string;
			firstName: string;
			lastName: string;
			email: string;
		};
	};
	appUserId: string;
	totalReviewCount: number;
	productReviews: any;
}

export interface ReviewData {
	totalReviewCount: number;
	productReviews: reviewState[];
}
