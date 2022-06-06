import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import ProfileTabs from "components/ProfileTabs";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { blue, grey } from "@mui/material/colors";
import SubsectionHeader from "components/Headers/SubsectionHeader";
import { useEffect, useState } from "react";
import { api } from "utils/api";
import { useParams } from "react-router-dom";

const MemberDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    major: "",
    email: "",
  });

  useEffect(() => {
    (async () => {
      const res = await api.get(`/admin/intern/${id}`);
      setProfile(res.data);
    })();
  }, []);

  return (
    <Grid container marginTop={0} columnSpacing={8}>
      <Grid item md={4}>
        <Paper sx={{ height: 300 }}>
          <img
            style={{ height: "100%", borderRadius: "5px" }}
            src="https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt=""
          />
        </Paper>
        <Box marginTop="3rem">
          <SubsectionHeader>Hobbies</SubsectionHeader>
          <Box marginTop="1rem">
            <Typography variant="h6" fontWeight={400} fontSize="1.2rem">
              Workout
            </Typography>
            <Typography variant="h6" fontWeight={400} fontSize="1.2rem">
              Coding
            </Typography>
            <Typography variant="h6" fontWeight={400} fontSize="1.2rem">
              Playing Guitar
            </Typography>
          </Box>
        </Box>
        <Box marginTop="2rem">
          <SubsectionHeader>Skills</SubsectionHeader>
          <Box>
            <Typography variant="h6" fontWeight={400} fontSize="1.2rem">
              HTML
            </Typography>
            <Typography variant="h6" fontWeight={400} fontSize="1.2rem">
              CSS
            </Typography>
            <Typography variant="h6" fontWeight={400} fontSize="1.2rem">
              JS
            </Typography>
            <Typography variant="h6" fontWeight={400} fontSize="1.2rem">
              Typescript
            </Typography>
            <Typography variant="h6" fontWeight={400} fontSize="1.2rem">
              ReactJS
            </Typography>
            <Typography variant="h6" fontWeight={400} fontSize="1.2rem">
              Redux
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item md={8}>
        <Box>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" component="span">
              {profile.name}
            </Typography>
            <Box
              color={grey[500]}
              marginTop={0.5}
              marginLeft={2}
              display="flex"
              alignItems="center"
            >
              <LocationOnIcon />
              <Typography fontWeight={500} component="span">
                New York, NY
              </Typography>
            </Box>
          </Box>
          <Box marginTop={0.5}>
            <Typography fontWeight={500} color={blue[500]}>
              {profile.major}
            </Typography>
          </Box>
        </Box>

        <Box marginTop={4}>
          <SubsectionHeader>GPA</SubsectionHeader>
          <Box display="flex" alignItems="center">
            <Typography fontSize="2rem" marginRight="0.5rem">
              8,6
            </Typography>
            <Rating
              size="large"
              name="gpa"
              precision={0.25}
              value={8.6}
              max={10}
              readOnly
            />
          </Box>
        </Box>

        <Box marginTop="1rem">
          <ProfileTabs />
        </Box>

        <Box marginTop="3rem">
          <SubsectionHeader>Contact Information</SubsectionHeader>
          <Grid container marginTop={2} rowSpacing={2}>
            <Grid item xs={2}>
              <Typography>Phone: </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography>{profile.phone}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>Address: </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography>
                525 E 58th Street
                <br /> New York, NY 10651-78 156-187-60
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>E-mail: </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography>{profile.email}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box marginTop="3rem">
          <SubsectionHeader>Basic Information</SubsectionHeader>
          <Grid container marginTop={2} rowSpacing={2}>
            <Grid item xs={2}>
              <Typography>Birthday: </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography>June 5, 1992</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>Gender: </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography>Male</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box marginTop="2rem">
          <Button variant="contained">Accept</Button>
          <Button sx={{ marginLeft: "1rem" }} variant="outlined" color="error">
            Disqualify
          </Button>
        </Box>

        <Box marginTop="1rem">
          <Button variant="contained" color="error">
            Delete this profile
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MemberDetail;
