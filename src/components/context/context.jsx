import { createContext, useEffect } from "react";
import run from "../../config/gemini";

export const context = createContext();

const ContextProvider = (props) => {
    const onSent = async (prompt) => {
        try {
            console.log("ContextProvider: Attempting to send message");
            const response = await run(prompt);
            console.log("ContextProvider: Message sent successfully");
            return response;
        } catch (error) {
            console.error("ContextProvider: Error sending message to Gemini:", error);
        }
    }   

    useEffect(() => {
        console.log("ContextProvider: useEffect triggered");
        onSent("Hello, how are you?");
        
        return () => {
            console.log("ContextProvider: useEffect cleanup");
        };
    }, []);

    const contextValue = {
        onSent
    }

    return (
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    )
} 

export default ContextProvider;
