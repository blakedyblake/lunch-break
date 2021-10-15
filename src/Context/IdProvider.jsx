import React from "react";



export const GlobalContext = React.createContext(0)

// export const GlobalProvider = ({children})=>{
//     const [user_id, setUserId] = useState(0);

//     const provider = {
//         user_id,
//         setUserId
//     }

//     return(
//         <GlobalContext.Provider value={provider}>
//             {children}
//         </GlobalContext.Provider>  
//     )
// }