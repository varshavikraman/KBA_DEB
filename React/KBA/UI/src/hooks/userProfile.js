import {useEffect, useState} from 'react'


export default function userProfile(){

    const [profile,setProfile] = useState('');
    const [loading,setLoading] = useState('');

    useEffect(()=>{
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/profile',{
                    credentials:'include'
                });
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                }else{
                    setProfile(null)
                }
            } catch (error) {
                console.error('Profile fetch error:' , error);
                setProfile(null)
            }
            finally{
                setLoading(false);
            }
        }
        fetchProfile()
    },[])
    return {profile,loading};
}