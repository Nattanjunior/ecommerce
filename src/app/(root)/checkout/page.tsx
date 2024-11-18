'use client'

import { useDataStore } from "@/components/SelectedProducts"
import { useEffect, useState } from "react"
import type { SchemaProps } from "../../../../models/products"

export default function Checkout() {
  const [productInfo, setProductsInfo] = useState<SchemaProps[]>([])
  const selectedProducts = useDataStore(state => state.selectedProducts)
  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)]
    fetch(`/api/products?ids=${uniqIds.join(',')}`)
      .then(response => response.json())
      .then(data => setProductsInfo(data));
  }, [selectedProducts])
  return (
    <>
      <div>
        {selectedProducts.join(',')}
      </div>
    </>
  )
}