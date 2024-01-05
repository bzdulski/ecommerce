import { useStore } from "../zustand.config"
import { useLocation, useNavigate } from "react-router-dom"
import { useTimestamp } from "../hooks/useTimestamp"

export const AppWidgets = () => {
    const store = useStore()
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className=" absolute flex flex-col items-center gap-[2rem] left-0 w-[20rem] mobile:w-full">

            <div className={location.pathname === "/informacje" ? 
                "peer/info hover:text-[#ffffff] top-[15rem] gap-[2rem] flex-col items-center left-0 flex p-[1rem] w-full max-w-[20rem] h-[3.5rem] bg-[#00000040] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] shadow-[0_0_2rem_0_#ea5455,inset_0_0_5rem_0_#ffffff40] cursor-pointer"
                :
                "peer/info hover:text-[#ffffff] top-[30rem] gap-[2rem] flex-col items-center left-0 flex p-[1rem] w-full max-w-[20rem] h-[3.5rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] hover:shadow-[0_0_1rem_0_#ea5455,inset_0_0_5rem_0_#ffffff40] cursor-pointer"}
                onClick={() => navigate("/informacje")}> 

                <div className="flex items-center gap-[.5rem]">

                    <span className="font-['Material_icons'] text-xl leading-none">info</span>
                    <p className="font-bold">Info</p>

                </div>

            </div>




            <div className={location.pathname === "/aktualnosci" ? 
                "peer/article hover:text-[#ffffff] top-[15rem] gap-[2rem] flex-col items-center left-0 flex p-[1rem] w-full max-w-[20rem] h-[3.5rem] bg-[#00000040] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] shadow-[0_0_2rem_0_#ea5455,inset_0_0_5rem_0_#ffffff40] cursor-pointer"
                :
                "peer/article hover:text-[#ffffff] top-[30rem] gap-[2rem] flex-col items-center left-0 flex p-[1rem] w-full max-w-[20rem] h-[3.5rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] hover:shadow-[0_0_1rem_0_#ea5455,inset_0_0_5rem_0_#ffffff40] cursor-pointer"}
                onClick={() => navigate("/aktualnosci")}> 

                <div className="flex items-center gap-[.5rem]">

                    <span className="font-['Material_icons'] text-xl leading-none">article</span>
                    <p className="font-bold">Aktualności</p>

                </div>

            </div>



            <div className={location.pathname === "/koszyk" ? 
                "peer/cart hover:text-[#ffffff] top-[15rem] gap-[2rem] flex-col items-center left-0 flex p-[1rem] w-full max-w-[20rem] h-[3.5rem] bg-[#00000040] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] shadow-[0_0_2rem_0_#ea5455,inset_0_0_5rem_0_#ffffff40] cursor-pointer"
                :
                "peer/cart hover:text-[#ffffff] top-[30rem] gap-[2rem] flex-col items-center left-0 flex p-[1rem] w-full max-w-[20rem] h-[3.5rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] hover:shadow-[0_0_1rem_0_#ea5455,inset_0_0_5rem_0_#ffffff40] cursor-pointer"}
                onClick={() => navigate("/koszyk")}>

                <div className="flex items-center gap-[.5rem]">

                    <span className="font-['Material_icons'] text-xl leading-none">shopping_cart</span>
                    <p className="font-bold">Koszyk</p>

                </div>

            </div>





            <div className={location.pathname === "/komunikator" ? 
                "peer/chat hover:text-[#ffffff] top-[15rem] gap-[2rem] flex-col items-center left-0 flex p-[1rem] w-full max-w-[20rem] h-[3.5rem] bg-[#00000040] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] shadow-[0_0_2rem_0_#ea5455,inset_0_0_5rem_0_#ffffff40] cursor-pointer"
                :
                "peer/chat hover:text-[#ffffff] top-[30rem] gap-[2rem] flex-col items-center left-0 flex p-[1rem] w-full max-w-[20rem] h-[3.5rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] hover:shadow-[0_0_1rem_0_#ea5455,inset_0_0_5rem_0_#ffffff40] cursor-pointer"}
                onClick={() => navigate("/komunikator")}>

                <div className="flex items-center gap-[.5rem]">

                    <span className="font-['Material_icons'] text-xl leading-none">chat</span>
                    <p className="font-bold">Komunikator</p>

                </div>

            </div>




            <div className={location.pathname === "/" ? 
                "peer/finance hover:text-[#ffffff] top-[15rem] gap-[2rem] flex-col items-center left-0 flex p-[1rem] w-full max-w-[20rem] h-[3.5rem] bg-[#00000040] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] shadow-[0_0_2rem_0_#ea5455,inset_0_0_5rem_0_#ffffff40] cursor-pointer"
                :
                "peer/finance hover:text-[#ffffff] top-[30rem] gap-[2rem] flex-col items-center left-0 flex p-[1rem] w-full max-w-[20rem] h-[3.5rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] hover:shadow-[0_0_1rem_0_#ea5455,inset_0_0_5rem_0_#ffffff40] cursor-pointer"}
                onClick={() => navigate("/konto/finanse")}>

                <div className="flex items-center gap-[.5rem]">

                    <span className="font-['Material_icons'] text-xl leading-none">payment</span>
                    <p className="font-bold">Portfel</p>

                </div>

            </div>


        </div>
    )
}