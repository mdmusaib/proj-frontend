import React, { useEffect, useState } from "react";

export default function AdminTreatmentsPage() {
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    treatmentName: "",
    category: "",
    description: "",
    costRange: "",
    treatmentNameAr: "",
    categoryAr: "",
    descriptionAr: "",
    costTable: [],
    hospitals: "",
    doctors: ""
  });

  const [costRow, setCostRow] = useState({
    name: "",
    description: "",
    costFrom: "",
    costTo: "",
    currency: "USD"
  });

  const API_URL = import.meta.env.VITE_API_URL;

  // Load all treatments
  const load = async () => {
    const res = await fetch(`${API_URL}/admin/treatments`);
    const data = await res.json();
    setList(data);
  };

  useEffect(() => {
    load();
  }, []);

  // -------------------------------
  // LOAD SELECTED ITEM FOR EDITING
  // -------------------------------
  const edit = async (id) => {
    const res = await fetch(`${API_URL}/admin/treatments/${id}`);
    const data = await res.json();

    setEditingId(id);

    setForm({
      treatmentName: data.treatmentName || "",
      category: data.category || "",
      description: data.description || "",
      costRange: data.costRange || "",
      treatmentNameAr: data.treatmentNameAr || "",
      categoryAr: data.categoryAr || "",
      descriptionAr: data.descriptionAr || "",
      costTable: data.costTable || [],
      hospitals: (data.hospitals || []).map((h) => h._id).join(", "),
      doctors: (data.doctors || []).map((d) => d._id).join(", ")
    });
  };

  // -------------------------------
  // COST TABLE HANDLERS
  // -------------------------------
  const saveCostRow = () => {
    if (!costRow.name.trim()) return alert("Cost item name is required.");

    if (costRow._editIndex !== undefined) {
      const updated = [...form.costTable];
      updated[costRow._editIndex] = { ...costRow };
      setForm({ ...form, costTable: updated });
      setCostRow({ name: "", description: "", costFrom: "", costTo: "", currency: "USD" });
      return;
    }

    setForm({ ...form, costTable: [...form.costTable, costRow] });
    setCostRow({ name: "", description: "", costFrom: "", costTo: "", currency: "USD" });
  };

  const deleteCostRow = (index) => {
    setForm({ ...form, costTable: form.costTable.filter((_, i) => i !== index) });
  };

  // -------------------------------
  // SUBMIT FORM (ADD OR UPDATE)
  // -------------------------------
  const submit = async (e) => {
    e.preventDefault();

    if (!form.treatmentName.trim()) return alert("Name required");

    const payload = {
      ...form,
      hospitals: form.hospitals.split(",").map((v) => v.trim()).filter(Boolean),
      doctors: form.doctors.split(",").map((v) => v.trim()).filter(Boolean),
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API_URL}/admin/treatments/${editingId}`
      : `${API_URL}/admin/treatments`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    alert(editingId ? "Updated successfully!" : "Added successfully!");

    load();
    setEditingId(null);

    setForm({
      treatmentName: "",
      category: "",
      description: "",
      costRange: "",
      treatmentNameAr: "",
      categoryAr: "",
      descriptionAr: "",
      costTable: [],
      hospitals: "",
      doctors: ""
    });
  };

  // -------------------------------
  // DELETE TREATMENT
  // -------------------------------
  const remove = async (id) => {
    await fetch(`${API_URL}/admin/treatments/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Treatments</h2>

      {/* FORM */}
      <form onSubmit={submit} className="grid grid-cols-2 gap-4 mt-6 p-4 border rounded">

        <input
          placeholder="Treatment Name *"
          className="border p-2"
          value={form.treatmentName}
          onChange={(e) => setForm({ ...form, treatmentName: e.target.value })}
        />

        <input
          placeholder="Category"
          className="border p-2"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="border p-2 col-span-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* COST TABLE */}
        <div className="col-span-2 border p-4 rounded">
          <h3 className="font-bold mb-2">Cost Table</h3>

          <div className="grid grid-cols-6 gap-2 mb-4">
            <input
              placeholder="Name"
              className="border p-2"
              value={costRow.name}
              onChange={(e) => setCostRow({ ...costRow, name: e.target.value })}
            />

            <input
              placeholder="Description"
              className="border p-2"
              value={costRow.description}
              onChange={(e) => setCostRow({ ...costRow, description: e.target.value })}
            />

            <input
              placeholder="From"
              className="border p-2"
              value={costRow.costFrom}
              onChange={(e) => setCostRow({ ...costRow, costFrom: e.target.value })}
            />

            <input
              placeholder="To"
              className="border p-2"
              value={costRow.costTo}
              onChange={(e) => setCostRow({ ...costRow, costTo: e.target.value })}
            />

            <select
              className="border p-2"
              value={costRow.currency}
              onChange={(e) => setCostRow({ ...costRow, currency: e.target.value })}
            >
              <option>USD</option>
              <option>INR</option>
              <option>AED</option>
              <option>SAR</option>
              <option>EUR</option>
            </select>

            <button type="button" className="bg-green-600 text-white rounded" onClick={saveCostRow}>
              {costRow._editIndex !== undefined ? "Update" : "Add"}
            </button>
          </div>

          <ul className="mt-3 space-y-2">
            {form.costTable.map((c, i) => (
              <li key={i} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                <div className="text-sm">
                  <b>{c.name}</b> — {c.description} | {c.costFrom} → {c.costTo} {c.currency}
                </div>

                <div className="space-x-2">
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => setCostRow({ ...c, _editIndex: i })}
                  >
                    Edit
                  </button>

                  <button
                    className="px-2 py-1 bg-red-600 text-white rounded"
                    onClick={() => deleteCostRow(i)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button className="bg-blue-600 text-white py-2 rounded col-span-2">
          {editingId ? "Update Treatment" : "Add Treatment"}
        </button>
      </form>

      {/* LIST */}
      <table className="w-full mt-8 border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {list.map((t) => (
            <tr key={t._id} className="border">
              <td>{t.treatmentName}</td>
              <td>{t.category}</td>
              <td className="space-x-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1"
                  onClick={() => edit(t._id)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 text-white px-3 py-1"
                  onClick={() => remove(t._id)}
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
