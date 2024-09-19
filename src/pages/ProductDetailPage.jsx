import React from 'react'
import Navbar from '../components/NavBar'
import ProductDetails from '../components/ProductDetails'
import Footer from '../components/Footer'

function ProductDetailPage() {
  return (
    <div>
        <Navbar />
        <div className='mt-28 mb-14 px-5'>
            <ProductDetails />
        </div>
        <Footer />
    </div>
  )
}

export default ProductDetailPage