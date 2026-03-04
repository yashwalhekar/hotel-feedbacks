"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { submitFeedback } from "@/service/feedbackservice";
import API from "@/service/api";

export default function FeedbackPage() {
  const { slug } = useParams();

  const [shop, setShop] = useState(null);

  const [formData, setFormData] = useState({
    customerName: "",
    customerMobile: "",
    orderType: "DINE-IN",
    overallRating: 5,
    foodRating: 5,
    serviceRating: 5,
    ambienceRating: 5,
    comment: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchShop = async () => {
      try {
        const { data } = await API.get(`/shops/slug/${slug}`);
        setShop(data.shop);
      } catch (error) {
        console.error(error);
        setShop(null);
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [slug]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitFeedback(slug, formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (!shop) return <div className="p-10">Invalid QR Code</div>;

  if (submitted)
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-green-600">
          Thank You For Your Feedback ❤️
        </h2>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {shop.shopName} Feedback
        </h2>

        {/* Name */}
        <input
          type="text"
          name="customerName"
          placeholder="Your Name"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
          required
        />

        {/* Mobile */}
        <input
          type="text"
          name="customerMobile"
          placeholder="Mobile Number"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        {/* Order Type */}
        <select
          name="orderType"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        >
          <option value="DINE-IN">Dine In</option>
          <option value="TAKEAWAY">Takeaway</option>
        </select>

        {/* Overall Rating */}
        <label className="block mb-1">Overall Rating</label>
        <select
          name="overallRating"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        >
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} ⭐
            </option>
          ))}
        </select>

        {/* Food Rating */}
        <label className="block mb-1">Food Rating</label>
        <select
          name="foodRating"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        >
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} ⭐
            </option>
          ))}
        </select>

        {/* Service Rating */}
        <label className="block mb-1">Service Rating</label>
        <select
          name="serviceRating"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        >
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} ⭐
            </option>
          ))}
        </select>

        {/* Ambience Rating */}
        <label className="block mb-1">Ambience Rating</label>
        <select
          name="ambienceRating"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        >
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} ⭐
            </option>
          ))}
        </select>

        {/* Comment */}
        <textarea
          name="comment"
          placeholder="Your feedback..."
          rows={4}
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
