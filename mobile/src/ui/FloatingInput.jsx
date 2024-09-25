import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Animated, { Easing, interpolate, useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { useTailwind } from '../context/useTailwind';

export const FloatingLabelInput = ({
    label,
    labelFocusColor = "text-slate-600",
    value,
    onChangeText,
    type = "text",
    cursorColor = "#f43f5e",
    style
}) => {
    const { tw } = useTailwind();
    const [isFocused, setIsFocused] = useState(false);
    const labelPosition = useSharedValue(value ? 1 : 0);

    const handleFocus = () => {
        setIsFocused(true);
        labelPosition.value = withSpring(1, { duration: 300, easing: Easing.linear });
    };

    const handleBlur = () => {
        if (!value) {
            setIsFocused(false);
            labelPosition.value = withSpring(0, { duration: 300, easing: Easing.linear });
        }
    };

    const labelStyle = useAnimatedStyle(() => {
        return {
            top: interpolate(labelPosition.value, [0, 1], [12, -24]),
            fontSize: interpolate(labelPosition.value, [0, 1], [16, 14]),
        };
    });

    return (
        <View style={[tw` border-2 border-gray-500 text-lg rounded w-full relative`, style]}>
            <Animated.Text style={[tw`absolute left-1 ${isFocused ? labelFocusColor : "text-slate-400"}`, labelStyle]}>
                {label}
            </Animated.Text>
            <TextInput
                style={[tw`h-12 p-2 text-lg text-slate-700`]}
                value={value}
                onChangeText={onChangeText}
                onFocus={handleFocus}
                onBlur={handleBlur}
                secureTextEntry={type === "password"}
                keyboardType={type === "email" ? "email-address" : "default"}
                cursorColor={cursorColor}
            />
        </View>
    );
};
