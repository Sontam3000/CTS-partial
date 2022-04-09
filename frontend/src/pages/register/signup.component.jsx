import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userAction";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
// import axios from "axios";
const theme = createTheme();

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState('');
  const [sex, setSex] = useState("");
  const [status, setStatus] = useState("no");
  //   const py_id = "105013";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("password do not match");
    } else {
      dispatch(register(name, email, password, age, sex, status));

    }
  };
  //   const sexselect = [
  //       {
  //           value : 'male'
  //       },
  //       {
  //           value : 'female'
  //       },
  //   ];
  //   const statuses = [
  //     {
  //         value : 'Infected'
  //     },
  //     {
  //         value : 'Uninfected'
  //     },
  // ];
  //   const [status,setStatus]=React.useState('Uninfected');
  //   const handleChange = (event)=>{
  //       setStatus(event.target.value);
  //   }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="confirm-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="age"
                  onChange={(e) => setAge(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  select
                  id="sex"
                  label="Sex"
                  name="sex"
                  autoComplete="sex"
                  onChange={(e) => setSex(e.target.value)}
                >
                  <MenuItem value="Male" >Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  select
                  id="status"
                  label="Status"
                  name="status"
                  autoComplete="status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="Infected" >Infected</MenuItem>
                  <MenuItem value="Uninfected">Uninfected</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Next
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  <span className="botlink">
                    {" "}
                    Already have an account? Sign in
                  </span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
