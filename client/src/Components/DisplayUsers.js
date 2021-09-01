import React, { useEffect } from "react";
import useFetch from "../useFetch";
import { getUsersToDisplay } from "../DAL/httpServices";
import { Link } from "react-router-dom";

export default function DisplayUsers() {
  const { sendRequest, loading, data, error, Spinner } = useFetch();

  useEffect(() => {
    (async () => {
      await sendRequest(getUsersToDisplay);
    })();
  }, []);

  return (
    <div className="container col-sm-10 col-md-8 col-lg-7 col-xl-4 my-5">
      {loading ? (
        <Spinner />
      ) : data ? (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {data.payload.map((user, i) => (
                <tr key={user.email}>
                  <th scope="row">{i + 1}</th>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 mr-md-5 d-flex justify-content-center">
            <Link to="register" className="mr-3">
              Register
            </Link>
            <Link to="login">Login</Link>
          </div>
        </>
      ) : (
        <>
          {error} - please <Link to="/login"> login </Link> and verify your account
        </>
      )}
    </div>
  );
}
