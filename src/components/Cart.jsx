import { useContext, useEffect, useMemo, useState } from "react";
import { useCartContext } from "../contexts/useCartContext";


const Cart = () => {
    // const item = {
    //     product: { "id": 1, "title": "Essence Mascara Lash Princess", "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.", "category": "beauty", "price": 9.99, "discountPercentage": 10.48, "rating": 2.56, "stock": 99, "tags": ["beauty", "mascara"], "brand": "Essence", "sku": "BEA-ESS-ESS-001", "weight": 4, "dimensions": { "width": 15.14, "height": 13.08, "depth": 22.99 }, "warrantyInformation": "1 week warranty", "shippingInformation": "Ships in 3-5 business days", "availabilityStatus": "In Stock", "reviews": [{ "rating": 3, "comment": "Would not recommend!", "date": "2025-04-30T09:41:02.053Z", "reviewerName": "Eleanor Collins", "reviewerEmail": "eleanor.collins@x.dummyjson.com" }, { "rating": 4, "comment": "Very satisfied!", "date": "2025-04-30T09:41:02.053Z", "reviewerName": "Lucas Gordon", "reviewerEmail": "lucas.gordon@x.dummyjson.com" }, { "rating": 5, "comment": "Highly impressed!", "date": "2025-04-30T09:41:02.053Z", "reviewerName": "Eleanor Collins", "reviewerEmail": "eleanor.collins@x.dummyjson.com" }], "returnPolicy": "No return policy", "minimumOrderQuantity": 48, "meta": { "createdAt": "2025-04-30T09:41:02.053Z", "updatedAt": "2025-04-30T09:41:02.053Z", "barcode": "5784719087687", "qrCode": "https://cdn.dummyjson.com/public/qr-code.png" }, "images": ["https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"], "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp" },
    //     quantity: 5,
    // }
    // const [cartProducts, setCartProducts] = useState([item]);
    const {cartProducts, setCartProducts} = useContext(useCartContext);
    const [total, setTotal] = useState(0);
    
    useEffect(()=>{
        let sum = 0;
        cartProducts.forEach((prod)=>{
            sum += (prod.product.price*prod.quantity);
        })
        setTotal(sum);
    })

    return (
        <div className="min-h-screen bg-gray-300">
            <div className="container mx-auto p-10 max-w-screen-lg">
                <div className="bg-white rounded shadow p-8">
                    <div>
                        <h3 className="text-xl mt-4 font-bold">Order Summary</h3>
                        {cartProducts.length>1 && cartProducts.map((prod, idx) => {
                            if(idx!=0){
                                return (
                                <div className="border w-full rounded mt-5 flex p-4 justify-between items-center flex-wrap">
                                    <img src={prod.product.thumbnail} className="w-12" />
                                    <div className="w-2/3">
                                        <h3 className="text-lg font-medium">{prod.product.title}</h3>
                                    </div>
                                    <div>
                                        <h4 className="text-3xl font-medium"><sup className="text-lg text-purple-800">$</sup> {prod.product.price}</h4>
                                    </div>
                                    <div className="w-full flex justify-between mt-4">
                                        <label className="block uppercase tracking-wide text-gray-700 flex justify-end">
                                            QTY
                                            <p className="ml-3 text-sm bg-purple-700 border border-purple-200 text-white p-2 rounded leading-tight" id="grid-state">
                                                {prod.quantity}
                                            </p>
                                        </label>
                                    </div>
                                </div>
                            )
                            }
                            
                        })}
                    </div>
                    <button className="px-4 py-4 bg-purple-700 text-white w-full mt-3 rounded shadow font-bold hover:bg-purple-900">PROCEED TO CHECKOUT SCREEN</button>
                </div>
                <div className="flex justify-between mt-8 flex-wrap lg:justify-center">
                    <div className="bg-white rounded shadow p-2 w-full lg:w-2/4">
                        <div className="w-full bg-orange-200 px-8 py-6">
                            <h3 className="text-2xl mt-4 font-bold">Price Breakdown</h3>
                            <div className="flex justify-between mt-3">
                                <div className="text-xl text-orange-900 font-bold">Amount</div>
                                <div className='text-xl text-right font-bold '>{total}</div>
                            </div>
                            <div className="bg-orange-300 h-1 w-full mt-3"></div>
                            <div className="flex justify-between mt-3">
                                <div className="text-xl text-orange-900 font-bold">Total Amount</div>
                                <div className="text-2xl text-orange-900 font-bold">${total}</div>
                            </div>
                            <button className="px-4 py-4 bg-purple-700 text-white w-full mt-3 rounded shadow font-bold hover:bg-purple- 900"> CHECKOUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;