import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import { validationsAPI, validateFields } from "./DAL/validations";

export default function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [countdown, setCountdown] = useState(2);
  const [redirectTo, setRedirectTo] = useState(null);
  const { sendRequest, loading, data, error, Spinner } = useFetch();

  const history = useHistory();

  useEffect(() => {
    if (data) {
      const myInterval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
      if (countdown === 0) {
        clearInterval(myInterval);
        history.push(redirectTo);
      }
    }

    return () => {};
  }, [data, countdown, values.email]);

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

    setErrors({});
    return true;
  };

  const handleSubmit = async (cb, redirectTo) => {
    if (!validateForm()) return;
    await sendRequest(cb, values);
    setRedirectTo(redirectTo);
  };

  return {
    values,
    errors,
    countdown,
    handleBlur,
    handleChange,
    handleSubmit,
    sendRequest,
    loading,
    data,
    error,
    Spinner,
  };
}
