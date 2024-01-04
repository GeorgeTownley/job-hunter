"use client";
import React, { useState, useEffect } from "react";

type Application = {
  id: number;
  employer: string;
  dateApplied: string;
  platform: string;
  progress: string;
  work_type: string;
  pay: string;
};

export default function Home() {
  const [formData, setFormData] = useState({
    employer: "",
    dateApplied: "",
    platform: "",
    progress: "",
    work_type: "",
    pay: "",
  });
  const [applications, setApplications] = useState<Application[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3001/applications", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      // Optionally, fetch the updated data here
    } catch (error: unknown) {
      // Handle or log the error
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/applications");
        const data = await response.json();
        setApplications(data);
      } catch (error: unknown) {
        // Handle or log the error
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8">
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
            name="dateApplied"
            value={formData.dateApplied}
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
                {application.employer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {application.dateApplied}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {application.platform}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {application.progress}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {application.work_type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {application.pay}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
