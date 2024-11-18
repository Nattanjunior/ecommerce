'use client'

import { useEffect, useState } from 'react'
import type { SchemaProps } from "../../models/products";
import Product from "../components/products";


export default function Home() {
  const [productsInfo, setProductsInfo] = useState<SchemaProps[]>([])
  const [phrase, setPhrase] = useState('')
  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProductsInfo(data))
  }, [])

  const categoriesName = [...new Set(productsInfo.map((p) => p.category))]

  let products;
  if (phrase) {
    products = productsInfo.filter(p => p.name.toLocaleLowerCase().includes(phrase));
  } else {
    products = productsInfo;
  }

  return (
    <div className="p-5">
      <input type="text" value={phrase} onChange={e => setPhrase(e.target.value)} placeholder='Search for products...' className='bg-gray-100 w-full py-2 px-4 rounded-xl outline-none text-black' />
      <main>
        {categoriesName.map(categoryName => (
          <section key={categoryName}>
            {products.find(p => p.category === categoryName) && (
              <div>
                <h2 className="text-2xl py-5 capitalize">{categoryName}</h2>
                <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                  {products.filter(p => p.category === categoryName).map((productInfo, index) => (
                    <div key={index} className="px-5 snap-start">
                      <Product
                        _id={productInfo._id}
                        name={productInfo.name}
                        price={productInfo.price}
                        description={productInfo.description}
                        picture={productInfo.picture}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}

