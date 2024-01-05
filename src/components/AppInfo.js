import { useStore } from "../zustand.config"
import { useTimestamp } from "../hooks/useTimestamp"
import { AppWidgets } from "./AppWidgets"

export const AppInfo = () => {
    const store = useStore()

    return (
        <>
            <AppWidgets/>

            <div className="flex flex-col items-center m-auto w-full">

                <div className="flex flex-col gap-[2rem] justify-between p-[2rem] mb-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <div className="flex flex-col items-center gap-[.5rem]">

                        <span className="font-['Material_icons'] text-xl leading-none">info</span>
                        <p className="_text-discounts-white">Info</p>

                    </div>

                    {!store.auth && <p className="">Rejestracja na naszej stronie daje Ci dostęp do ekskluzywnych funkcji, takich jak tworzenie profilu, przeglądanie ofert, komunikacja z innymi użytkownikami oraz składanie zamówień. Będziesz mógł/mogła łatwo zarządzać swoim kontem i korzystać z naszych usług w sposób spersonalizowany.</p>}
                    {store.auth && <p>Chcielibyśmy poinformować, że aby w pełni korzystać z wszystkich funkcji i usług naszej platformy, konieczne jest zweryfikowanie Twojego konta.</p>}
                    {store.auth && <p className="">Weryfikacja konta ma na celu potwierdzenie Twojej tożsamości i zapewnienie bezpieczeństwa dla wszystkich użytkowników. Po weryfikacji będziesz miał dostęp do dodatkowych funkcji, takich jak komunikacja z innymi użytkownikami, składanie ofert i otrzymywanie powiadomień o nowych zleceniach.</p>}

                </div>
                
            </div>
        </> 
    )
}
  