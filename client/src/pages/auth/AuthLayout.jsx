import { Outlet } from 'react-router-dom';
import "../../assets/css/auth-layout.css"
import image from "../../assets/image/auth1.svg"

const Seperator = () => {
    return (
        <div className='h-full lg:flex hidden items-center absolute left-[45%] -translate-x-2/3'>
            <div className='h-2/3 bg-slate-300' style={{ width: "1px"}}></div>
            <div className='shadow-animation w-6 h-6 rounded-full absolute bg-teal-400 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'></div>
        </div>
    )
}

export default function AuthLayout() {
    return (
        <div className='min-h-screen w-full flex justify-center items-center flex-col layout-container relative'>
            <div className='flex bg-white relative xl:w-2/3 lg:w-3/4 rounded-md overflow-hidden shadow-2xl h-[36rem]'>
                <div className='flex-1 lg:flex hidden justify-center items-center h-full'>
                    <img src={image} alt="login" className='h-80' />
                </div>
                <Seperator />
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}