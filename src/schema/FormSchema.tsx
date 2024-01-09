import * as yup from "yup";

export interface FormValues {
    name: string
    email: string
    message: string
	password:string
    surname: string;
  }

export const FormSchema = yup.object().shape({
	name: yup.string().required("Name is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(6, "Password must have at least 6 characters."),
	message: yup.string().required("Message is required"),
    email: yup
		.string()
		.email("Please provide a valid email address")
		.required("Email address is required"),
	surname: yup.string().required("Last Name is required"),
});

export const RegisterSchema = yup.object().shape({
	userName: yup.string().required("userName is required")
	.min(5,"userName must be 5 characters or more"),
	password: yup
    .string()
    .required("Password is required")
    .min(8, 'Must be 8 characters or more.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase character.')
    .matches(/[!@#$%^&]/, 'Password must contain at least one symbol.')
    .matches(/[0-9]/, 'Password must contain at least one numeric value.'),
	firstName: yup.string().required("firstName is required"),
    email: yup
		.string()
		.email("Please provide a valid email address")
		.required("Email address is required"),
	lastName: yup.string().required("lastName is required"),
});

export const LoginSchema = yup.object().shape({
	userName: yup.string().required("userName is required")
	.min(5,"userName must be 5 characters or more"),
	password: yup
    .string()
    .required("Password is required")
    .min(8, 'Must be 8 characters or more.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase character.')
    .matches(/[!@#$%^&]/, 'Password must contain at least one symbol.')
    .matches(/[0-9]/, 'Password must contain at least one numeric value.'),
});

export const ResetSchema = yup.object().shape({
	currentPassword: yup
    .string()
    .required("Password is required")
    .min(8, 'Must be 8 characters or more.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase character.')
    .matches(/[!@#$%^&]/, 'Password must contain at least one symbol.')
    .matches(/[0-9]/, 'Password must contain at least one numeric value.'),
	newPassword: yup
    .string()
    .required("Password is required")
    .min(8, 'Must be 8 characters or more.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase character.')
    .matches(/[!@#$%^&]/, 'Password must contain at least one symbol.')
    .matches(/[0-9]/, 'Password must contain at least one numeric value.'),
	repeatNewPassword: yup
    .string()
    .required("Password is required")
    .min(8, 'Must be 8 characters or more.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase character.')
    .matches(/[!@#$%^&]/, 'Password must contain at least one symbol.')
    .matches(/[0-9]/, 'Password must contain at least one numeric value.'),
	id:yup.string()
});


export const ContactSchema = yup.object().shape({
	name: yup.string().required("Name is required"),
	message: yup.string().required("Message is required"),
    email: yup
		.string()
		.email("Please provide a valid email address")
		.required("Email address is required"),
});

export const CheckoutSchema = yup.object().shape({
	firstName: yup.string().required("First Name is required"),
	lastName: yup.string().required("Last Name is required"),
	streetAddress: yup.string().required("Street address is required"),
	city: yup.string().required("Town/City is required"),
	zipcode: yup.string().required("ZIP code is required"),
	phone: yup.string().required("Phone is required"),
	additionalInfo: yup.string().required("Additional Information"),
    emailAddress: yup
		.string()
		.email("Please provide a valid email address")
		.required("Email address is required"),
});

export const forgetPasswordSchema = yup.object().shape({
    email: yup
		.string()
		.email("Please provide a valid email address")
		.required("Email address is required"),
});

export const otpSchema = yup.object().shape({
    otpToken: yup
		.string()
		.required("Otp code is required"),
});

export const ResetPasswordSchema = yup.object().shape({
	newPassword: yup
    .string()
    .required("Password is required")
    .min(8, 'Must be 8 characters or more.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase character.')
    .matches(/[!@#$%^&]/, 'Password must contain at least one symbol.')
    .matches(/[0-9]/, 'Password must contain at least one numeric value.'),
	repeatNewPassword: yup
    .string()
    .required("Password is required")
    .min(8, 'Must be 8 characters or more.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase character.')
    .matches(/[!@#$%^&]/, 'Password must contain at least one symbol.')
    .matches(/[0-9]/, 'Password must contain at least one numeric value.'),
});

export const commentSchema = yup.object().shape({
    text: yup
		.string()
		.required("Comment is required"),
});


export type FormValuesType = yup.InferType<typeof FormSchema>;
