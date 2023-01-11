import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import Toast from "./Toast";

export default function Edit() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:7000/users/?id=${id}`)
    .then((res)=>{setFormData(res.data); console.log(res.data)})
    .catch((err)=>{console.log(err.message)})
  }, [])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormData= new FormData();
    finalFormData.append('name', formData.name)
    finalFormData.append('email', formData.email)
    finalFormData.append('city', formData.city)
    finalFormData.append('mobile', formData.mobile)
    finalFormData.append('image', formData.image)
    editUser(finalFormData);
    // console.log(finalFormData)
    navigate(`/`);
  };

  const editUser = async (data) => {
    const res = await axios.put(`http://localhost:7000/user/${id}`, data);
    if (res.status === 200) {
      alert(res.data);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="text-center my-3">Edit</h1>
          {/* Form Code Start */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Your Name"
                onChange={handleInputChange}
                defaultValue={formData.name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Your Email"
                onChange={handleInputChange}
                defaultValue={formData.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile Number
              </label>
              <input
                type="number"
                className="form-control"
                name="mobile"
                placeholder="Your Mobile Number"
                onChange={handleInputChange}
                defaultValue={formData.mobile}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                name="city"
                placeholder="Your City"
                onChange={handleInputChange}
                defaultValue={formData.city}
              />
            </div>
            <div className="mb-3">
            <label htmlFor="image" className="form-label">Select Image</label>
              <input type="file" className="form-control" name="image" onChange={handleImage} defaultValue={formData.image}/>
            </div>
            <button type="submit" className="btn btn-dark">Update</button>
          </form>
          {/* Form Code End */}
        </div>
      </div>
    </div>
  )
}
