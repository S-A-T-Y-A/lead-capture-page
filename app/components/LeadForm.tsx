"use client";
import React, { useState } from "react";

export default function LeadForm() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    company: "",
    source: "Google",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // Minimal validation
    if (!form.full_name || !form.email) {
      setError("Full name and email are required.");
      return;
    }
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Submission failed.");
      } else {
        setSuccess(true);
        setForm({
          full_name: "",
          email: "",
          company: "",
          source: "Google",
          message: "",
        });
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded"
    >
      <h2 className="text-lg font-bold mb-4">Contact Us</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && (
        <div className="text-green-600 mb-2">
          Thank you for your submission!
        </div>
      )}
      <div className="mb-3">
        <label className="block mb-1" htmlFor="full_name">
          Full Name *
        </label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1" htmlFor="email">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1" htmlFor="company">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={form.company}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1" htmlFor="source">
          How did you hear about us?
        </label>
        <select
          id="source"
          name="source"
          value={form.source}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        >
          <option value="Google">Google</option>
          <option value="Referral">Referral</option>
          <option value="Social">Social</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block mb-1" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
