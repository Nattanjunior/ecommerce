'use client'

import { useDataStore } from "@/components/SelectedProducts"
import { useEffect, useState } from "react"
import type { SchemaProps } from "../../../../models/products"

export default function Checkout() {
  const [productsInfos, setProductsInfos] = useState<SchemaProps[]>([]);
  const selectedProducts = useDataStore(state => state.selectedProducts);
  const setSelectedProducts = useDataStore(state => state.setSelectedProducts);
  const [address, setAdress] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)]
    fetch(`/api/products?ids=${uniqIds.join(',')}`)
      .then(response => response.json())
      .then(data => setProductsInfos(data))
  }, [selectedProducts]);

  function moreOfThisProduct(id: string) {
    setSelectedProducts((prev) => [...prev, id]);
  }

  function lessOfThisProduct(id: string) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prevSelectedProducts) => {
        return prevSelectedProducts.filter((value, index) => index !== pos);
      });
    };
  };

  const deliveryPrice = 5;
  let subTotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const itemPrice = productsInfos.find(p => p._id === id)?.price || 0;
      subTotal += itemPrice;
    }
  }

  const total = subTotal + deliveryPrice;


  return (
    <div className="p-5" >
      {!productsInfos.length && (
        <div>no products in your shopping cart</div>
      )}
      {productsInfos.length && productsInfos.map(productInfo => (
        <div key={productInfo._id} className="flex mb-5">
          <div className="bg-gray-100 p-3 rounded-xl shrink-0">
            <img className="w-24" src={productInfo.picture} alt="image product" />
          </div>
          <div className="pl-4">
            <h3 className="font-bold text-lg">{productInfo.name}</h3>
            <p className="text-sm leading-4 text-gray-500">{productInfo.description}</p>
            <div className="flex">
              <div className="grow">${productInfo.price}</div>
              <div>
                <button onClick={() => lessOfThisProduct(productInfo._id)} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">-</button>
                <span className="px-2">
                  {selectedProducts.filter(id => id === productInfo._id).length}
                </span>
                <button onClick={() => moreOfThisProduct(productInfo._id)} className="bg-emerald-500 px-2 rounded-lg text-white">+</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <form action="/api/checkout" method="POST">
        <section className="mt-4">
          <input name="address" value={address} onChange={e => setAdress(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Street address, number" />
          <input name="city" value={city} onChange={e => setCity(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="City and postal code" />
          <input name="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Your name" />
          <input name="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Email address" />
        </section>

        <section className="mt-4">
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
            <h3 className="font-bold">${subTotal}</h3>
          </div>

          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Delivery:</h3>
            <h3 className="font-bold">${deliveryPrice}</h3>
          </div>

          <div className="flex my-3 border-t-2 pt-3 border-dashed border-emerald-500">
            <h3 className="grow font-bold text-gray-400">Total:</h3>
            <h3 className="font-bold">${total}</h3>
          </div>
        </section>
        <input type="hidden" name="products" value={selectedProducts.join(',')} />
        <button className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg">Pay ${total}</button>
      </form>
    </div>
  )
}