import './App.css';
import { useEffect, useState } from 'react';
import { fetchStudents, addStudent, deleteStudent } from './api';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", roll_no: "", course: "", marks: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const data = await fetchStudents();
    setStudents(data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    try {
      await addStudent(form);
      setForm({ name: "", roll_no: "", course: "", marks: "" });
      loadStudents();
    } catch (err) {
      alert(err.message || "Failed to add student");
    }
  }

  async function handleDelete(roll_no) {
    await deleteStudent(roll_no);
    loadStudents();
  }

  const filtered = search
    ? students.filter((s) => String(s.roll_no).includes(search))
    : students;

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h1>🎓 Student Records</h1>

      {/* Add Form */}
      <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Roll No"
          value={form.roll_no}
          onChange={(e) => setForm({ ...form, roll_no: e.target.value })}
          required
        />
        <input
          placeholder="Course"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Marks"
          value={form.marks}
          onChange={(e) => setForm({ ...form, marks: e.target.value })}
        />
        <div style={{ gridColumn: '1 / -1' }}>
          <button type="submit">Add</button>
        </div>
      </form>

      {/* Search */}
      <input
        placeholder="Search by Roll No"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginTop: 20, width: '100%' }}
      />

      {/* List */}
      <table border="1" style={{ marginTop: 20, width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Course</th>
            <th>Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s._id || s.roll_no}>
              <td>{s.name}</td>
              <td>{s.roll_no}</td>
              <td>{s.course}</td>
              <td>{s.marks}</td>
              <td>
                <button onClick={() => handleDelete(s.roll_no)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
