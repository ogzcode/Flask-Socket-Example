import { useContext, createContext } from "react";
import { useDeviceContext, useAppColorScheme, create } from "twrnc";

export const TailwindContext = createContext();

export function useTailwind() {
    return useContext(TailwindContext);
}

export function TailwindProvider({ children }) {
    const tw = create(require(`../../tailwind.config.js`));

    useDeviceContext(tw, {
        observeDeviceColorSchemeChanges: false,
        initialColorScheme: `light`,
    });

    const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);

    return (
        <TailwindContext.Provider
            value={{
                tw,
                colorScheme,
                toggleColorScheme,
                setColorScheme,
            }}
        >
            {children}
        </TailwindContext.Provider>
    );
}