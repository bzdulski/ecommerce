import { useSearchParams } from "react-router-dom"

export const Pagination = ({ items, pageSize, currentPage, handleRouterPageParam }) => {
  const [param, setParam] = useSearchParams()

    const pagesCount = Math.ceil(items / pageSize)
    //const pagesCount = Math.ceil(items / pageSize)
   
    if (pagesCount === 1) return null
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
   
    return (

    <div className="flex gap-[1rem]">

      {pages.map((page) => (

        <a key={page} className={page === parseFloat(param.get(`page`)) ? "_pagination-active" : "_pagination"} onClick={() => handleRouterPageParam(page)}>
          {page}
        </a>

      ))}

    </div>
  )
}