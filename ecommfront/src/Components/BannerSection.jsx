import React, { useEffect } from 'react';
import './BannerSection.css';
import { useState } from 'react';
import { bannerImage } from './Constants';

const BannerSection = () => {

    const [activeImage, setActiveImage] = useState(0);

    const handlePrevious = () => {
        // previous mai asa set kiya ai apan ne ki yeh kabhi true hi na ho kyuki false mai apan decreament kre usko aur agar true hua toh direct last wala image set hoga..
        setActiveImage(!activeImage ? bannerImage.length - 1 : activeImage - 1);
    }

    const handleNext = () => {
        setActiveImage((activeImage + 1) % bannerImage.length);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleNext();
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, [activeImage])


    return (
        <>
            <div className="screen-banner">
                <div className="banner-child">
                    <div className="banner-child-offer">
                        <p>New Year</p>
                        <p>Big Sale!</p>
                        <span>up to 60% off</span>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae et in quisquam beatae voluptatibus praesentium doloribus reprehenderit odit expedita! laborum nisi eaque.</p>
                        <button>shop now</button>
                    </div>
                    <div className="banner-child-image">

                        {bannerImage.map((url, i) => (
                            <img key={i} src={url} alt="" className={activeImage === i ? 'active' : 'hidden'} />
                        ))}
                        <button onClick={handlePrevious} className="prev-button">
                            <i class="fa-solid fa-chevron-left fa-xl"></i>
                        </button>
                        <button onClick={handleNext} className="next-button">
                            <i class="fa-solid fa-chevron-right fa-xl"></i>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default BannerSection;

{/* <img key={url} src={url} alt="" className={activeImage === i ? 'block' : 'hidden'} /> */ }