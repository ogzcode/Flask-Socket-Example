import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens/auth/Login";
import { Register } from "../screens/auth/Register";


const Stack = createStackNavigator();


export const AuthStackNav = () => {
    return (
        <Stack.Navigator
            screenOptions={
                {
                    headerShown: false
                }
            }
        >
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    );
}