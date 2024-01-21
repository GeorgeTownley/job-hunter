"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

type Application = {
  id: number;
  employer: string;
  date_applied: string;
  platform: string;
  progress: string;
  work_type: string;
  pay: number;
};

export default function HomePage() {
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

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [applications, setApplications] = useState<Application[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);

  // Call this function when the Edit button is clicked
  const handleEdit = (application: Application) => {
    setEditingId(application.id);
    setEditableData(application); // Load the current application data for editing
  };

  // This handleChange is for when you're editing an application
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableData({ ...editableData, [e.target.name]: e.target.value });
  };

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

      // Clear the form by resetting formData
      setFormData({
        employer: "",
        date_applied: "",
        platform: "",
        progress: "",
        work_type: "",
        pay: "",
      });

      // Fetch the updated list of applications
      fetchData();
    } catch (error) {
      // Handle or log the error
      console.error("Error submitting form:", error);
    }
  };

  const handleSave = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/applications/${id}`, {
        method: "PUT",
        body: JSON.stringify(editableData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the applications state to reflect the changes
      const updatedApplications = applications.map((app) =>
        app.id === id ? { ...editableData, id: id } : app
      );
      setApplications(updatedApplications);

      // Reset editing state
      setEditingId(null);
    } catch (error) {
      console.error("Error updating application:", error);
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

  const handleConfirmDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/applications/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the deleted item from the state
      setApplications(applications.filter((app) => app.id !== id));
      setDeletingId(null); // Reset the deletingId state
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <form
          onSubmit={handleSubmit}
          className="w-4/5 mx-auto my-8 bg-gradient-to-b from-green-600 to-green-800 p-4 rounded-md"
        >
          <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
            <input
              type="text"
              name="employer"
              value={formData.employer}
              onChange={handleChange}
              placeholder="Employer"
              className="px-4 py-2 border rounded-md flex-grow"
            />
            <input
              type="date"
              name="date_applied"
              value={formData.date_applied}
              onChange={handleChange}
              placeholder="Date Applied"
              className="px-4 py-2 border rounded-md flex-grow"
            />
            <input
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              placeholder="Platform"
              className="px-4 py-2 border rounded-md flex-grow"
            />
            <input
              type="text"
              name="progress"
              value={formData.progress}
              onChange={handleChange}
              placeholder="Progress"
              className="px-4 py-2 border rounded-md flex-grow"
            />
            <input
              type="text"
              name="work_type"
              value={formData.work_type}
              onChange={handleChange}
              placeholder="Work type"
              className="px-4 py-2 border rounded-md flex-grow"
            />
            <input
              type="number"
              name="pay"
              value={formData.pay}
              onChange={handleChange}
              placeholder="Pay"
              className="px-4 py-2 border rounded-md flex-grow"
            />

            <button
              type="submit"
              className="px-4 py-2 bg-transparent hover:bg-green-800/50 text-white rounded-md border-2 border-white focus:outline-1  focus:ring-2 focus:ring-offset-2 flex-grow"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="w-4/5 overflow-x-auto sm:overflow-x-visible  mx-auto">
          <table className="divide-y divide-gray-200 shadow-sm table-fixed sm:min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employer
                </th>
                <th className="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Applied
                </th>
                <th className="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Work Type
                </th>
                <th className="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pay
                </th>
                <th className="px-6 py-3 text-middle text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id}>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                    {editingId === application.id ? (
                      <input
                        className="text-center"
                        type="text"
                        name="employer"
                        value={editableData.employer}
                        onChange={handleEditChange}
                      />
                    ) : (
                      application.employer
                    )}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                    {editingId === application.id ? (
                      <input
                        className="text-center"
                        type="date"
                        name="date_applied"
                        value={editableData.date_applied}
                        onChange={handleEditChange}
                        onBlur={handleEditChange}
                      />
                    ) : (
                      application.date_applied
                    )}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                    {editingId === application.id ? (
                      <input
                        className="text-center"
                        type="text"
                        name="platform"
                        value={editableData.platform}
                        onChange={handleEditChange}
                      />
                    ) : (
                      application.platform
                    )}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                    {editingId === application.id ? (
                      <input
                        className="text-center"
                        type="text"
                        name="progress"
                        value={editableData.progress}
                        onChange={handleEditChange}
                      />
                    ) : (
                      application.progress
                    )}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                    {editingId === application.id ? (
                      <input
                        className="text-center"
                        type="text"
                        name="work_type"
                        value={editableData.work_type}
                        onChange={handleEditChange}
                      />
                    ) : (
                      application.work_type
                    )}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                    {editingId === application.id ? (
                      <input
                        className="text-center"
                        type="number"
                        name="pay"
                        value={editableData.pay}
                        onChange={handleEditChange}
                      />
                    ) : (
                      new Intl.NumberFormat("en-US").format(application.pay)
                    )}
                  </td>

                  <td>
                    <div className="flex px-1 py-2 justify-center items-center space-x-3">
                      {editingId === application.id ? (
                        // Render the Save button only if we're in edit mode for this row
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                          onClick={() => handleSave(application.id)}
                        >
                          Save
                        </button>
                      ) : (
                        // Otherwise, render the Edit button which is always visible
                        <button
                          className="px-4 py-2  bg-yellow-500 text-white rounded-md hover:bg-yellow-700"
                          onClick={() => handleEdit(application)}
                        >
                          Edit
                        </button>
                      )}
                      {deletingId === application.id ? (
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                          onClick={() => handleConfirmDelete(application.id)}
                        >
                          Confirm
                        </button>
                      ) : (
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                          onClick={() => setDeletingId(application.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
