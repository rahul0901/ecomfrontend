import './Men.css';
import { menClothes1, menClothes2, menClothes3, menClothes4 } from './Constants';
import { useEffect, useState } from 'react';
import Home from './Home';

const MenCategory = ({ category, images }) => {
    const [activeImage, setActiveImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handlePrevious = () => {
        setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveImage((prev) => (prev + 1) % images.length);
    };

    useEffect(() => {
        let timer;
        if (isHovered) {
            timer = setInterval(() => {
                handleNext();
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isHovered]);

    useEffect(() => {
        if (!isHovered) {
            setActiveImage(0);
        }
    }, [isHovered]);

    return (
        <div
            className={`men-category-child-${category}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {images?.map((url, i) => (
                <img
                    key={url}
                    src={url}
                    alt=""
                    className={activeImage === i ? 'active' : 'hidden'}
                />
            ))}
            <button onClick={handlePrevious} className="prev-button">
                Prev
            </button>
            <button onClick={handleNext} className="next-button">
                Next
            </button>
        </div>
    );
};

const Men = () => {
    return (
        <>
            <Home/>
            <div className="screen-men">
                <h2>Explore by category</h2>
                <div className="men-category-parent">
                    <MenCategory category="1" images={menClothes1} />
                    <MenCategory category="2" images={menClothes2} />
                    <MenCategory category="3" images={menClothes3} />
                    <MenCategory category="4" images={menClothes4} />
                </div>
            </div>
        </>
    );
};

export default Men;