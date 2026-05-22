import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { updateProduct } from "../api/productApi"

const API = "https://api.escuelajs.co/api/v1/products"

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")

  useEffect(() => {
    axios.get(`${API}/${id}`).then(res => {
      const p = res.data
      setTitle(p.title)
      setPrice(p.price)
      setDescription(p.description)
      setImage(p.images?.[0])
    })
  }, [id])

  const handleUpdate = async () => {
    await updateProduct(id, {
      title,
      price: Number(price),
      description,
      images: [image]
    })

    navigate("/")
  }

  return (
    <div>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} />
      <input value={price} onChange={(e)=>setPrice(e.target.value)} />
      <input value={image} onChange={(e)=>setImage(e.target.value)} />
      <input value={description} onChange={(e)=>setDescription(e.target.value)} />

      <button onClick={handleUpdate}>Save</button>
    </div>
  )
}