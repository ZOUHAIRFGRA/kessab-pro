import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Switch } from '@rneui/themed';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';



const LangSwitcher = () =>  {
    const { t, i18n } = useTranslation();
     return (
       <View>
         <TouchableOpacity onPress={() => i18n.changeLanguage("dr")}>
           <Text>Darija</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => i18n.changeLanguage("fr")}>
           <Text>French</Text>
         </TouchableOpacity>
       </View>

     )
   }

   

export default LangSwitcher;



