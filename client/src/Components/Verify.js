import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { verify } from "../DAL/httpServices";
import useFetch from "../useFetch";
import InputField from "./InputField";
import CheckCircleSuccess from "./CheckCircleSuccess";

export default function Verify() {
  const [code, setCode] = useState(null);
  const [countdown, setCountdown] = useState(2);

  const history = useHistory();
  const { email } = useParams();
  const { sendRequest, loading, data, error, Spinner } = useFetch();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest(verify, { email, code });
  };

  useEffect(() => {
    if (data) {
      const myInterval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
      if (countdown === 0) {
        clearInterval(myInterval);
        history.push(`/display-users`);
      }
    }
    return () => {};
  }, [data, countdown, history, email]);

  return (
    <div className="container col-sm-7 col-md-6 col-lg-5 col-xl-4 my-5">
      <form onSubmit={handleSubmit}>
        <InputField
          type="number"
          label="Code:"
          placeholder="Enter code..."
          name="code"
          id="code"
          value={code}
          handleChange={({ target: { value } }) => setCode(value)}
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
                Verify
              </button>
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
