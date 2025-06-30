import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'

const ProductItem = ({id,image,name,price}) => {
    const {currency} = useContext(ShopContext);
  return (
    <Link
  className="text-gray-700 cursor-pointer rounded-lg shadow-md p-2 hover:shadow-lg transition border"
  style={{ borderColor: '#E6C744' }}
  to={`/product/${id}`}
>

        <div className='overflow-hidden'>
          <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />

        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>

    </Link>
  )
}

export default ProductItem
