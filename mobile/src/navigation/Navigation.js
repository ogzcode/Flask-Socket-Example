import { NavigationContainer } from "@react-navigation/native";
import { getItem } from "../services/storage";
import { AuthStackNav } from "./AuthStackNav";


export const Navigation = () => {
    return (
        <NavigationContainer>
            <AuthStackNav />
        </NavigationContainer>
    );
}