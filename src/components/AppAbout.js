export const AppAbout = () => {
    return (
        <div className="flex flex-col items-center m-auto w-full">

            <div className="flex flex-col justify-between gap-[2rem] p-[2rem] mb-[2rem] w-full max-w-[900px] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                <h1 className="text-xl m-auto font-bold text-[#ffffff]">O nas</h1>
                <h2 className="m-auto font-bold text-[#ea5455] italic">WERSJA TESTOWA</h2>

                <p>Dzięki naszej platformie możesz szybko i skutecznie naprawić lub wykonać instalcję. Korzystając ze zleceń znajdziesz instalatora oraz wspólnie wybierzecie produkty w naszym sklepie.</p>

                {/* <div className="flex flex-col gap-[.5rem]">

                    <div className="flex gap-[1rem]">

                        <p className="text-xl font-bold">1</p>
                        <p className="text-xl font-bold text-[#ffffff]">Dane, które gromadzimy</p>

                    </div>

                    <p className="">• Dane osobowe: Podczas odwiedzania naszej Strony możemy zbierać dane osobowe, które dobrowolnie nam udostępniasz, takie jak imię, adres e-mail oraz inne informacje, które decydujesz się nam przekazać za pośrednictwem formularzy kontaktowych lub rejestracji konta.</p>
                    <p className="">• Dane gromadzone automatycznie: Możemy zbierać pewne informacje automatycznie podczas odwiedzania naszej Strony, w tym adres IP, rodzaj przeglądarki, strony odesłania/wyjścia oraz system operacyjny. Informacje te pomagają nam analizować trendy, administrować stronę, śledzić ruch użytkowników i zbierać dane demograficzne.</p>

                </div>

                <div className="flex flex-col gap-[.5rem]">

                    <div className="flex gap-[1rem]">

                        <p className="text-xl font-bold">2</p>
                        <p className="text-xl font-bold text-[#ffffff]">Wykorzystanie zebranych danych</p>

                    </div>

                    <p className="">• Świadczenia i personalizacji naszych usług dla Ciebie.</p>
                    <p className="">• Komunikacji z Tobą, odpowiadania na zapytania i udzielania wsparcia klienta.</p>
                    <p className="">• Poprawy naszej Strony i usług, analizowania wzorców korzystania i ulepszania doświadczenia użytkownika.</p>
                    <p className="">• Wysyłania okresowych wiadomości e-mail, biuletynów lub materiałów promocyjnych dotyczących naszych usług (możesz w dowolnym momencie zrezygnować).</p>

                </div>

                <div className="flex flex-col gap-[.5rem]">

                    <div className="flex gap-[1rem]">

                        <p className="text-xl font-bold">3</p>
                        <p className="text-xl font-bold text-[#ffffff]">Udostępnianie i ujawnianie danych</p>

                    </div>

                    <p className="">• Możemy udostępniać Twoje dane osobowe podmiotom trzecim, które pomagają nam w prowadzeniu Strony, prowadzeniu działalności lub świadczeniu usług, pod warunkiem odpowiednich zobowiązań zachowania poufności.</p>
                    <p className="">• Możemy ujawnić dane osobowe w przypadku, gdy jest to wymagane przez prawo, nakaz sądowy lub organ administracji publicznej.</p>

                </div>

                <div className="flex flex-col gap-[.5rem]">

                    <div className="flex gap-[1rem]">

                        <p className="text-xl font-bold">4</p>
                        <p className="text-xl font-bold text-[#ffffff]">Okres przechowywania danych</p>

                    </div>

                    <p className="">• Przechowujemy dane osobowe przez czas niezbędny do realizacji celów określonych w niniejszej Polityce Prywatności, chyba że przewidziany jest dłuższy okres przechowywania lub jest to wymagane przez prawo.</p>

                </div>

                <div className="flex flex-col gap-[.5rem]">

                    <div className="flex gap-[1rem]">

                        <p className="text-xl font-bold">5</p>
                        <p className="text-xl font-bold text-[#ffffff]">Bezpieczeństwo danych</p>

                    </div>

                    <p className="">• Wdrażamy odpowiednie środki bezpieczeństwa w celu ochrony przed nieuprawnionym dostępem, zmianą, ujawnieniem lub zniszczeniem Twoich danych osobowych.</p>
                    <p className="">• Należy jednak pamiętać, że żadna metoda przesyłania danych przez internet lub przechowywania danych elektronicznych nie jest w 100% bezpieczna i nie możemy zagwarantować absolutnego bezpieczeństwa.</p>

                </div>

                <div className="flex flex-col gap-[.5rem]">

                    <div className="flex gap-[1rem]">

                        <p className="text-xl font-bold">6</p>
                        <p className="text-xl font-bold text-[#ffffff]">Linki do stron trzecich</p>

                    </div>

                    <p className="">• Nasza Strona może zawierać linki do stron internetowych osób trzecich. Niniejsza Polityka Prywatności nie dotyczy tych stron, dlatego zachęcamy do zapoznania się z ich odpowiednimi politykami prywatności.</p>

                </div>

                <div className="flex flex-col gap-[.5rem]">

                    <div className="flex gap-[1rem]">

                        <p className="text-xl font-bold">7</p>
                        <p className="text-xl font-bold text-[#ffffff]">Twoje prawa</p>

                    </div>

                    <p className="">• Masz prawo dostępu, aktualizacji lub usunięcia swoich danych osobowych. Jeśli chcesz skorzystać z któregokolwiek z tych praw, skontaktuj się z nami, korzystając z informacji podanych poniżej.</p>

                </div>

                <div className="flex flex-col gap-[.5rem]">

                    <div className="flex gap-[1rem]">

                        <p className="text-xl font-bold">8</p>
                        <p className="text-xl font-bold text-[#ffffff]">Cookies (ciasteczka)</p>

                    </div>

                    <p className="">• Serwis umożliwia gromadzenie informacji za pośrednictwem cookies oraz podobnych technologii, których korzystanie najczęściej wiąże się z zainstalowaniem tego narzędzia na Twoim urządzeniu (komputer, smartfon, itd.). Wykorzystujemy te informacje do zapamiętywania Twoich decyzji (produkty dodane do koszyka zakupowego, zapamiętane ustawienia, akceptacja polityki), utrzymania sesji użytkownika (np. po zalogowaniu), zapamiętania hasła (za zgodą), gromadzenia informacji o Twoich urządzeniach oraz wizytach służące do zapewnienia bezpieczeństwa, ale także analizy wizyt i dostosowania treści.</p>

                </div>

                <div className="flex flex-col gap-[.5rem]">

                    <div className="flex gap-[1rem]">

                        <p className="text-xl font-bold">9</p>
                        <p className="text-xl font-bold text-[#ffffff]">Zmiany w niniejszej Polityce Prywatności</p>

                    </div>

                    <p className="">• Zastrzegamy sobie prawo do zmiany lub aktualizacji niniejszej Polityki Prywatności w dowolnym momencie. Zaktualizowana wersja zostanie opublikowana na naszej Stronie wraz z datą wejścia w życie zmian.</p>

                </div>

                <div className="flex flex-col gap-[.5rem]">

                    <div className="flex gap-[1rem]">

                        <p className="text-xl font-bold">10</p>
                        <p className="text-xl font-bold text-[#ffffff]">Kontakt</p>

                    </div>

                    <p className="">• Jeśli masz jakiekolwiek pytania, wątpliwości lub wnioski dotyczące niniejszej Polityki Prywatności, skontaktuj się z nami pod adresem biuro@elektroteka.pl.</p>

                </div> */}

            </div>

        </div>
    )
}