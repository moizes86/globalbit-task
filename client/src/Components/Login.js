import React from "react";
import InputField from "./InputField";
import { login } from "../DAL/httpServices";
import useForm from "../useForm";
import FormBottom from "./FormBottom";

export default function Login() {
  const { values, errors, countdown, handleBlur, handleChange, handleSubmit, loading, data, error } =
    useForm();

  const onSubmitLogin = (e) => {
    e.preventDefault();
    sessionStorage.setItem("email", values.email);
    handleSubmit(login, redirectTo);
  };

  const redirectTo = "/verify";

  return (
    <div className="container col-sm-7 col-md-6 col-lg-5 col-xl-4 my-5">
      <form onSubmit={onSubmitLogin}>
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

        <FormBottom
          loading={loading}
          data={data}
          countdown={countdown}
          error={error}
          btnText="Login"
          link="register"
        />
      </form>
    </div>
  );
}
