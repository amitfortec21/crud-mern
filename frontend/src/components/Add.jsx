import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Add() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormData = new FormData();
    finalFormData.append('name', formData.name)
    finalFormData.append('email', formData.email)
    finalFormData.append('city', formData.city)
    finalFormData.append('mobile', formData.mobile)
    finalFormData.append('image', formData.image)
    addUser(finalFormData);
    navigate(`/`);
  };

  const addUser = async (data) => {
    const res = await axios.post(`http://localhost:7000/user/`, data)
      .then(res => { console.log(res.data) })
      .catch(err => { console.log(err.message) });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="text-center my-3">Add</h1>
          {/* Form Code Start */}
          <form action="/user" onSubmit={handleSubmit} method="post" encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name="name" placeholder="Your Name" onChange={handleInputChange} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" name="email" placeholder="Your Email" onChange={handleInputChange} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <input type="number" className="form-control" name="mobile" placeholder="Your Mobile Number" onChange={handleInputChange} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" className="form-control" name="city" placeholder="Your City" onChange={handleInputChange} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Select Image</label>
              <input type="file" className="form-control" name="image" onChange={handleImage} required />
            </div>
            <button type="submit" className="btn btn-dark">Submit</button>
          </form>
          {/* Form Code End */}
        </div>
      </div>
    </div>
  );
}
