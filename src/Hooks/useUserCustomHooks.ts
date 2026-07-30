import { useState } from "react";

export function useUserCustomHooks(){
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userImage, setUserImage] = useState('');

 return {userName, setUserName, userEmail, setUserEmail, userPhone, setUserPhone, userImage, setUserImage}
}