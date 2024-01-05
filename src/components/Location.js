import { useParams, Link } from "react-router-dom"

export const Location = () => {
    const { idKategoria1, idKategoria2, idKategoria3, idKategoria4, idProdukt } = useParams()

    return (
        <div className="flex flex-wrap font-bold w-[100%] gap-[2rem] text-lg lg:pl-[2rem] lg:pr-[2rem]">

            <Link className="" to={`/sklep`}>Sklep</Link>
            <span className="">&#10157;</span>

            {idKategoria1 && <>

                <Link className="" to={`/sklep/kategoria/${idKategoria1}`}>{idKategoria1}</Link>
                <span className="">&#10157;</span>

            </>}

            {idKategoria2 && <>

                <Link className="" to={`/sklep/kategoria/${idKategoria1}/${idKategoria2}`}>{idKategoria2}</Link>
                <span className="">&#10157;</span>

            </>}

            {idKategoria3 && <>

                <Link className="" to={`/sklep/kategoria/${idKategoria1}/${idKategoria2}/${idKategoria3}`}>{idKategoria3}</Link>
                <span className="">&#10157;</span>

            </>}

            {idKategoria4 &&

                <Link className="" to={`/sklep/kategoria/${idKategoria1}/${idKategoria2}/${idKategoria3}/${idKategoria4}`}>{idKategoria4}</Link>

            }

            {idProdukt &&

                <Link className="" to={`/sklep/produkt/${idProdukt}`}>{idProdukt}</Link>

            }

        </div>
    )
}