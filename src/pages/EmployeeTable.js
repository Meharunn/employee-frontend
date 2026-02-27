import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:5000/all");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = async () => {
    if (search.trim() === "") {
      fetchEmployees();
      return;
    }

    const res = await axios.get(`http://localhost:5000/search/${search}`);
    setEmployees(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/delete/${id}`);
    fetchEmployees();
  };

  const handleUpdate = async () => {
    await axios.put(
      `http://localhost:5000/update/${editingEmployee._id}`,
      {
        ...editingEmployee,
        tags: editingEmployee.tags.split(",")
      }
    );

    alert("Updated Successfully!");
    setEditingEmployee(null);
    fetchEmployees();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Table</h2>

      <div>
        <input
          placeholder="Search by Name / ID / Company / Owner"
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={fetchEmployees}>Reset</button>
      </div>

      <br/>

      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Company</th>
            <th>Owner</th>
            <th>No of Employees</th>
            <th>Description</th>
            <th>Tags</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.empname}</td>
              <td>{emp.empid}</td>
              <td>{emp.companyName}</td>
              <td>{emp.companyOwner}</td>
              <td>{emp.noOfEmployees}</td>
              <td>{emp.description}</td>
              <td>{emp.tags?.join(", ")}</td>
              <td>
                <button onClick={() =>
                  setEditingEmployee({
                    ...emp,
                    tags: emp.tags?.join(", ")
                  })
                }>
                  Update
                </button>

                <button onClick={() => handleDelete(emp._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* POPUP */}
      {editingEmployee && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Update Employee</h3>

            <input
              value={editingEmployee.empname}
              onChange={e =>
                setEditingEmployee({ ...editingEmployee, empname: e.target.value })
              }
            />

            <input
              value={editingEmployee.empid}
              onChange={e =>
                setEditingEmployee({ ...editingEmployee, empid: e.target.value })
              }
            />

            <input
              value={editingEmployee.companyName}
              onChange={e =>
                setEditingEmployee({ ...editingEmployee, companyName: e.target.value })
              }
            />

            <input
              value={editingEmployee.companyOwner}
              onChange={e =>
                setEditingEmployee({ ...editingEmployee, companyOwner: e.target.value })
              }
            />

            <input
              value={editingEmployee.noOfEmployees}
              onChange={e =>
                setEditingEmployee({ ...editingEmployee, noOfEmployees: e.target.value })
              }
            />

            <input
              value={editingEmployee.description}
              onChange={e =>
                setEditingEmployee({ ...editingEmployee, description: e.target.value })
              }
            />

            <input
              value={editingEmployee.tags}
              onChange={e =>
                setEditingEmployee({ ...editingEmployee, tags: e.target.value })
              }
            />

            <div className="modal-buttons">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingEmployee(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeTable;