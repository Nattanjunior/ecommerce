'use client'

import Image from "next/image";
import { useEffect, useState } from 'react'


export default function Home() {
  const [productsInfo, setproductsInfo] = useState([])
  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setproductsInfo(data))
  }, [])

  const categoriesName = productsInfo.map(p => {

  })

  return (
    <div className="p-5">
      <section>
        <h2 className="text-2xl">Mobiles</h2>
        <div className="py-4">
          <div className="w-64">
            <div className="bg-blue-100 p-5 rounded-xl">
              <Image src='/products/iphone.png' alt=""
                width={1000}
                height={1000}
              />
            </div>
            <div className="mt-2">
              <h3 className="font-bold text-lg">Iphone 14 Pro</h3>
              <p className="text-sm mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, laborum voluptates quis recusandae repellat ullam fugiat, beatae voluptate illo dicta mollitia? </p>
            </div>
            <div className="flex mt-1">
              <p className="text-2xl font-bold grow">$899</p>
              <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl">+</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
