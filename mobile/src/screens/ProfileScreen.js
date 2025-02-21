import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateProfile } from '../features/userSlice';
import { styled } from 'dripsy';
import { logout } from '../features/authSlice';
import LangSwitcher from '../components/global/LangSwitcher';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userProfile, loading, error } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

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
    setIsEditing(false);
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
      {isEditing ? (
        <>
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
          <ButtonContainer>
            <StyledButton onPress={handleProfileUpdate}>
              <ButtonText>Save Profile</ButtonText>
            </StyledButton>
            <StyledButton onPress={() => setIsEditing(false)} secondary>
              <ButtonText>Cancel</ButtonText>
            </StyledButton>
          </ButtonContainer>
        </>
      ) : (
        <>
          <ProfileItem>
            <Label>Username:</Label>
            <ProfileText>{userProfile.username}</ProfileText>
          </ProfileItem>
          <ProfileItem>
            <Label>Email:</Label>
            <ProfileText>{userProfile.email}</ProfileText>
          </ProfileItem>
          <ProfileItem>
            <Label>Phone:</Label>
            <ProfileText>{userProfile.phone}</ProfileText>
          </ProfileItem>
          <ProfileItem>
            <Label>Address:</Label>
            <ProfileText>{userProfile.address}</ProfileText>
          </ProfileItem>
          <ButtonContainer>
            <StyledButton onPress={() => setIsEditing(true)}>
              <ButtonText>Edit Profile</ButtonText>
            </StyledButton>
          </ButtonContainer>
        </>
      )}
      <ButtonContainer>
        <StyledButton onPress={handleLogout} secondary>
          <ButtonText>Logout</ButtonText>
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  backgroundColor: '#f5f5f5',
});

const Title = styled(Text)({
  fontSize: 28,
  fontWeight: 'bold',
  marginBottom: 30,
  color: '#333',
});

const InputContainer = styled(View)({
  marginBottom: 20,
  width: '100%',
});

const Label = styled(Text)({
  fontSize: 18,
  marginBottom: 8,
  color: '#555',
});

const Input = styled(TextInput)({
  height: 45,
  borderColor: '#ccc',
  borderWidth: 1,
  paddingLeft: 15,
  borderRadius: 8,
  backgroundColor: '#fff',
});

const ProfileItem = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: 15,
  padding: 10,
  backgroundColor: '#fff',
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
});

const ProfileText = styled(Text)({
  fontSize: 16,
  color: '#333',
});

const ButtonContainer = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: 20,
});

const StyledButton = styled(TouchableOpacity)(({ secondary }) => ({
  flex: 1,
  paddingVertical: 15,
  paddingHorizontal: 20,
  backgroundColor: secondary ? '#ccc' : '#4A90E2',
  borderRadius: 8,
  alignItems: 'center',
  marginHorizontal: 5,
}));

const ButtonText = styled(Text)({
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
});

export default ProfileScreen;
