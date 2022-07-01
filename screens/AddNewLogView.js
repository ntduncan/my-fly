import React from 'react';
import {View, Text} from 'react-native';
import NewLogForm from '../Forms/NewLogForm';

export function AddNewLogView({navigation}) {
    return (
        <View>
            <NewLogForm navigation={navigation}/>
        </View>
    );
}
