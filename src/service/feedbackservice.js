import API from "./api";

/* ===============================
   PUBLIC: Submit Feedback
   =============================== */

export const submitFeedback = async (slug, formData) => {
  const response = await API.post(`/feedback/public/${slug}`, formData);

  return response.data;
};
