import { Link } from "react-router-dom"

export const AppRegisterInstalator = () => {
    return ( 
        <div className="flex items-center justify-center w-[1000px] m-auto">
                
            <div className="flex gap-[2rem] flex-col items-center justify-between p-[2rem] mb-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                <p className="_text-discounts-white">Informacja</p>
                
                <div className="flex flex-col items-center text-center gap-[1rem]">
                    <p>Zarejestruj się jako instalator aby móc podejmować zlecenia!</p>
                </div>

                <Link className="_button-cart-pink-block" to="/zlecenia">Powrót do zleceń</Link>

            </div>
        </div>
    )
}