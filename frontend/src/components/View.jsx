import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack } from 'react-icons/md';
import axios from "axios";

export default function View() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:7000/users/?id=${id}`)
    .then((res)=> setUserData(res.data))
    .catch((err)=> console.log(err.message))
  }, [])

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto border border-secondary rounded">
          <h1 className="text-center">User Data</h1>
          <hr />
          <div className="row">
          <div className="col-md-7">
          <p><span className="fw-bold">ID:</span> {userData._id}</p>
          <p><span className="fw-bold">Name:</span> {userData.name}</p>
          <p><span className="fw-bold">Email:</span> {userData.email}</p>
          <p><span className="fw-bold">Mobile:</span> {userData.mobile}</p>
          <p><span className="fw-bold">City:</span> {userData.city}</p>
          </div>
          <div className="col-md-5">
            <img src={`http://localhost:7000/uploads/${userData.image}`} alt="user-image" className="w-100" height='200' />
            {console.log(userData, 34)}
          </div>
          </div>
          <hr />
          <div className="d-flex justify-content-center align-items-center">
          <button className="btn btn-dark mb-3" onClick={() => navigate(`/`)}><MdArrowBack /> Back to Home</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
