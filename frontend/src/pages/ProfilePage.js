import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { Card, CardContent, Typography, Grid, Avatar, Box, TextField, Button } from '@mui/material';

const ProfilePage = () => {
  const [name, setName] = useState('Aryan Sikariya');
  const [email, setEmail] = useState('aryan@example.com');
  const [dob, setDob] = useState('1990-01-01');
  const [educationLevel, setEducationLevel] = useState('Undergraduate');
  const [currentGrade, setCurrentGrade] = useState('');
  const [marks10, setMarks10] = useState('85');
  const [marks12, setMarks12] = useState('90');
  const [degreeStatus, setDegreeStatus] = useState('Completed');
  const [yearOfDegree, setYearOfDegree] = useState('2012');
  const [specialization, setSpecialization] = useState('Computer Science');
  const [skills, setSkills] = useState('JavaScript, React, Node.js');
  const [achievements, setAchievements] = useState('Top performer in coding competitions');
  const [experience, setExperience] = useState('2 years as a Software Engineer');
  const [hobbiesSkills, setHobbiesSkills] = useState('Reading, Coding, Traveling');
  const [experienceYears, setExperienceYears] = useState('2');
  const [experienceDescription, setExperienceDescription] = useState('Worked at XYZ Company as a Software Engineer');
  const [linkedin, setLinkedin] = useState('https://www.linkedin.com/in/aryansikariya');
  const [editable, setEditable] = useState(false);

  const handleEdit = () => {
    setEditable(!editable);
  };

  const styles = {
    container: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      margin: '2rem',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      padding: '1rem',
    },
    avatar: {
      width: '100px',
      height: '100px',
      marginBottom: '1rem',
    },
    profileDetails: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    profileInfo: {
      marginTop: '1rem',
    },
    formControl: {
      marginBottom: '1rem',
      width: '100%',
    },
  };

  return (
    <div style={styles.container}>
      <Sidebar userName="Aryan Sikariya" />
      <div style={styles.content}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card style={styles.card}>
              <CardContent style={styles.profileDetails}>
                <Avatar alt="Aryan Sikariya" src="/path/to/avatar.jpg" style={styles.avatar} />
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Software Engineer
                </Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                  View Resume
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h6">Profile Details</Typography>
                <Box style={styles.profileInfo}>
                  <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="Date of Birth"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="10th Marks"
                    type="number"
                    value={marks10}
                    onChange={(e) => setMarks10(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="12th Marks"
                    type="number"
                    value={marks12}
                    onChange={(e) => setMarks12(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="Degree Status"
                    value={degreeStatus}
                    onChange={(e) => setDegreeStatus(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="Year of Degree"
                    type="number"
                    value={yearOfDegree}
                    onChange={(e) => setYearOfDegree(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="Specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="Skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="Achievements"
                    value={achievements}
                    onChange={(e) => setAchievements(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="Hobbies & Skills"
                    value={hobbiesSkills}
                    onChange={(e) => setHobbiesSkills(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="Experience in Years"
                    type="number"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="Description of Experience"
                    value={experienceDescription}
                    onChange={(e) => setExperienceDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="LinkedIn Profile"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </Box>
                <Button variant="contained" color="primary" onClick={handleEdit} style={{ marginTop: '1rem' }}>
                  {editable ? 'Save Details' : 'Edit Details'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ProfilePage;