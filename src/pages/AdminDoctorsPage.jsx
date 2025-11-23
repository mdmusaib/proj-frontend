import React, { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [list, setList] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [treatments, setTreatments] = useState([]);

  const [editId, setEditId] = useState(null); // ⭐ TRACK CURRENT EDITING DOCTOR

  const [form, setForm] = useState({
    name: "",
    slug: "",
    specialty: "",
    experience: "",
    position: "",
    degree: "",
    about: "",
    hospital: "",
    treatments: [],
    isTopDoctor: false,
    image: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const loadDoctors = async () => {
    const res = await fetch(`${API_URL}/admin/doctors`);
    const data = await res.json();
    setList(data);
  };

  const loadHospitals = async () => {
    const res = await fetch(`${API_URL}/admin/hospitals`);
    const data = await res.json();
    setHospitals(data);
  };

  const loadTreatments = async () => {
    const res = await fetch(`${API_URL}/admin/treatments`);
    const data = await res.json();
    setTreatments(data);
  };

  useEffect(() => {
    loadDoctors();
    loadHospitals();
    loadTreatments();
  }, []);

  // ⭐ RESET FORM FUNCTION
  const resetForm = () => {
    setForm({
      name: "",
      slug: "",
      specialty: "",
      experience: "",
      position: "",
      degree: "",
      about: "",
      hospital: "",
      treatments: [],
      isTopDoctor: false,
      image: "",
    });
    setEditId(null);
  };

  // ⭐ LOAD DATA INTO FORM FOR EDITING
  const editDoctor = (doctor) => {
    setEditId(doctor._id);
    setForm({
      name: doctor.name,
      slug: doctor.slug,
      specialty: doctor.specialty,
      experience: doctor.experience,
      position: doctor.position,
      degree: doctor.degree,
      about: doctor.about,
      hospital: doctor.hospital?._id || "",
      treatments: doctor.treatments?.map((t) => t._id) || [],
      isTopDoctor: doctor.isTopDoctor,
      image: doctor.image || "",
    });
  };

  // ⭐ SUBMIT (ADD OR UPDATE)
  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    Object.keys(form).forEach((key) => {
      if (key === "treatments") {
        form.treatments.forEach((t) => fd.append("treatments[]", t));
      } else if (key === "isTopDoctor") {
        fd.append("isTopDoctor", form.isTopDoctor ? "true" : "false");
      } else {
        fd.append(key, form[key]);
      }
    });

    const url = editId
      ? `${API_URL}/admin/doctors/${editId}`
      : `${API_URL}/admin/doctors`;

    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, { method, body: fd });

    if (res.ok) {
      alert(editId ? "Doctor updated" : "Doctor added");
      resetForm();
      loadDoctors();
    } else {
      alert("Error saving doctor");
    }
  };

  // DELETE DOCTOR
  const remove = async (id) => {
    if (!confirm("Delete doctor?")) return;

    await fetch(`${API_URL}/admin/doctors/${id}`, { method: "DELETE" });
    loadDoctors();
  };

  const toggleTreatment = (id) => {
    setForm((prev) => {
      const exists = prev.treatments.includes(id);
      return {
        ...prev,
        treatments: exists
          ? prev.treatments.filter((t) => t !== id)
          : [...prev.treatments, id],
      };
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">
        Doctors {editId && "(Editing Mode)"}
      </h2>

      <form
        onSubmit={submit}
        className="grid grid-cols-2 gap-4 mt-6 p-4 border rounded"
      >
        <input
          placeholder="Name"
          className="border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Slug"
          className="border p-2"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        <input
          placeholder="Specialty"
          className="border p-2"
          value={form.specialty}
          onChange={(e) => setForm({ ...form, specialty: e.target.value })}
        />

        <input
          placeholder="Experience"
          className="border p-2"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
        />

        <input
          placeholder="Position"
          className="border p-2"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        />

        <input
          placeholder="Degree"
          className="border p-2"
          value={form.degree}
          onChange={(e) => setForm({ ...form, degree: e.target.value })}
        />

        <textarea
          placeholder="About"
          className="border p-2 col-span-2"
          value={form.about}
          onChange={(e) => setForm({ ...form, about: e.target.value })}
        />

        <select
          className="border p-2"
          value={form.hospital}
          onChange={(e) => setForm({ ...form, hospital: e.target.value })}
        >
          <option value="">Select Hospital</option>
          {hospitals.map((h) => (
            <option key={h._id} value={h._id}>
              {h.name}
            </option>
          ))}
        </select>

        <div className="col-span-2 border p-3 rounded">
          <p className="font-semibold mb-2">Select Treatments:</p>

          <div className="grid grid-cols-3 gap-2">
            {treatments.map((t) => (
              <label key={t._id} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={form.treatments.includes(t._id)}
                  onChange={() => toggleTreatment(t._id)}
                />
                {t.slug}
              </label>
            ))}
          </div>
        </div>

        <input
          placeholder="Image URL"
          className="border p-2"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <label className="flex items-center gap-2 col-span-2">
          <input
            type="checkbox"
            checked={form.isTopDoctor}
            onChange={(e) =>
              setForm({ ...form, isTopDoctor: e.target.checked })
            }
          />
          Mark as Top Doctor
        </label>

        <button className="bg-blue-600 text-white py-2 rounded col-span-2">
          {editId ? "Update Doctor" : "Add Doctor"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white py-2 rounded col-span-2"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* TABLE */}
      <table className="w-full mt-8 border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Specialty</th>
            <th>Hospital</th>
            <th>Top?</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {list.map((d) => (
            <tr key={d._id} className="border">
              <td>{d.name}</td>
              <td>{d.specialty}</td>
              <td>{d.hospital?.name}</td>
              <td>{d.isTopDoctor ? "✔" : "—"}</td>

              <td className="flex gap-2">
                <button
                  className="bg-green-600 text-white px-3 py-1"
                  onClick={() => editDoctor(d)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 text-white px-3 py-1"
                  onClick={() => remove(d._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
