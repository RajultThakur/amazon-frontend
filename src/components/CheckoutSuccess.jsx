const CheckoutSuccess = () => {
    return <div className='text-gray-400 gap-0 h-screen customHeight w-[100vw] flex flex-col justify-center items-center'>
        <h1 className="font-bold text-2xl text-green-500">Checkout Successful</h1>
        <h1>Your order might take some time to process.</h1>
        <h1>Check you order status at your profile after about 10mins.</h1>
        <h1>Incase of any inqueries contact the support at <a href="/"><span className="text-black cursor-pointer underline">support@ecommerce.com</span></a></h1>
    </div >
}

export default CheckoutSuccess;