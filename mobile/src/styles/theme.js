import { makeTheme } from "dripsy";

const theme = makeTheme({
  colors: {
    primary: '#4CAF50', 
    secondary: '#FF9800', 
    background: '#F0F4C3', 
    text: '#3E4E50', 
    muted: '#6B8E23', 
    border: '#A2D9CE', 
    white: '#FFFFFF', 
    inputBackground: '#FFFFFF', 
    placeholder: '#9E9E9E', 
    navBackground: '#FFFFFF', 
    },
  text: {
    default: {
      fontSize: 16,
      fontWeight: '400',
      color: '$colors.text',
    },
    heading: {
      fontSize: 24,
      fontWeight: '700',
      color: 'red',
      lineHeight: 32,
    },
    subheading: {
      fontSize: 20,
      fontWeight: '600',
      color: '$colors.text',
      lineHeight: 28,
    },
    secondary: {
      fontSize: 14,
      fontWeight: '400',
      color: '$colors.muted',
    },
  },
  buttons: {
    primary: {
      backgroundColor: '$colors.primary',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      shadowColor: '$colors.text',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    secondary: {
      backgroundColor: '$colors.secondary',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      shadowColor: '$colors.text',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
  },
  
});

export default theme;
