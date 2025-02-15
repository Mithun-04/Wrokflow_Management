import { useEffect, useState } from 'react';
import './profile.css';
import { supabase } from './supabaseClient';

function Profile() {
    const [fetchError, setFetchError] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase.auth.getUser(); 
            

            if (error || !data?.user) {
                setFetchError('User not authenticated');
                setProfile(null);
                return;
            }

            setProfile(data.user);
            setFetchError(null);
        };

        fetchProfile();
    }, []);

    return (
        <div className="page">
            {fetchError && <p>{fetchError}</p>}
            <h3 className="heading">
                My profile
            </h3>
            {profile && (
                <div className="profile">
                    <p>Email: {profile.email}</p>
                    

                </div>
            )}
        </div>
    );
}

export default Profile;