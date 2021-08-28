import React, { useState, useEffect } from "react";
import { validationsAPI, validateFields } from "../DAL/validations";
import { register } from "../DAL/httpServices";
import { Link, useHistory } from "react-router-dom";
import useFetch from "../useFetch";
import InputField from "./InputField";
import CheckCircleSuccess from "./CheckCircleSuccess";

export default function Register() {
  const initialValues = {
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    password: "",
    confirmPassword: "",
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [countdown, setCountdown] = useState(2);
  const { sendRequest, loading, data, error, Spinner } = useFetch();

  const history = useHistory();

  useEffect(() => {
    if (data) {
      const myInterval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
      if (countdown === 0) {
        clearInterval(myInterval);
        history.push('/login');
      }
    }

    return () => {};
  }, [data, countdown, history, values.email]);

  const handleBlur = ({ target: { name, value } }) => {
    try {
      name === "confirmPassword" ? validationsAPI[name](value, values.password) : validationsAPI[name](value);
      setErrors({ ...errors, [name]: "" });
    } catch (err) {
      setErrors({ ...errors, [name]: err.message });
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const validateForm = () => {
    const isValidForm = validateFields(values);
    if (isValidForm !== true) {
      setErrors({ ...errors, [isValidForm.key]: isValidForm.message });
      return false;
    }

    setErrors(initialValues);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await sendRequest(register, values);
  };

  return (
    <div className="container col-sm-7 col-md-6 col-lg-5 col-xl-4 my-5">
      <form onSubmit={handleSubmit}>
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
        <InputField
          label="Address:"
          type="text"
          name="address"
          id="address"
          placeholder="Enter address"
          value={values.address}
          error={errors.address}
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

        {loading ? (
          <Spinner />
        ) : data ? (
          <>
            <CheckCircleSuccess message={data} />
            <p>Redirecting in {countdown}</p>
          </>
        ) : (
          <>
            <div className="py-3">
              <button type="submit" className="btn btn-primary mr-4">
                Register
              </button>
              <Link to="/login">Login</Link>
            </div>

            <div className="text-danger h5">
              <p>{error}</p>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
