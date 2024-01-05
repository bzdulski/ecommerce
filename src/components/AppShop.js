import { useSearchParams, Link } from "react-router-dom"

import { useStore } from "../zustand.config"
import { Location } from "../components/Location"
import { Pagination } from "../components/Pagination"
import { ItemShop } from "../components/ItemShop"
import { Nav } from "./Nav"

export const AppShop = () => {
    const store = useStore()

    const [param, setParam] = useSearchParams()

    const handleRouterResetParam = () => {
        param.delete("search")
        param.delete("producer")
        param.delete("sort")
        setParam(param)
    }

    const handleRouterDeleteParam = (event) => {
        param.delete(event)
        setParam(param)
    }

    const handleRouterAddParam = (event, value) => {
        param.set(event, value)
        setParam(param)
    }

    const handleRouterPageParam = (page) => {
        param.set("page", page)
        setParam(param)
    }

    return (
        <>
            <Nav render="category"/>

            <div className="flex flex-col items-center w-[1000px] m-auto gap-[2rem]">

                <Location/>

                <div className="flex gap-[2rem] lg:flex-col">

                    <input className="_button-cart-input" placeholder='Wyszukiwanie...' value={param.get("search") ? param.get("search") : ""} onChange={(event) => event.target.value === "" ? handleRouterDeleteParam("search") : handleRouterAddParam("search", event.target.value)}/>
                    <select className="_button-cart-input" value={param.get("producer") ? param.get("producer") : ""} onChange={(event) => event.target.value === "" ? handleRouterDeleteParam("producer") : handleRouterAddParam("producer", event.target.value)}>
                        <option className="text-[#000000]" value="">Producenci: Wszyscy</option>
                            {store.producer.map(e =>
                            (
                                <option className="text-[#000000]" key={e.id} value={e.nazwa}>{e.nazwa}</option>
                            ))}
                    </select>
                    <select className="_button-cart-input" value={param.get("sort") ? param.get("sort") : ""} onChange={(event) => event.target.value === "" ? handleRouterDeleteParam("sort") : handleRouterAddParam("sort", event.target.value)}>
                        <option className="text-[#000000]" value="">Sortuj domyślnie</option>
                        <option className="text-[#000000]" value="sortMinToMax">Sortuj cena od najniższej</option>
                        <option className="text-[#000000]" value="sortMaxToMin">Sortuj cena od najwyższej</option>
                        <option className="text-[#000000]" value="sortAToZ">Sortuj od A do Z</option>
                        <option className="text-[#000000]" value="sortZToA">Sortuj od Z do A</option>
                    </select>
                    
                </div>

                <div className="flex justify-center w-[100%] gap-[2rem] lg:flex-col lg:items-center">

                    {/* <button className="_button-cart-blue" type="button" onClick={() => handleRouterResetParam()}>Wyczyść filtry</button> */}
                    <Link className="_button-cart-pink" to="/koszyk">Przejdź do koszyka</Link>

                </div>

                <ItemShop/>

                <Pagination
                    items={store.product.length}
                    currentPage={param.get("page") ? parseFloat(param.get("page")) : 1}
                    pageSize={10}
                    handleRouterPageParam={handleRouterPageParam}/>

            </div>

        </>
    )
}
  