export const AppMain = ({ render, children }) => {
    let className

    switch(render) {
        case "isLoading": { className = "flex h-[100vh] items-center justify-center"; break}
        case "isLoaded": { className = "flex min-h-[100vh] pt-[11.5rem] pb-[2rem] mobile:pt-[8rem]"; break}
    }

    return ( 
        <main className={className}>
            {children}
        </main>
    )
}