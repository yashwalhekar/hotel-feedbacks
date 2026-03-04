"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { submitFeedback } from "@/service/feedbackservice";
import API from "@/service/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Stack,
  Rating,
  CircularProgress,
} from "@mui/material";

export default function FeedbackPage() {
  const { slug } = useParams();

  const [shop, setShop] = useState(null);

  const [formData, setFormData] = useState({
    customerName: "",
    customerMobile: "",
    orderType: "DINE-IN",
    overallRating: 0,
    foodRating: 0,
    serviceRating: 0,
    ambienceRating: 0,
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
        setShop(null);
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [slug]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
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

  if (loading)
    return (
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "linear-gradient(135deg, #f8f9fa, #eef2f3)",
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <CircularProgress size={60} thickness={4} />
        </motion.div>

        <Typography mt={3} color="text.secondary">
          Preparing your experience...
        </Typography>
      </Container>
    );
  if (!shop)
    return (
      <Container sx={{ mt: 10 }}>
        <Typography variant="h6" align="center">
          Invalid QR Code
        </Typography>
      </Container>
    );

  if (submitted)
    return (
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f8f9fa, #eef2f3)",
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          style={{ textAlign: "center" }}
        >
          <motion.div
            initial={{ rotate: -20 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" fontWeight={700} color="success.main">
              🎉 Thank You!
            </Typography>
          </motion.div>

          <Typography mt={2} color="text.secondary">
            Your feedback means a lot to us.
          </Typography>
        </motion.div>
      </Container>
    );
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        background: "linear-gradient(135deg, #f8f9fa, #eef2f3)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card
          sx={{
            width: "100%",
            borderRadius: 5,
            boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
            backdropFilter: "blur(10px)",
            backgroundColor: "#ffffff",
          }}
        >
          <CardContent sx={{ p: 5 }}>
            {/* Hotel Name */}
            <Typography
              variant="h5"
              align="center"
              sx={{
                fontWeight: 600,

                background: "linear-gradient(90deg,#000,#444)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              {shop.shopName}
            </Typography>

            {/* Tagline */}
            <Typography
              variant="subtitle2"
              align="center"
              sx={{
                fontStyle: "italic",
                color: "text.secondary",
                mb: 4,
              }}
            >
              “Where Every Guest Experience Matters.”
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Guest Name"
                  fullWidth
                  required
                  variant="outlined"
                  onChange={(e) => handleChange("customerName", e.target.value)}
                />

                <TextField
                  label="Mobile Number"
                  fullWidth
                  variant="outlined"
                  onChange={(e) =>
                    handleChange("customerMobile", e.target.value)
                  }
                />

                <Select
                  value={formData.orderType}
                  fullWidth
                  onChange={(e) => handleChange("orderType", e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="DINE-IN">Dine In</MenuItem>
                  <MenuItem value="TAKEAWAY">Takeaway</MenuItem>
                </Select>

                {/* Ratings Section */}
                <Stack
                  spacing={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "#fafafa",
                  }}
                >
                  {[
                    { label: "Overall Experience", name: "overallRating" },
                    { label: "Food Quality", name: "foodRating" },
                    { label: "Service", name: "serviceRating" },
                    { label: "Ambience", name: "ambienceRating" },
                  ].map((item) => (
                    <Stack key={item.name} spacing={1}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {item.label}
                      </Typography>
                      <Rating
                        size="large"
                        value={formData[item.name]}
                        onChange={(e, newValue) =>
                          handleChange(item.name, newValue)
                        }
                        sx={{
                          fontSize: "2rem",
                          transition: "all 0.3s ease",
                          "& .MuiRating-icon": {
                            transition: "all 0.3s ease",
                          },
                          "& .MuiRating-iconHover": {
                            transform: "scale(1.3)",
                            color: "#D4AF37", // premium gold
                          },
                          "& .MuiRating-iconFilled": {
                            color: "#D4AF37",
                          },
                        }}
                      />
                    </Stack>
                  ))}
                </Stack>

                <TextField
                  label="Share your experience..."
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  onChange={(e) => handleChange("comment", e.target.value)}
                />
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    fullWidth
                    sx={{
                      py: 1.6,
                      borderRadius: 3,
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "1rem",
                      background: "linear-gradient(90deg, #000000, #333333)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                      "&:hover": {
                        background: "linear-gradient(90deg, #111111, #444444)",
                      },
                    }}
                  >
                    Submit Feedback
                  </Button>
                </motion.div>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}
