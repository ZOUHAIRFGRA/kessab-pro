import Container from "../global/Container";
import Header from "../global/Header";
import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";

const NotFound = ({message}) => {
    return (
        
        <Container sx={{ justifyContent: 'center', alignItems: 'center'}}>
             <Image
                      source={require("../../../assets/farmer_feeding_cattle.png")}
                      style={{  height: 300, width: 300, resizeMode: 'contain' }}
                    />
                    <Header level={2}>{message}</Header>
                    
                    
        </Container>
    
    );
};

export default NotFound;