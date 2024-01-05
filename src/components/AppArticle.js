import { useStore } from "../zustand.config"
import { useTimestamp } from "../hooks/useTimestamp"
import { AppWidgets } from "./AppWidgets"

export const AppArticle = () => {
    const store = useStore()

    return (
        <>
            <AppWidgets/>

            <div className="flex flex-col items-center m-auto w-full">

                <div className="flex flex-col gap-[2rem] justify-between p-[2rem] mb-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <div className="flex flex-col items-center gap-[.5rem]">

                        <span className="font-['Material_icons'] text-xl leading-none">article</span>
                        <p className="_text-discounts-white">Aktualności</p>

                    </div>

                    {store.article?.map(e => e.status === "aktualne" &&

                        <div className="flex flex-col gap-[.5rem]" key={e.id}>

                            <p className="_text-discounts-white">{e.nazwa}</p>
                            <p className="whitespace-pre-line">{e.opis.split("  ").join("\n")}</p>
                            <p className="italic text-right">{useTimestamp(e.createdAt)}</p>

                        </div>

                    )}

                </div>
                
            </div>
        </> 
    )
}
  