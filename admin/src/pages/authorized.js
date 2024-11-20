import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleGoHome = () => {
    navigate("/dashboard"); // Navigate to the dashboard or home page
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "#f9f9f9",
        px: 2,
      }}
    >
      <Typography variant="h1" color="error" fontWeight="bold" gutterBottom>
        403
      </Typography>
      <Typography variant="h5" gutterBottom>
        Access Denied
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        You do not have the required permissions to view this page.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{ textTransform: "none" }}
        >
          Go to Dashboard
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleGoBack}
          sx={{ textTransform: "none" }}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default Unauthorized;
