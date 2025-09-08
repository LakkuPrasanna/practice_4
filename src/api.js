const API_BASE = process.env.REACT_APP_API_BASE || ""; // use CRA proxy or env

export async function fetchStudents() {
  const res = await fetch(`${API_BASE}/api/students/`);
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
}

export async function addStudent(student) {
  // coerce marks to number if provided
  const payload = {
    ...student,
    marks:
      student.marks === "" || student.marks === null || student.marks === undefined
        ? null
        : Number(student.marks),
  };

  const res = await fetch(`${API_BASE}/api/students/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let message = "Failed to add student";
    try {
      const data = await res.json();
      if (data && data.error) message = data.error;
    } catch (_) {
      try {
        const text = await res.text();
        if (text) message = text;
      } catch (_) {}
    }
    throw new Error(message);
  }
  return res.json();
}

export async function deleteStudent(roll_no) {
  const res = await fetch(`${API_BASE}/api/students/${encodeURIComponent(roll_no)}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete student");
  return true;
}


