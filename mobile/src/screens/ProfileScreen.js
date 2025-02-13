import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateProfile } from '../features/userSlice';
import { styled } from 'dripsy';
import { logout } from '../features/authSlice';


const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userProfile, loading, error } = useSelector((state) => state.user);

  const [updatedUsername, setUpdatedUsername] = useState(userProfile?.username || '');
  const [updatedEmail, setUpdatedEmail] = useState(userProfile?.email || '');
  const [updatedPhone, setUpdatedPhone] = useState(userProfile?.phone || '');
  const [updatedAddress, setUpdatedAddress] = useState(userProfile?.address || '');

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleProfileUpdate = () => {
    const updatedUser = {
      ...userProfile,
      username: updatedUsername,
      email: updatedEmail,
      phone: updatedPhone,
      address: updatedAddress,
    };
    dispatch(updateProfile(updatedUser));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Text>Error: {error}</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Profile</Title>
      <InputContainer>
        <Label>Username</Label>
        <Input
          value={updatedUsername}
          onChangeText={setUpdatedUsername}
        />
      </InputContainer>
      <InputContainer>
        <Label>Email</Label>
        <Input
          value={updatedEmail}
          onChangeText={setUpdatedEmail}
        />
      </InputContainer>
      <InputContainer>
        <Label>Phone</Label>
        <Input
          value={updatedPhone}
          onChangeText={setUpdatedPhone}
        />
      </InputContainer>
      <InputContainer>
        <Label>Address</Label>
        <Input
          value={updatedAddress}
          onChangeText={setUpdatedAddress}
        />
      </InputContainer>
      <Button title="Update Profile" onPress={handleProfileUpdate} />


      <Button title="Logout" onPress={handleLogout} />



    </Container>
  );
};
const Container = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
});

const Title = styled(Text)({
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
});

const InputContainer = styled(View)({
  marginBottom: 15,
  width: '100%',
});

const Label = styled(Text)({
  fontSize: 16,
  marginBottom: 5,
});

const Input = styled(TextInput)({
  height: 40,
  borderColor: '#ccc',
  borderWidth: 1,
  paddingLeft: 10,
  borderRadius: 5,
});

export default ProfileScreen;
