import { useState, useEffect } from "react"
import { useStore } from "../zustand.config"

export const AppHome = () => {
    const [currentTime, setCurrentTime] = useState(new Date())
    const store = useStore()
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date())
      }, 1000)
  
      return () => clearInterval(interval)
    }, [])

    const formattedTimeHours = currentTime.toLocaleTimeString([], { hour: "2-digit" })
    const formattedTimeMinutes = currentTime.toLocaleTimeString([], { minute: "2-digit" })
    const formattedTimeSeconds = currentTime.toLocaleTimeString([], { second: "2-digit" })

    const formattedDateDay = currentTime.toLocaleDateString([], { day: "2-digit" })
    const formattedDateMonth = currentTime.toLocaleDateString([], { month: "2-digit" })
    const formattedDateYear = currentTime.toLocaleDateString([], { year: "numeric" })

    return (
        <div className="flex flex-col items-center justify-center w-full m-auto mt-0">
            <div className="flex flex-col p-[5rem] items-center justify-center m-auto mt-0 mb-[2rem] h-[8rem] rounded-[2rem] border-[.1rem] border-[#123456] shadow-[inset_0_0_1rem_0_#123456] backdrop-blur-[.3rem]">

                <div className="flex text-[3rem]">
                    <p className="">{formattedTimeHours}</p>
                    <p className="">:</p>
                    <p className="">{formattedTimeMinutes}</p>
                    <p className="">:</p>
                    <p className="">{formattedTimeSeconds}</p>
                </div>

                <div className="flex text-[3rem]">
                    <p className="">{formattedDateDay}</p>
                    <p className="">.</p>
                    <p className="">{formattedDateMonth}</p>
                    <p className="">.</p>
                    <p className="">{formattedDateYear}</p>
                </div>

            </div>

            {store.alert === 1 && 
                <div className="flex gap-[2rem] flex-col items-center justify-center m-auto mt-0 p-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <div className="flex flex-col items-center text-center gap-[1rem]">
                        <p className="_text-discounts-white">Dziękujemy za rejestrację!</p>
                        <p>Wysłaliśmy maila weryfikacyjnego proszę go potwierdzić aby móc w pełni korzystać z aplikacji!</p>
                    </div>

                    <button className="absolute top-0 right-0 p-[1rem] font-['Material_icons']" onClick={() => store.alertSet(0)}>close</button>

                </div>
            }

            {store.alert === 2 && 
                <div className="flex gap-[2rem] flex-col items-center justify-center m-auto mt-0 p-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <div className="flex flex-col items-center text-center gap-[1rem]">
                        <p className="_text-discounts-white">Dziękujemy za weryfikację listu!</p>
                        <p>Zostałeś zweryfikowanym instalatorem możesz w pełni korzystać z jego funkcji!</p>
                    </div>

                    <button className="absolute top-0 right-0 p-[1rem] font-['Material_icons']" onClick={() => store.alertSet(0)}>close</button>

                </div>
            }

            {store.alert === 3 && 
                <div className="flex gap-[2rem] flex-col items-center justify-center m-auto mt-0 p-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <div className="flex flex-col items-center text-center gap-[1rem]">
                        <p className="_text-discounts-white">Dziękujemy za zmianę danych!</p>
                        <p>Wysłaliśmy mailem potwierdzenie o zmianie danych!</p>
                    </div>

                    <button className="absolute top-0 right-0 p-[1rem] font-['Material_icons']" onClick={() => store.alertSet(0)}>close</button>

                </div>
            }

            {store.alert === 4 && 
                <div className="flex gap-[2rem] flex-col items-center justify-center m-auto mt-0 p-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <div className="flex flex-col items-center text-center gap-[1rem]">
                        <p className="_text-discounts-white">Dziękuje za reset hasła!</p>
                        <p>Wysłaliśmy maila w którym zmienisz swoje hasło!</p>
                    </div>

                    <button className="absolute top-0 right-0 p-[1rem] font-['Material_icons']" onClick={() => store.alertSet(0)}>close</button>

                </div>
            }

            {store.alert === 5 && 
                <div className="flex gap-[2rem] flex-col items-center justify-center m-auto mt-0 p-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <div className="flex flex-col items-center text-center gap-[1rem]">
                        <p className="_text-discounts-white">Dziękuje za zmianę hasła!</p>
                        <p>Wysłaliśmy maila z potwierdzeniem o zmianie hasła!</p>
                    </div>

                    <button className="absolute top-0 right-0 p-[1rem] font-['Material_icons']" onClick={() => store.alertSet(0)}>close</button>

                </div>
            }

            {store.alert === 6 && 
                <div className="flex gap-[2rem] flex-col items-center justify-center m-auto mt-0 p-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <div className="flex flex-col items-center text-center gap-[1rem]">
                        <p className="_text-discounts-white">Dziękuje za zakup robocizny!</p>
                        <p>Wysłaliśmy maila z danymi do przelewu na maila!</p>
                    </div>

                    <button className="absolute top-0 right-0 p-[1rem] font-['Material_icons']" onClick={() => store.alertSet(0)}>close</button>

                </div>
            }


        </div>
    )
}