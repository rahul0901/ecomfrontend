import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {

    const [products, setProducts] = useState({ prodName: '', prodPrice: '', prodDescription: '', prodCategory: '', prodImages: '' })

    console.log(products, 'products')

    const route = useNavigate();

    const handleOnChange = (event) => {
        setProducts({ ...products, [event.target.name]: event.target.value })
    }

    const storeProductData = async (event) => {
        event.preventDefault();
        if (products.prodName && products.prodDescription && products.prodPrice && products.prodImages && products.prodCategory) {

            try {

                const response = await axios.post('http://localhost:8000/api/v1/products/add-product', { pname: products.prodName, pprice: products.prodPrice, pdescription: products.prodDescription, pcategory: products.prodCategory, pimages: products.prodImages })

                // setProducts(response.data.product)

                if (response.data.success) {
                    toast.success(response.data.message)
                    setProducts(response.data.product)
                    // setProducts({ prodName: '', prodPrice: '', prodDescription: '', prodCategory: '', prodImages: '' })
                    route('/home')
                } else {
                    toast.error(response.data.message);
                }

            } catch (error) {
                toast.error(error.response.data.message)
            }

        } else {
            toast.error('All Fields Required!')
        }
    }

    return (
        <>
            <div>Add Product</div>
            <form onSubmit={storeProductData}>
                <label htmlFor="name">Product Name:</label>
                <input type="text" name="prodName" id="name" value={products.prodName} onChange={handleOnChange} /> <br />
                <label htmlFor="price">Product Price:</label>
                <input type="number" name="prodPrice" id="price" value={products.prodPrice} onChange={handleOnChange} /> <br />
                <label htmlFor="description">Product Description:</label>
                <input type="text" name="prodDescription" id="description" value={products.prodDescription} onChange={handleOnChange} /> <br />
                <label htmlFor="name">Product Image:</label>
                <input type="text" name="prodImages" id="name" value={products.prodImages} onChange={handleOnChange} /> <br />
                <label htmlFor="category">Product Category:</label>
                <input type="text" name="prodCategory" id="name" value={products.prodCategory} onChange={handleOnChange} /> <br />
                <input type="submit" value="Add Product" />
            </form>

            {products?.length ? <div>{products.map((item, index) => (
                <div key={index}>
                    <h2>{item.pname}</h2>
                    <p>{item.pdescription}</p>
                    <a>{item.pprice}</a>
                    <p>{item.pcategory}</p>
                    <img src={item.pimages} alt="" />
                </div>
            ))}</div> : <div>Loading</div>}

        </>
    )
}
export default AddProduct;