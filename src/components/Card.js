import React, { useRef, useState, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    const dispatch = useDispatchCart();
    const data = useCart();
    const priceRef = useRef();
    const options = props.options;
    const priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(priceOptions[0] || ""); // Set the default size to the first option

    const handleAddToCart = async () => {
        const food = data.find(item => item._id === props.foodItem._id && item.size === size);
        
        if (food) {
            await dispatch({
                type: "UPDATE", 
                id: props.foodItem._id, 
                price: finalPrice, 
                qty: qty
            });
        } else {
            await dispatch({
                type: "ADD",
                id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalPrice,
                qty: qty,
                size: size,
                img: props.foodItem.img
            });
        }
    };

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceOptions[0]); // Update size whenever options change
    }, [priceOptions]);

    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                <img style={{ height: "120px", objectFit: "fill" }}
                    src={props.foodItem.img}
                    className="card-img-top"
                    alt="..."
                />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text">This is some important text</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success' onChange={(e) => { setQty(e.target.value) }}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => { setSize(e.target.value) }}>
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            Rs.{finalPrice}/-
                        </div>
                        <hr />
                        <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
