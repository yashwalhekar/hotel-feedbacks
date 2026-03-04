import API from "./api";

/* ===============================
   PUBLIC: Submit Feedback
   =============================== */

export const submitFeedback = async (slug, formData) => {
  const response = await API.post(`/feedback/public/${slug}`, formData);

  return response.data;
};

/* ===============================
   ADMIN: Get All Feedbacks
   =============================== */

export const getFeedbacks = async () => {
  const response = await API.get("/feedback");
  return response.data;
};

/* ===============================
   ADMIN: Get Feedback Summary
   =============================== */

export const getFeedbackSummary = async () => {
  const response = await API.get("/feedback/summary");
  return response.data;
};

/* ===============================
   ADMIN: Resolve Feedback
   =============================== */

export const resolveFeedback = async (feedbackId) => {
  const response = await API.patch(`/feedback/${feedbackId}`);

  return response.data;
};
