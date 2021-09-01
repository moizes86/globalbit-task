import React, { useEffect } from "react";
import { verify } from "../DAL/httpServices";
import useForm from "../useForm";
import InputField from "./InputField";
import FormBottom from "./FormBottom";

export default function Verify() {
  const { values, countdown, handleSubmit, handleChange, loading, data, error } = useForm();

  useEffect(() => {
    values.email = sessionStorage.getItem("email");
  }, []);

  useEffect(()=>{
    if (data && data.accessToken) sessionStorage.setItem("token", 'Bearer ' + data.accessToken);
  },[data])

  const redirectTo = "display-users";

  const onSubmitVerify = async (e) => {
    e.preventDefault();
    await handleSubmit(verify, redirectTo);
  };

  return (
    <div className="container col-sm-7 col-md-6 col-lg-5 col-xl-4 my-5">
      <form onSubmit={onSubmitVerify}>
        <InputField
          type="number"
          label="Code:"
          placeholder="Enter code..."
          name="code"
          id="code"
          value={values.code}
          handleChange={handleChange}
        />

        <FormBottom loading={loading} data={data} countdown={countdown} error={error} btnText="Verify" />
      </form>
    </div>
  );
}
