import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTailwind } from '../../context/useTailwind';
import { Eye, EyeOff } from 'lucide-react-native';
import { FloatingLabelInput } from '../../ui/FloatingInput';
import Bg from "../../assets/image/bg-3.svg";
import { useNavigation } from '@react-navigation/native';
import { LogIn } from 'lucide-react-native';



export const Register = () => {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const { tw } = useTailwind();
    const navigation = useNavigation();

    const handleNavigateLogin = () => {
        navigation.navigate('Login');
    }
    return (
        <View style={tw`h-full justify-center items-center p-8`}>
            <Bg style={tw`absolute top-0 left-0 w-full h-full`} />

            <Pressable onPress={handleNavigateLogin} style={tw`absolute px-2 pb-1 top-12 right-8 border-b-2 border-white flex-row gap-2 items-center`}>
                <LogIn style={tw`text-white`} size={20}/>
                <Text style={tw`text-white text-lg font-bold`}>Login</Text>
            </Pressable>

            <View style={tw`mb-12 items-center`}>
                <Text style={tw`text-white text-3xl font-bold`}>Register</Text>
                <Text style={tw`text-white text-sm font-light`}>Please fill in the form to create an account</Text>
            </View>

            <FloatingLabelInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                type="text"
                style={tw`bg-white border-white text-slate-700 mb-8`}
                labelFocusColor='text-white'
            />

            <FloatingLabelInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                type="email"
                style={tw`bg-white border-white text-slate-700 mb-8`}
                labelFocusColor='text-white'
            />

            <View style={tw`relative mb-10 w-full`}>
                <FloatingLabelInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    type={showPassword ? "text" : "password"}
                    style={tw`bg-white border-white text-slate-700`}
                    labelFocusColor='text-white'
                />
                <View style={tw`absolute right-4 top-3.5 z-10`}>
                    {showPassword ?
                        <EyeOff size={20} style={tw`text-gray-700`} onPress={() => setShowPassword(false)} /> :
                        <Eye size={20} style={tw`text-gray-700`} onPress={() => setShowPassword(true)} />}
                </View>
            </View>

            <Pressable style={tw`border-white border-2 h-12 rounded items-center justify-center w-1/2`}>
                <Text style={tw`text-white text-base font-bold`}>Register</Text>
            </Pressable>

            <View style={tw`absolute bottom-6 text-center`}>
                <Text style={tw`text-center text-white font-light text-sm font-bold`}>
                    Designed by: Oguzhan Guc
                </Text>
            </View>
        </View>
    );
}