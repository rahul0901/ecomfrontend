import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './AllProducts.css'

const AllProducts = () => {

    const [products, setProducts] = useState(0);

    useEffect(() => {

        async function getProducts() {
            try {

                const { data } = await axios.get('http://localhost:8000/api/v1/products/all-products')

                if (data.success) {
                    setProducts(data.product)
                }
                else {
                    toast.error(data.message)
                }

            } catch (error) {
                toast.error(error.data.message)
            }
        }
        getProducts()
    }, [])

    return (
        <>
            <div className="screen-all-products">
                <div className="all-products">
                    <div className="all-products-intro">
                        <h2>Trending Clothes</h2>
                        <a>See All</a>
                    </div>
                    <div className="all-products-cart-parent">
                        {products.length ? (
                            products.map((item, index) => (
                                <div
                                    key={index}
                                    className={`all-products-cart-child`}
                                >
                                    {/* <div key={index}>
                                        {item.pimages.map((image, i) => (
                                            <img key={i} src={image} alt="" />
                                        ))}
                                    </div> */}
                                    <img src={item.pimages} alt="" />
                                    <h4>{item.pname}</h4>
                                    <p>{item.pdescription}</p>
                                    <p>₹{item.pprice}</p>
                                    <h4>{item.pcategory}</h4>
                                </div>
                            ))
                        ) : (
                            <div className="sk-chase">
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='prod-main'>

            </div>

            {/* {products?.length ? <div className='prod-main'>{products.map((item, index) => (
                <div key={index} className='prod-child'>
                    {item.pimages.map((image, i) => (
                        <img key={i} src={image} alt={`Product ${index} Image ${i}`} />
                    ))}
                    <h4>{item.pname}</h4>
                    <p>{item.pdescription}</p>
                    <p>₹{item.pprice}</p>
                    <h4>{item.pcategory}</h4>
                </div>
            ))}</div> : <div class="sk-chase">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>} */}

        </>
    )
}

export default AllProducts;