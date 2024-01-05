import { Nav } from "./Nav"

export const AppFinance = () => {
    return (
        <>
            <Nav render="account"/>
            
            <div className="flex flex-col items-center m-auto w-full">

                <div className="flex flex-col gap-[2rem] items-center justify-between p-[2rem] mb-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <div className="flex w-full justify-between">
                        <p className="_text-discounts-white">PLN</p>
                        <p className="_text-discounts">0.00 zł</p>
                    </div>
                    <button className="_button-cart-red text-center">Doładuj środki</button>

                </div>

                {/* <div className="flex flex-col gap-[2rem] items-center justify-between p-[2rem] mb-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <div className="flex w-full justify-between">
                        <p className="_text-discounts">Kryptowaluta</p>
                        <p className="_text-discounts">0.00 BTC</p>
                    </div>

                </div> */}

                <div className="flex flex-col gap-[2rem] items-center justify-between p-[2rem] mb-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <div className="flex w-full justify-between">
                        <p className="_text-discounts-white">Limit kupiecki</p>
                        <p className="_text-discounts">0.00 zł</p>
                    </div>
                    <button className="_button-cart-red text-center">Wystąp o limit kupiecki</button>

                </div>

            </div>
        </> 
    )
}
  