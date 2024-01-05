import { useStore } from "../zustand.config"

import { Nav } from "./Nav"

export const AppDiscounts = () => {
    const store = useStore()

    return (
        <>
            <Nav render="account"/>
            
            <div className="flex flex-col items-center m-auto w-full">

                <div className="flex items-center justify-between p-[2rem] mb-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <p className="_text-discounts">Producenci</p>
                    <p className="_text-discounts-white">Rabaty</p>

                </div>

                {store.auth?.rabaty?.map((e, i) => (

                    <div className="flex items-center justify-between p-[2rem] mb-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]"
                        key={i}>

                        <p className="">{e.producer}</p>
                        <p className="">{e.percent} %</p>

                    </div>

                ))}

                {/* {store.producer?.map(e => (

                    <div className="flex items-center justify-between p-[2rem] mb-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]"
                        key={e.id}>

                        <p className="">{e.nazwa}</p>
                        <p className="">{store.auth.rabaty.find(x => x.producer === e.nazwa) ? `${store.auth.rabaty.find(x => x.producer === e.nazwa)?.percent} %` : "-"}</p>

                    </div>
                    
                ))} */}

            </div>
        </> 
    )
}
  