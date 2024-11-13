import Image from "next/image";

interface ParameterProps {
  name: string,
  price: number,
  description: string,
  picture: string
}

export default function Product({ name, price, description, picture }: ParameterProps) {
  return (
    <div className="w-64">
      <div className="bg-blue-100 p-5 rounded-xl">
        <Image src={picture} alt="imagem-produtos"
          width={1000}
          height={100}
        />
      </div>
      <div className="mt-2">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm mt-2">{description}</p>
      </div>
      <div className="flex mt-1">
        <p className="text-2xl font-bold grow">${price}</p>
        <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl">+</button>
      </div>
    </div>
  )
}