import React from "react";
import { register } from "../DAL/httpServices";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import useForm from "../useForm";
import FormBottom from "./FormBottom";
import InputField from "./InputField";

export default function Register() {
  const { values, errors, countdown, handleBlur, handleChange, handleSubmit, loading, data, error } =
    useForm();

  const redirectTo = "/login";

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    handleSubmit(register, redirectTo);
  };

  return (
    <div className="container col-sm-7 col-md-6 col-lg-5 col-xl-4 my-5">
      <form onSubmit={onSubmitRegister}>
        <InputField
          type="email"
          label="Email:"
          placeholder="Enter email address"
          name="email"
          id="email"
          value={values.email}
          error={errors.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <InputField
          type="text"
          label="First Name:"
          name="firstname"
          id="firstname"
          placeholder="Enter first name"
          value={values.firstname}
          error={errors.firstname}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <InputField
          label="Last Name:"
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Enter last name"
          value={values.lastname}
          error={errors.lastname}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GOOGLE_PLACES_KEY}
            selectProps={{
              values,
              onChange: (e) => {
                handleChange({target:{name:'address', value:e.label} });
              },
            }}
          />
        </div>

        <InputField
          label="Password:"
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          value={values.password}
          error={errors.password}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <InputField
          label="Confirm Password:"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm password"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <FormBottom
          loading={loading}
          data={data}
          countdown={countdown}
          error={error}
          btnText="Register"
          link="login"
        />
      </form>
    </div>
  );
}
