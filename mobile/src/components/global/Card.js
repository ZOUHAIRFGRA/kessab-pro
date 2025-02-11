import { styled } from 'dripsy';
import { View, Text } from 'react-native';

const Card = styled(View)((props) => (
    {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    }
))
  
export default Card;
  