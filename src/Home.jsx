import axios from "axios"                             //messenger between frontend & backend
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Home() {
  const [data, setData] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [])

  const handleDelete= (id) => {
    const confirm = window.confirm("Would you like to Delete?");
    if(confirm) {
      axios.delete('http://localhost:3001/users/' +id)
      .then(res => {
        location.reload();
      })
.catch(err => console.log(err));
    }
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>List of Users</h2>
        <Link to ="/create" className="btn btn-success">Add +</Link>
      </div>

      <div className="card shadow">
        <div className="card-body">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th style={{ width: "180px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map(d => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                  <td>{d.phone}</td>
                  <td>
                  <Link to={`/read/${d.id}`} className="btn btn-info btn-sm me-2">Read</Link>
                    <Link to={`/update/${d.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                    <button onClick= {e => handleDelete(d.id)} className= 'btn btn-danger btn-sm'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
  
  }


export default Home
