import * as yup from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
// password must contain at least 8 characters, one uppercase, one lowercase , one number and one special character

export const userSchema = yup.object().shape({
  userName: yup
    .string()
    .trim()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username can have maximum 20 characters")
    .matches(
      /^\w+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .required("Username is required"),
  password: yup
    .string()
    .matches(passwordRegex, { message: "Please create a stronger password" })
    .required("Password is required"),
  houseName: yup
    .string()
    .max(50, "House name should not exceed 50 characters")
    .required("House name is required"),
  area: yup
    .string()
    .max(50, "Area should not exceed 50 characters")
    .required("Area is required"),
  landmark: yup
    .string()
    .max(100, "Landmark should not exceed 100 characters")
    .required("Landmark is required"),
  city: yup
    .string()
    .max(50, "City should not exceed 50 characters")
    .required("City is required"),
  state: yup
    .string()
    .max(50, "State should not exceed 50 characters")
    .required("State is required"),
  country: yup
    .string()
    .max(50, "Country should not exceed 50 characters")
    .required("Country is required"),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "Pincode should be 6 digits")
    .required("Pincode is required"),
});
