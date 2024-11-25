import Image from "next/image";
import { useDataStore } from "./SelectedProducts";

interface ParameterProps {
  _id: string,
  name: string,
  price: number,
  description: string,
  picture: string
}

export default function Product({ _id, name, price, description, picture }: ParameterProps) {
  const setSelectedProducts = useDataStore(state => state.setSelectedProducts)

  function addProduct() {
    setSelectedProducts([_id])
  }

  return (
    <div className="w-64 ">
      <div className="bg-blue-100 p-5 rounded-xl">
        <Image src={picture} alt="imagem-produtos"
          width={1000}
          height={100}
        />
      </div>
      <div className="mt-2">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm mt-2 text-gray-500">{description}</p>
      </div>
      <div className="flex mt-1">
        <p className="text-2xl font-bold grow text">${price}</p>
        <button onClick={addProduct} className="bg-emerald-400 text-white py-1 px-3 rounded-xl">+</button>
      </div>
    </div>
  )
}