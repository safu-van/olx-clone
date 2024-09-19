import React from 'react'

function ProductDetails() {
  return (
    <div className='p-3 h-[30rem]'>
        <div className='h-full flex rounded-md'>
            <div className='bg-black w-3/4 rounded-l-md text-white'>
                <img src="assets/images/imag.jpg" alt="product image" className='object-contain w-full h-full' />
            </div>
            <div className='bg-gray-200 w-1/4 p-3 rounded-r-md'>
                <div className='bg-white h-[60%] rounded-md mt-3 p-3'>
                    <div className='flex flex-col'>
                        <h3 className='underline text-lg font-bold'>Product Details</h3>
                        <span className='pl-2 mt-2'>Product Name</span>
                        <span className='pl-2 mt-1'>$999</span>
                        <span className='pl-2 mt-1'>Category</span>
                        <span className='pl-2 mt-1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</span>
                    </div>
                </div>
                <div className='bg-white h-[30%] rounded-md mt-5 p-3'>
                    <div className='flex flex-col'>
                        <h3 className='underline text-lg font-bold'>Seller Details</h3>
                        <span className='pl-2 mt-1'>Seller Name</span>
                        <span className='pl-2 mt-1'>9123457687</span>
                        <span className='pl-2 mt-1'>example@example.com</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails