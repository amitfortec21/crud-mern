import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaUserEdit } from 'react-icons/fa';
import { MdPersonAdd, MdDeleteForever } from 'react-icons/md';

export default function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // get data code start
  const getUsers = () => {
    axios.get(`http://localhost:7000/users`)
    .then((res) => {
      if(res.status === 200){
        setData(res.data);
      }
    })
    .catch((err) => console.log(err.message))
  };
  useEffect(() => {
    getUsers();
  }, []);
  // get data code end

  const viewUser = (id) => {
    navigate(`/view/${id}`);
  };

  const editUser = (id) => {
    navigate(`/edit/${id}`);
  };
  
  const deleteUser = async (id) => {
    if(window.confirm("Are you sure want to delete this contact?")){
      const res = await axios.delete(`http://localhost:7000/user/${id}`);
      if(res.status === 200){
        alert(res.data);
        getUsers();
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="my-3">CRUD APP</h1>
              <button
                className="btn btn-primary mx-1"
                onClick={() => navigate(`/add`)}
              >
                <MdPersonAdd />
              </button>
            </div>
            {/* Table Code Start */}
            <table className="table">
              <thead className="table-primary">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Profile Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mobile No.</th>
                  <th scope="col">City</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, id) => {
                  return (
                    <tr key={id}>
                      <th scope="row">{item._id}</th>
                      <td><img src={`http://localhost:7000/uploads/${item.image}`} alt="user-image" className="w-50" height='50' /></td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>{item.city}</td>
                      <td>
                        <button
                          className="btn btn-primary mx-1"
                          onClick={() => viewUser(item._id)}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="btn btn-warning mx-1"
                          onClick={() => editUser(item._id)}
                        >
                          <FaUserEdit />
                        </button>
                        <button
                          className="btn btn-danger mx-1"
                          onClick={() => deleteUser(item._id)}
                        >
                          <MdDeleteForever />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* Table Code End */}
          </div>
        </div>
      </div>
    </>
  );
}
