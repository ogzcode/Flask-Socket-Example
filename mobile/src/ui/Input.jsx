import { useTailwind } from "../context/useTailwind"
import { TextInput } from "react-native"

export const Input = ({ value,type = "text", style, onChangeText, placeholder, cursorColor = "#f43f5e" }) => {
    const { tw } = useTailwind();

    return (
        <TextInput
            style={[tw`border-2 border-gray-500 h-12 p-2 text-lg rounded w-full`, style]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={type === "password"}
            keyboardType={type === "email" ? "email-address" : "default"}
            cursorColor={cursorColor}
        />
    );
}
