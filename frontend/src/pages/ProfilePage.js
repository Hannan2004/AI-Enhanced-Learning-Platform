import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { Card, CardContent, Typography, Grid, Avatar, Box, TextField, Button } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [roleData, setRoleData] = useState(null);  // Store role-specific data
  const [userPosts, setUserPosts] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);  // Reference to the user's document in Firestore

      // Fetch user data and role
      getDoc(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userDocData = snapshot.data();
          setUserData(userDocData);

          // Based on the role, fetch the corresponding data from the correct collection
          let roleCollection = '';
          if (userDocData.role === 'undergraduate') {
            roleCollection = 'graduates'; // Map 'undergraduate' to 'graduates' collection
          } else if (userDocData.role === 'professional') {
            roleCollection = 'professionalForms'; // Map 'professional' to 'professionalForms' collection
          } else if (userDocData.role === 'student') {
            roleCollection = 'students'; // Map 'student' to 'students' collection
          }

          if (roleCollection) {
            const roleRef = collection(db, roleCollection);
            const roleQuery = query(roleRef, where('userId', '==', user.uid));  // Use user ID to fetch role-specific data
            getDocs(roleQuery).then((querySnapshot) => {
              const roleDetails = [];
              querySnapshot.forEach((doc) => {
                roleDetails.push(doc.data());
              });
              setRoleData(roleDetails[0]);  // Assuming only one document for the user in each collection
            }).catch((error) => {
              console.error("Error fetching role data: ", error);
            });
          }

          // Fetch posts based on username (same logic as before)
          const postsRef = collection(db, 'posts');
          const postsQuery = query(postsRef, where('username', '==', userDocData.username));
          getDocs(postsQuery).then((querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
              posts.push(doc.data());
            });
            setUserPosts(posts);
          }).catch((error) => {
            console.error("Error fetching posts: ", error);
          });

          // Fetch activities based on username (same logic as before)
          const activitiesRef = collection(db, 'activities');
          const activitiesQuery = query(activitiesRef, where('username', '==', userDocData.username));
          getDocs(activitiesQuery).then((querySnapshot) => {
            const activities = [];
            querySnapshot.forEach((doc) => {
              activities.push(doc.data());
            });
            setUserActivities(activities);
          }).catch((error) => {
            console.error("Error fetching activities: ", error);
          });
        } else {
          console.log("No user data available");
        }
      }).catch((error) => {
        console.error("Error fetching user data: ", error);
      });
    }
  }, []);

  const handleEdit = () => {
    setEditable(!editable);
  };

  if (!userData || !roleData) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

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
      <Sidebar userName={userData.name} />
      <div style={styles.content}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card style={styles.card}>
              <CardContent style={styles.profileDetails}>
                <Avatar alt={userData.name} src={userData.avatarUrl} style={styles.avatar} />
                <Typography variant="h6">{userData.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {roleData.profession || 'N/A'}
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
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="Email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  <TextField
                    label="Date of Birth"
                    type="date"
                    value={userData.dob}
                    onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                  {/* Add role-specific fields from roleData */}
                  {roleData && (
                    <>
                      <TextField
                        label="Degree"
                        value={roleData.degree || ''}
                        onChange={(e) => setRoleData({ ...roleData, degree: e.target.value })}
                        fullWidth
                        margin="normal"
                        InputProps={{
                          readOnly: !editable,
                        }}
                      />
                      <TextField
                        label="Experience"
                        value={roleData.experience || ''}
                        onChange={(e) => setRoleData({ ...roleData, experience: e.target.value })}
                        fullWidth
                        margin="normal"
                        InputProps={{
                          readOnly: !editable,
                        }}
                      />
                      {/* Add more role-specific fields if necessary */}
                    </>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEdit}
                    style={{ marginTop: '1rem' }}
                  >
                    {editable ? 'Save' : 'Edit'}
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h6">User Posts</Typography>
                <div>
                  {userPosts.length === 0 ? (
                    <Typography>No posts available</Typography>
                  ) : (
                    userPosts.map((post, index) => (
                      <div key={index}>
                        <Typography variant="body1">{post.title}</Typography>
                        <Typography variant="body2">{post.content}</Typography>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h6">User Activities</Typography>
                <div>
                  {userActivities.length === 0 ? (
                    <Typography>No activities available</Typography>
                  ) : (
                    userActivities.map((activity, index) => (
                      <div key={index}>
                        <Typography variant="body1">{activity.name}</Typography>
                        <Typography variant="body2">{activity.description}</Typography>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ProfilePage;
