import React, { useEffect, useState } from "react";

export default function AdminHospitalsPage() {
  const [list, setList] = useState([]);

  const [editId, setEditId] = useState(null); // ⭐ Track Editing Hospital

  const emptyForm = {
    name: "",
    slug: "",
    location: "",
    rating: "",
    beds: "",
    specialties: "",
    description: "",
    accreditations: "",
    image: "",
    isTopHospital: false,
  };

  const [form, setForm] = useState(emptyForm);

  const API_URL = import.meta.env.VITE_API_URL;

  const load = async () => {
    const res = await fetch(`${API_URL}/admin/hospitals`);
    const data = await res.json();
    setList(data);
  };

  useEffect(() => {
    load();
  }, []);

  // ⭐ RESET FORM
  const resetForm = () => {
    setForm(emptyForm);
    setEditId(null);
  };

  // ⭐ EDIT HOSPITAL (LOAD DATA INTO FORM)
  const editHospital = (h) => {
    setEditId(h._id);
    setForm({
      name: h.name,
      slug: h.slug,
      location: h.location,
      rating: h.rating,
      beds: h.beds,
      specialties: h.specialties?.join(", ") || "",
      description: h.description,
      accreditations: h.accreditations?.join(", ") || "",
      image: h.image || "",
      isTopHospital: h.isTopHospital || false,
    });
  };

  // ⭐ ADD OR UPDATE
  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    Object.keys(form).forEach((key) => {
      if (key === "isTopHospital") {
        fd.append("isTopHospital", form.isTopHospital ? "true" : "false");
      } else {
        fd.append(key, form[key]);
      }
    });

    const url = editId
      ? `${API_URL}/admin/hospitals/${editId}`
      : `${API_URL}/admin/hospitals`;

    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      body: fd,
    });

    if (res.ok) {
      alert(editId ? "Hospital updated" : "Hospital added");
      resetForm();
      load();
    } else {
      alert("Error saving hospital");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete hospital?")) return;

    await fetch(`${API_URL}/admin/hospitals/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">
        Hospitals {editId && "(Editing Mode)"}
      </h2>

      {/* FORM */}
      <form
        onSubmit={submit}
        className="grid grid-cols-2 gap-4 mt-6 p-4 border rounded"
      >
        <input
          placeholder="Name"
          className="border p-2"
          value={form.name}
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Slug"
          className="border p-2"
          value={form.slug}
          required
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        <input
          placeholder="Location"
          className="border p-2"
          value={form.location}
          required
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          type="number"
          placeholder="Rating (0-5)"
          className="border p-2"
          value={form.rating}
          required
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        />

        <input
          type="number"
          placeholder="Beds"
          className="border p-2"
          value={form.beds}
          required
          onChange={(e) => setForm({ ...form, beds: e.target.value })}
        />

        <input
          placeholder="Specialties (comma separated)"
          className="border p-2"
          value={form.specialties}
          onChange={(e) => setForm({ ...form, specialties: e.target.value })}
        />

        <input
          placeholder="Accreditations (comma separated)"
          className="border p-2"
          value={form.accreditations}
          onChange={(e) => setForm({ ...form, accreditations: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="border p-2 col-span-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Image URL"
          className="border p-2"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        {/* ⭐ CHECKBOX */}
        <label className="flex items-center gap-2 col-span-2">
          <input
            type="checkbox"
            checked={form.isTopHospital}
            onChange={(e) =>
              setForm({ ...form, isTopHospital: e.target.checked })
            }
          />
          Mark as Top Hospital
        </label>

        <button className="bg-blue-600 text-white py-2 rounded col-span-2">
          {editId ? "Update Hospital" : "Add Hospital"}
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
            <th>Location</th>
            <th>Rating</th>
            <th>Top?</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {list.map((h) => (
            <tr key={h._id} className="border">
              <td>{h.name}</td>
              <td>{h.location}</td>
              <td>{h.rating}</td>
              <td>{h.isTopHospital ? "✔" : "—"}</td>

              <td>
                <button
                  className="bg-green-600 text-white px-3 py-1"
                  onClick={() => editHospital(h)}
                >
                  Edit
                </button>
              </td>

              <td>
                <button
                  className="bg-red-600 text-white px-3 py-1"
                  onClick={() => remove(h._id)}
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
