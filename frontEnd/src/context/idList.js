import { createContext, useState } from "react";

const IdlistContext = createContext({});

export const IdlistProvider = ({ children }) => {
    const [_listId, setListId] = useState('');
    const [task_id, setTask_id] = useState('');

    return (
        <IdlistContext.Provider value={{ _listId, setListId, task_id,setTask_id}}>
            {children}
        </IdlistContext.Provider>
    )
}

export default IdlistContext;