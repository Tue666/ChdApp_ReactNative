import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert, Linking } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { googleApi } from '../../Api/callApi';

export default function Message(props) {
    const { accessToken, item, student } = props;
    const [editing, setEditing] = useState(false);
    const [message, setMessage] = useState('');
    const [studentSTT, setStudentSTT] = useState();

    useEffect(() => {
        setMessage(student.Message);
        setStudentSTT(student.STT);
    }, [student.Message, student.STT]);

    // const sendMail = async (to, subject, body) => {
    //     let url = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
    //     const supported = await Linking.canOpenURL(url);
    //     if (!supported) {
    //         throw new Error('Provided URL can not be handled');
    //     }
    //     return Linking.openURL(url);
    // }

    const updateSheet = () => {
        const range = 'G' + (parseInt(studentSTT) + 1);
        const valueInputOption = 'USER_ENTERED';
        const updateSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + item.id + '/values/' + range + '?valueInputOption=' + valueInputOption;
        const body = {
            "values": [
                [
                    message
                ]
            ]
        };
        return googleApi(updateSheetUrl, 'PUT', accessToken, body);
    }

    const onClickSubmit = () => {
        Alert.alert('Cập nhật', 'Nhấn \'ĐỒNG Ý\' để cập nhật tin nhắn trên Google Drive', [
            {
                text: 'ĐỒNG Ý', onPress: async () => {
                    const isUpdated = await updateSheet();
                    if (isUpdated.status === 200) {
                        Alert.alert('Thành công', 'Cập nhật tin nhắn thành công', [{ text: 'OK' }]);
                    }
                    else {
                        Alert.alert('Thất bại', 'Đã xảy ra sự cố, liên hệ hỗ trợ!', [{ text: 'OK' }]);
                    }
                    setEditing(false);
                }
            },
            { text: 'HỦY' }
        ]);
    }

    return (
        <View style={styles.infor}>
            <Text style={styles.titleInfor}>Tin nhắn</Text>
            <View style={styles.field}>
                <TextInput
                    style={styles.textField}
                    multiline
                    editable={editing}
                    value={message}
                    onChangeText={text => setMessage(text)}
                >
                </TextInput>
                <View style={styles.separator} />
                {
                    editing ?
                        <View style={styles.editWrapper}>
                            <TouchableOpacity style={[styles.editButton, { backgroundColor: 'rgba(0,0,255,0.7)' }]} onPress={onClickSubmit} >
                                <FontAwesome5 name='paper-plane' color='#fff' size={23} style={{ paddingHorizontal: 15 }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.editButton, { backgroundColor: 'rgba(255,0,0,0.7)' }]} onPress={() => setEditing(false)} >
                                <FontAwesome5 name='times' color='#fff' size={23} style={{ paddingHorizontal: 15 }} />
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={() => setEditing(true)}>
                            <FontAwesome5 style={{ alignSelf: 'center' }} name='edit' size={23} color='blue' />
                        </TouchableOpacity>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    infor: {
        margin: 8
    },
    titleInfor: {
        fontWeight: 'bold',
        paddingBottom: 4
    },
    field: {
        backgroundColor: '#fff',
        padding: 13,
        elevation: 3
    },
    textField: {
        fontSize: 16,
        color: 'black'
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10
    },
    editWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    editButton: {
        padding: 10,
        borderRadius: 30
    }
});