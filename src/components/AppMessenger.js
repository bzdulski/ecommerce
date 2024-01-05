import { useStore } from "../zustand.config"
import { useTimestamp } from "../hooks/useTimestamp"
import { AppWidgets } from "./AppWidgets"

export const AppMessenger = () => {
    const store = useStore()

    return (
        <>
            <AppWidgets/>

            <div className="flex flex-col items-center m-auto w-full">

                <div className="flex flex-col gap-[2rem] justify-between p-[2rem] mb-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <div className="flex flex-col items-center gap-[.5rem]">

                    <span className="font-['Material_icons'] text-xl leading-none">chat</span>
                    <p className="_text-discounts-white">Komunikator</p>
                    <h1 className="m-auto font-bold text-[#ea5455] italic">WERSJA TESTOWA</h1>

                    </div>

                    {!store.auth && <p className="">Rejestracja na naszej stronie daje Ci dostęp do ekskluzywnych funkcji, takich jak tworzenie profilu, przeglądanie ofert, komunikacja z innymi użytkownikami oraz składanie zamówień. Będziesz mógł/mogła łatwo zarządzać swoim kontem i korzystać z naszych usług w sposób spersonalizowany.</p>}
                    {store.auth && 
                        <>
                            <div className="flex flex-col gap-[.5rem] w-full">

                            <p className="font-bold text-[#ffffff]">Czat 1</p>

                            <p className=""><b className="text-[#dcde43]">Instalator:</b> Chciałbym umówić się z Tobą na spotkanie, aby dokładnie omówić Twoje potrzeby oraz przedstawić nasze rozwiązania. Podczas tego spotkania będę mógł również odpowiedzieć na wszystkie pytania, jakie masz na temat procesu instalacji, czasu wykonania oraz kosztów.</p>
                            <p className=""><b className="text-[#dcde43]">Instalator:</b> Proszę, daj mi znać, jaki termin i godzina pasują Ci najlepiej, abyśmy mogli ustalić spotkanie. Chętnie dostosuję się do Twojego harmonogramu.</p>
                            <p className=""><b className="text-[#00cfe8]">Klient:</b> Dziękuję za szybką odpowiedź. Jestem zainteresowany zleceniem dotyczącym instalacji systemu alarmowego w moim domu.</p>
                            <p className=""><b className="text-[#00cfe8]">Klient:</b> Najlepszy termin dla mnie to poniedziałek. Proszę potwierdź, czy jest on dostępny, a ja dostosuję swój plan, abyśmy mogli się spotkać.</p>

                            </div>

                            <div className="flex flex-col gap-[.5rem] w-full">

                            <p className="font-bold text-[#ffffff]">Czat 2</p>

                            <p className=""><b className="text-[#dcde43]">Instalator:</b> Przeglądając szczegóły Twojego zlecenia, zauważyłem, że potrzebujesz profesjonalnego rozwiązania, które zapewni Ci pełne bezpieczeństwo i spokój. Jestem pewien, że możemy spełnić Twoje oczekiwania i dostarczyć Ci system alarmowy najwyższej jakości.</p>

                            </div>

                        </>
                    }

                </div>
                
            </div>
        </> 
    )
}
  