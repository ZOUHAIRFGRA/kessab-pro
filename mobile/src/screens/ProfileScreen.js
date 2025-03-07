import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateProfile } from '../features/userSlice';
import { styled } from 'dripsy';
import { logout } from '../features/authSlice';
import { useTranslation } from 'react-i18next';
import Colors from '../utils/Colors';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userProfile, loading, error } = useSelector((state) => state.user);
  const isRTL = t("dir") === "rtl";

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const [isEditing, setIsEditing] = useState(false);

  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const [updatedAddress, setUpdatedAddress] = useState('');

  useEffect(() => {
    if (userProfile) {
      setUpdatedUsername(userProfile.username || '');
      setUpdatedEmail(userProfile.email || '');
      setUpdatedPhone(userProfile.phone || '');
      setUpdatedAddress(userProfile.address || '');
    }
  }, [userProfile]);

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
      <Title>{t('common.Profile')}</Title>
      {isEditing ? (
        <>
          <InputContainer isRTL={isRTL}>
            <Label>{t('common.Username')}</Label>
            <Input
              value={updatedUsername}
              onChangeText={setUpdatedUsername}
              isRTL={isRTL}
            />
          </InputContainer>
          <InputContainer isRTL={isRTL}>
            <Label>{t('common.Email')}</Label>
            <Input
              value={updatedEmail}
              onChangeText={setUpdatedEmail}
              isRTL={isRTL}
            />
          </InputContainer>
          <InputContainer isRTL={isRTL}>
            <Label>{t('common.Phone')}</Label>
            <Input
              value={updatedPhone}
              onChangeText={setUpdatedPhone}
              isRTL={isRTL}
            />
          </InputContainer>
          <InputContainer isRTL={isRTL}>
            <Label>{t('common.Address')}</Label>
            <Input
              value={updatedAddress}
              onChangeText={setUpdatedAddress}
              isRTL={isRTL}
            />
          </InputContainer>
          <ButtonContainer>
            <StyledButton onPress={handleProfileUpdate}>
              <ButtonText>{t('common.SaveProfile')}</ButtonText>
            </StyledButton>
            <StyledButton onPress={() => setIsEditing(false)} secondary>
              <ButtonText>{t('common.cancel')}</ButtonText>
            </StyledButton>
          </ButtonContainer>
        </>
      ) : (
        <>
          <ProfileItem isRTL={isRTL}>
            <Label>{t('common.Username')}:</Label>
            <ProfileText>{userProfile?.username}</ProfileText>
          </ProfileItem>
          <ProfileItem isRTL={isRTL}>
            <Label>{t('common.Email')}:</Label>
            <ProfileText>{userProfile?.email}</ProfileText>
          </ProfileItem>
          <ProfileItem isRTL={isRTL}>
            <Label>{t('common.Phone')}:</Label>
            <ProfileText>{userProfile?.phone}</ProfileText>
          </ProfileItem>
          <ProfileItem isRTL={isRTL}>
            <Label>{t('common.Address')}:</Label>
            <ProfileText>{userProfile?.address}</ProfileText>
          </ProfileItem>
          <ButtonContainer>
            <StyledButton onPress={() => setIsEditing(true)}>
              <ButtonText>{t('common.Edit_Profile')}</ButtonText>
            </StyledButton>
          </ButtonContainer>
        </>
      )}
      <ButtonContainer>
        <StyledButton onPress={handleLogout} danger>
          <ButtonText>{t('common.Logout')}</ButtonText>
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

const InputContainer = styled(View)(({ isRTL }) => ({
  marginBottom: 20,
  width: '100%',
  flexDirection: 'column',
  alignItems: isRTL ? 'flex-end' : 'flex-start',
}));

const Label = styled(Text)({
  fontSize: 18,
  marginBottom: 8,
  color: '#555',
});

const Input = styled(TextInput)(({ isRTL }) => ({
  width: '100%',
  height: 45,
  borderColor: '#ccc',
  borderWidth: 1,
  paddingLeft: isRTL ? 0 : 15,
  paddingRight: isRTL ? 15 : 0,
  textAlign: isRTL ? 'right' : 'left',
  borderRadius: 8,
  backgroundColor: '#fff',
}));

const ProfileItem = styled(View)(({ isRTL }) => ({
  flexDirection: isRTL ? 'row-reverse' : 'row',
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
}));

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

const StyledButton = styled(TouchableOpacity)(({ secondary, danger }) => ({
  flex: 1,
  paddingVertical: 15,
  paddingHorizontal: 20,
  backgroundColor: danger ? Colors.danger : secondary ? 'orange' : '#4A90E2',
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
