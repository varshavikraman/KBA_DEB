import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const [profile,setProfile] = useState(null);
  const [error,setError] = useState('');
  const navigate = useNavigate;

  useEffect(()=>{
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile',{
          method:'GET',
          credentials:'include',
        });
        if(!response.ok){
          throw new Error('Unauthorised Access');
        }
        const data =await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message || 'Error fetching profile');
        navigate('/login');
      }
    }
    fetchProfile();
  },[navigate])

  return (
    <div className="bg-white p-8 rounded shadow">
    <h2 className="text-3xl font-bold mb-6 text-center">Dashboard</h2>
    {error && <p className='text-red-500 mb-4'>{error}</p>}
    {profile? 
      ( <div>
          <p>Welcome, {profile.UserName}</p>
          <p>Your Role is: {profile.userRole}</p>
        </div>
      ):
      (<p>
        loading Profile ....
      </p>)}
    </div>
  )
}

export default Dashboard