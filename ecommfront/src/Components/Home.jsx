import './Home.css';
import BannerSection from './BannerSection';
import Men from './Men';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct';
import AllProducts from './AllProducts';

function Home() {

    const [profile, setProfile] = useState(false);

    const handleChange = () => {
        setProfile(true)
    }

    const { state, Logout } = useContext(AuthContext);

    const route = useNavigate();

    useEffect(() => {
        if (!state?.user) {
            route('/');
        }
    }, [state, route]);

    return (
        <>
            <div className="screen-home">
                <div className="home-parent">
                    <div className="home-child">
                        <div className="home-logo">
                            <i class="fa-brands fa-asymmetrik fa-2xl"></i>
                        </div>
                        <div className="home-navmenu">
                            <a onClick={() => route('/home')}>Home</a>
                            <a onClick={() => route('/home/men')}>Men</a>
                            <a onClick={() => route('/home/women')} >Women</a>
                        </div>
                        <div className="home-cta">
                            <div className="home-cta-username">
                                <a>{state?.user?.name ? <a onClick={handleChange}>Hi {state?.user?.name}</a> : <a onClick={() => route('/login')}>Login</a>}</a>
                                {profile && <div className="home-cta-profile-dropdown">
                                    <a>Update Profile</a>
                                    <a>Track Status</a>
                                    <a>Change Address</a>
                                    <a onClick={Logout}>Logout</a>
                                    <a onClick={() => setProfile(false)}>Close</a>
                                </div>}
                            </div>
                            <div className="home-cta-cart">
                                <i class="fa-solid fa-bag-shopping fa-lg"></i>
                            </div>
                            <div className="home-cta-wishlist">
                                <i class="fa-regular fa-heart fa-lg"></i>
                                {/* <i class="fa-solid fa-heart"></i> */}
                            </div>
                        </div>
                    </div>
                </div>
                <BannerSection />
                <AllProducts/>
                {/* <AddProduct /> */}
            </div>
        </>
    )
}

export default Home;