import React from "react";
import CodeExample from "./CodeExample";

const Article = () => {

    return (<> <div>
        <h3>Operatory arytmetyczne</h3>
        <p>Operatory arytmetyczne służą do wykonywania wszelkiego rodzaju działań na liczbach takich jak:</p>
        <ul>
            <li>"+" - dodawanie,</li>
            <li>"-" - odejmowanie,</li>
            <li>"*" - mnożenie,</li>
            <li>"/" - dzielenie,</li>
            <li>"//" - dzielenie całkowite,</li>
            <li>"%" - reszta z dzielenia dwóch liczb całkowitych,</li>
            <li>"**" - potęgowanie.</li>
        </ul>
        <br />
        <component:CodeExample id="4" />

        <h3>Operatory logiczne</h3>
        <p>Do operatorów logicznych zaliczamy:</p>
        <ul>
            <li>or — lub logiczne,</li>
            <li>and — i logiczne,</li>
            <li>not — zaprzeczenie.</li>
        </ul>
        <br />
        <component:CodeExample id="5" />

        <h3>Operatory relacyjne</h3>
        <p>Operatory relacyjne stosujemy w sytuacje, gdzie jest potrzeba porównania dwóch elementów. Najczęściej używane są w instrukcjach warunkowych i iteracyjnych. </p>


        <br />
        <component:CodeExample id="6" />

        <h3>Operatory identycznościowe</h3>
        <p>Operatory te określają, czy dwie zmienne przechowują ten sam obiekt. Wyróżniamy dwa operatory identycznościowe:</p>
        <ul>
            <li>is</li>
            <li>is not</li>
        </ul>
        <br />

        <component:CodeExample id="7" />
        <h3>Operatory przynależności</h3>
        <p>Operatory tego typu sprawdzają, czy dany element zawiera się w podzbiorze wartości danego obiektu.</p>
        <ul>
            <li>in</li>
            <li>not in</li>
        </ul>
        <br />

        <component:CodeExample id="8" />
        <h3>Operatory bitowe</h3>
        <p>Operatory bitowe działają na poziomie bitów, wykonując operacje na reprezentacji binarnej liczb.</p>
        <ul>

        </ul>
        <br />

        <component:CodeExample id="9" />
    </div>
    </>);
}

export default Article;

