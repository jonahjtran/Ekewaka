 import { createContext } from "react";
 import runChat from "../../config/gemini";

export const context = createContext();

const ContextProvider = (props) => {

    const onSent = async (prompt) => {
        runChat(prompt);
    }   
    onSent("Hello, how are you?");


    const contextValue = {}


    return (
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    )
} 

export default ContextProvider;
