import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function UploadScreen() {
    return (
        <View style={styles.container}>
            <Text>UploadScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    }
});