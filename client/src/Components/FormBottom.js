import React from "react";
import { Link } from "react-router-dom";
import CheckCircleSuccess from "./CheckCircleSuccess";
import Spinner from "./Spinner";

export default function FormBottom({ loading, data, countdown, error, btnText, link }) {
  return (
    <div>
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
              {btnText}
            </button>

            {link && <Link to={`/${link}`}>{link[0].toUpperCase() + link.slice(1)}</Link>}
          </div>

          <div className="text-danger h5">
            <p>{error}</p>
          </div>
        </>
      )}
    </div>
  );
}
