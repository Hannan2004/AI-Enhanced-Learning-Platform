import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box, Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useParams } from "react-router-dom";

const AptitudeLanding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userType } = useParams();
  const user = location.state?.user;
  const [language, setLanguage] = useState('English');

  const handleStart = () => {
    navigate(`/numerical-ability/${userType}`, { state: { userType, user, language } });
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
      }}
    >
      <div style={{ maxWidth: "900px", width: "100%", padding: "20px" }}>
        <Card
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <Grid container>
            {/* Left Section */}
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#e0e7ff",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
            >
              {/* Add App Logo Here if needed */}
            </Grid>

            {/* Right Section */}
            <Grid item xs={8}>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ textAlign: "center", marginBottom: "20px" }}
                >
                  Welcome to Aptitude Test
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ marginBottom: "10px" }}
                >
                  The test will have 3 sections:
                  <ul>
                    <li>1. Numerical</li>
                    <li>2. Verbal</li>
                    <li>3. Logical</li>
                  </ul>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Each section will have 5 questions, and you will have 30 mins to solve the entire test.
                </Typography>
                <FormControl fullWidth style={{ marginTop: "20px" }}>
                  <InputLabel id="language-select-label">Select Language</InputLabel>
                  <Select
                    labelId="language-select-label"
                    value={language}
                    onChange={handleLanguageChange}
                  >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                    <MenuItem value="Marathi">Marathi</MenuItem>
                    <MenuItem value="Bengali">Bengali</MenuItem>
                    <MenuItem value="Malayalam">Malayalam</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleStart}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
            }}
          >
            Start Test
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default AptitudeLanding;