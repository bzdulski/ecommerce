import { useStore } from "../zustand.config"
import { Link } from "react-router-dom"

export const AppCart3 = () => {
    const store =  useStore()
    return (
        <div className="flex flex-col items-center m-auto w-full">

            <div className="flex gap-[2rem] flex-col items-center justify-between p-[2rem] mb-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                <p className="_text-discounts-white">Dziękujemy za zamówienie!</p>
                
                {store.typePay === 0 && <p>Widzimy się w punkcie!</p>}
                {store.typePay === 0 && <p>Adres punktu:</p>}
                {store.typePay === 0 && <p>ul. Złota 12, Warszawa 02-222</p>}

                {store.typePay === 1 && <p>Proszę czekać na informację zwrotną jak tylko wyślemy kuriera!</p>}

                {store.typePay === 2 && <p>Dane do przelewu zostały wysłane na maila!</p>}
                {store.typePay === 2 && <p>#0001</p>}
                {store.typePay === 2 && <p className="text-center">Ecommerce<br/>ul. Złota 12<br/>02-222 Warszawa<br/>NIP: 123456789<br/>Regon: 123456789<br/>Numer konta: 22 1111 1111 1111 0000 0000 0000<br/>Bank Pekao</p>}

                {store.typePay === 3 && <p>Proszę wykonać przelew na numer telefonu!</p>}
                {store.typePay === 3 && <p>777 777 777</p>}

                {store.typePay === 4 && <p>Twój stan konta wynosi!</p>}
                {store.typePay === 4 && <p>0.00 zł</p>}

                {store.typePay === 5 && <p>Twój stan konta wynosi!</p>}
                {store.typePay === 5 && <p>0.00 zł</p>}

                <Link className="_button-cart-pink-block" to="/sklep">Kontynuuj zakupy</Link>

            </div>

        </div>
    )
}
  