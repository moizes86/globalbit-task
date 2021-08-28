import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import { validationsAPI, validateFields } from "../DAL/validations";
import { Link, useHistory } from "react-router-dom";
import useFetch from "../useFetch";
import { login } from "../DAL/httpServices";
import CheckCircleSuccess from "./CheckCircleSuccess";

export default function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [countdown, setCountdown] = useState(2);

  const history = useHistory();

  const { sendRequest, loading, data, error, Spinner } = useFetch();

  useEffect(() => {
    if (data) {
      const myInterval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
      if (countdown === 0) {
        clearInterval(myInterval);
        history.push(`/verify/${values.email}`);
      }
    }
    return () => {};
  }, [data, countdown, history, values.email]);

  const handleBlur = ({ target: { name, value } }) => {
    try {
      validationsAPI[name](value);
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
    setErrors({ ...initialValues });
    sendRequest(login, values);
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
                Login
              </button>
              <Link to="/register">Register</Link>
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
