const yup = require("yup");

const updateProfileSchema = yup.object().shape({
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

const validateSchema = (schema) => async (req, res, next) => {
    try {
      const values = JSON.parse(req.body.values);
      await schema.validate(values, { abortEarly: false });
      next();
    } catch (err) {
      console.error(err);
      if (err.name === "ValidationError") {
        const errors = {};
        err.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        return res.status(400).json({ errors });
      }
      res.status(400).json({ error: err.message });
    }
  };
  
  const updateProfileValidation = validateSchema(updateProfileSchema);
  
  module.exports = updateProfileValidation;
