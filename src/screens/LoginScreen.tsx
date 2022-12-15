import React, { FC, useState } from "react";
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authenticate } from "../api/user";
import { useAuth } from "../context/AppContext";
import { UserModel } from "../models/user";

const LoginScreen: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await authenticate(username, password);
            var status = response["status"];
            if (status === 200) {
                const responseData = response["data"] as UserModel;
                if (!responseData.token) {
                    Alert.alert("no token");
                    return;
                }
                setIsLoading(true);
                login(responseData);
            } else {
                Alert.alert(status.toString());
                return;
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView>
            {isLoading ? (
                <ActivityIndicator
                    size={'large'}
                    color={'#1a75cf'}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                />
            ) : (
                <View style={styles.container}>
                    <View style={styles.form}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            onChangeText={username => setUsername(username)}
                            cursorColor={'#0054fe'}
                            selectionColor={'#0054fe'}
                        />
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={password => setPassword(password)}
                            secureTextEntry={true}
                            cursorColor={'#0054fe'}
                            selectionColor={'#0054fe'}
                        />
                        <Button title="Sign In" onPress={handleSubmit} />
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    logo_area: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 240,
        marginBottom: 20,
        paddingTop: 20
    },
    label: {
        color: 'black',
        opacity: 0.5,
        textAlign: 'left',
        marginBottom: 5,
    },
    input: {
        display: 'flex',
        width: 240,
        height: 40,
        backgroundColor: '#ffffff',
        marginBottom: 20,
        textDecorationLine: 'none',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0054fe',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#0054fe',
        color: 'white',
        height: 34,
    },
    button_title: {
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 16,
    },
    footer: {
        textAlign: 'center',
        color: '#b2b2b2',
        fontSize: 14,
        fontFamily: 'Lato-Black',
    },
    link: {
        color: '#0000ee',
        textDecorationLine: 'underline'
    }
});

export default LoginScreen;