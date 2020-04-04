import React, {useState} from "react";

const ToggleContext = React.createContext();

const ToggleProvider = props => {

    const [toggle, setToggle] = useState(false);

    return (
        <ToggleContext.Provider
            value={{
                toggle: toggle,
                setToggle: setToggle
            }}
        >
            {props.children}
        </ToggleContext.Provider>
    )
};

const ToggleConsumer = ToggleContext.Consumer;

export {ToggleConsumer, ToggleProvider};