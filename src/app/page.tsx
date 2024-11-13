'use client'

import Image from "next/image";
import { useEffect, useState } from 'react'
import type { SchemaProps } from "../../models/products";
import Product from "../../components/products";


export default function Home() {
  const [productsInfo, setProductsInfo] = useState<SchemaProps[]>([])
  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProductsInfo(data))
  }, [])

  const categoriesName = [...new Set(productsInfo.map((p) => p.category))]

  return (
    <div className="p-5">
      <section>
        {categoriesName.map(categoryName => (
          <div key={categoryName}>
            <h2 className="text-2xl capitalize">{categoryName}</h2>
            <div className="flex -mx-5 overflow-x-scroll">
              {productsInfo.filter(p => p.category === categoryName).map(productInfo => (
                <div key={productInfo.id} className="px-5">
                  <Product
                    name={productInfo.name}
                    price={productInfo.price}
                    description={productInfo.description}
                    picture={productInfo.picture}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* <div className="py-4">
        </div> */}
      </section>
    </div>
  );
}
