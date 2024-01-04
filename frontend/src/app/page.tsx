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
      await fetch("/api/applications", {
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="employer"
          value={formData.employer}
          onChange={handleChange}
          placeholder="Employer"
        />
        <input
          type="date"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
          placeholder="Date Applied"
        />
        <input
          type="text"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          placeholder="Platform"
        />
        <input
          type="text"
          name="progress"
          value={formData.progress}
          onChange={handleChange}
          placeholder="Progress"
        />
        <input
          type="text"
          name="work_type"
          value={formData.work_type}
          onChange={handleChange}
          placeholder="Work type"
        />
        <input
          type="text"
          name="pay"
          value={formData.pay}
          onChange={handleChange}
          placeholder="Pay"
        />
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Employer</th>
            <th>Date Applied</th>
            <th>Platform</th>
            {/* Other headers */}
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.employer}</td>
              <td>{application.dateApplied}</td>
              <td>{application.platform}</td>
              {/* Other data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
