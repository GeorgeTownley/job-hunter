"use client";
import React, { useState, useEffect } from "react";

type Application = {
  id: number;
  employer: string;
  date_applied: string;
  platform: string;
  progress: string;
  work_type: string;
  pay: number;
};

export default function Home() {
  const [formData, setFormData] = useState({
    employer: "",
    date_applied: "",
    platform: "",
    progress: "",
    work_type: "",
    pay: "",
  });

  const [editableData, setEditableData] = useState<Application>({
    id: 0,
    employer: "",
    date_applied: "",
    platform: "",
    progress: "",
    work_type: "",
    pay: 0,
  });

  const [applications, setApplications] = useState<Application[]>([]);

  const [formKey, setFormKey] = useState(Date.now());

  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/applications", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        // If the server response is not OK, throw an error
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Assuming the response is ok, clear the form by resetting formData and formKey
      setFormData({
        employer: "",
        date_applied: "",
        platform: "",
        progress: "",
        work_type: "",
        pay: "",
      });

      // Change the key to force re-render of the form
      setFormKey(Date.now());

      // Here you can also provide feedback to the user or refresh the data displayed
      // ...
    } catch (error: unknown) {
      // Handle or log the error
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/applications/all");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setApplications(result.data); // Access the 'data' key of the JSON object
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <form
        key={formKey}
        onSubmit={handleSubmit}
        className="max-w-md mx-auto my-8"
      >
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="employer"
            value={formData.employer}
            onChange={handleChange}
            placeholder="Employer"
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="date"
            name="date_applied"
            value={formData.date_applied}
            onChange={handleChange}
            placeholder="Date Applied"
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            placeholder="Platform"
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="progress"
            value={formData.progress}
            onChange={handleChange}
            placeholder="Progress"
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="work_type"
            value={formData.work_type}
            onChange={handleChange}
            placeholder="Work type"
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="pay"
            value={formData.pay}
            onChange={handleChange}
            placeholder="Pay"
            className="px-4 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2  mt-4   bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      <table className="min-w-full divide-y divide-gray-200 shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Applied
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Platform
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Progress
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Work Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pay
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((application) => (
            <tr key={application.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {editingId === application.id ? (
                  <input
                    type="text"
                    name="employer"
                    value={editableData.employer}
                    onChange={handleChange}
                  />
                ) : (
                  application.employer
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {editingId === application.id ? (
                  <input
                    type="date"
                    name="Date Applied"
                    value={editableData.date_applied}
                    onChange={handleChange}
                  />
                ) : (
                  application.date_applied
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {editingId === application.id ? (
                  <input
                    type="text"
                    name="platform"
                    value={editableData.platform}
                    onChange={handleChange}
                  />
                ) : (
                  application.platform
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {editingId === application.id ? (
                  <input
                    type="text"
                    name="progress"
                    value={editableData.progress}
                    onChange={handleChange}
                  />
                ) : (
                  application.progress
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {editingId === application.id ? (
                  <input
                    type="text"
                    name="work_type"
                    value={editableData.work_type}
                    onChange={handleChange}
                  />
                ) : (
                  application.work_type
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {editingId === application.id ? (
                  <input
                    type="text"
                    name="pay"
                    value={editableData.pay}
                    onChange={handleChange}
                  />
                ) : (
                  new Intl.NumberFormat("en-US").format(application.pay)
                )}
              </td>
              <td>
                <button onClick={() => setEditingId(application.id)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
