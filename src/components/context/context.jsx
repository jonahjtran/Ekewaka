import { createContext, useEffect } from "react";
import run from "../../config/gemini";

export const context = createContext();

const ContextProvider = (props) => {
    const onSent = async (prompt) => {
        try {
            console.log("ContextProvider: Attempting to send message");
            if (!prompt || typeof prompt !== 'string') {
                throw new Error('Invalid prompt provided');
            }
            const response = await run(prompt);
            console.log("ContextProvider: Message sent successfully");
            return response;
        } catch (error) {
            console.error("ContextProvider: Error sending message to Gemini:", error);
            throw error; // Re-throw the error so it can be handled by the component
        }
    }   

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
