import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Divider,
  IconButton,
  CircularProgress,
  Stack,
} from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    shortBio: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      password: "",
      shortBio: "",
    });
  };

  const handleCancel = () => {
    console.log("Form cancelled");
    // Add your cancel logic here
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h2"
          sx={{
            color: "#9c27b0",
            fontWeight: 500,
            mb: 2,
          }}
        >
          User Profile
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Complete your profile information
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Required fields are marked with *
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, border: "1px solid #e0e0e0" }}>
        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
            Personal Information
          </Typography>

          <TextField
            fullWidth
            required
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            helperText="Enter your full name"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <AcUnitIcon sx={{ mr: 1, color: "action.active" }} />
              ),
            }}
          />

          <TextField
            fullWidth
            required
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            required
            label="Create Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          {/* Optional Information Section */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
            Optional Information
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Short Bio"
            name="shortBio"
            value={formData.shortBio}
            onChange={handleChange}
            helperText="Tell us about yourself (optional)"
            sx={{ mb: 3 }}
          />

          {/* Actions Section */}
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 500, textAlign: "center" }}
          >
            Actions
          </Typography>

          <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              startIcon={<AcUnitIcon />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              SAVE PROFILE
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleReset}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                borderColor: "divider",
              }}
            >
              RESET FORM
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleCancel}
              sx={{
                textTransform: "none",
                color: "error.main",
                borderColor: "divider",
              }}
            >
              CANCEL
            </Button>
          </Box>

          {/* Need Help Section */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              Need Help?
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <AcUnitIcon sx={{ color: "action.active" }} />
              <Link href="#" underline="none" sx={{ color: "text.primary" }}>
                Contact support
              </Link>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Bonus Challenges Section */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Bonus Challenges
            </Typography>
            <Box
              sx={{ display: "flex", gap: 1, justifyContent: "center", mb: 2 }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  color: "#9c27b0",
                  borderColor: "#9c27b0",
                }}
              >
                DESKTOP VIEW 1
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  color: "#9c27b0",
                  borderColor: "#9c27b0",
                }}
              >
                DESKTOP VIEW 2
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  color: "#9c27b0",
                  borderColor: "#9c27b0",
                }}
              >
                DESKTOP VIEW 3
              </Button>
            </Box>
          </Box>

          {/* Terms & Conditions */}
          <Box sx={{ textAlign: "center" }}>
            <Link
              href="#"
              underline="hover"
              sx={{
                color: "#1976d2",
                fontSize: "0.875rem",
              }}
            >
              TERMS & CONDITIONS
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default App;
