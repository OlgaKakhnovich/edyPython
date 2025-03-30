import React from "react";
import CodeExample from "./CodeExample";

const Article = () => {

    return (<> <div className="content">
        <p>Zmienna to jednostka w programowaniu, która służy do <b>przechowywania różnych danych</b> potrzebnych do funkcjonowania programu. W trakcie działania programu zmienna może zmieniać swoje wartości. W Pythonie musisz najpierw zdefiniować zmienną, aby móc z niej korzystać. Typ zmiennej nie jest z góry określony, ponieważ Python automatycznie dopasowuje typ zmiennej na podstawie przypisanej wartości. Zmienna może w trakcie działania programu zmieniać swój typ, co oznacza, że w jednym momencie może być liczbą całkowitą, później ciągiem znaków, a jeszcze później liczbą zmiennoprzecinkową.</p>
        <h3>Inicjacja zmiennych:</h3>
        <p>Możesz zdefiniować zmienną bez przypisania wartości lub od razu nadać jej określoną wartość.</p>
        <br />
        <component:CodeExample />
        <h3>Typy zmiennych w Pythonie:</h3>
        <p>W języku Python mamy kilka rodzajów zmiennych. Do dyspozycji mamy następujące typy:</p>
        <ul>
            <li>int — typ całkowity</li>
            <li>float — typ rzeczywisty</li>
            <li>bool — typ logiczny</li>
            <li>complex — typ dla liczb zespolonych</li>
            <li>str — ciągi znaków</li>
        </ul>
        <h3>Rzutowanie tupów:</h3>
        <p>Rzutowanie to <b>proces przekształcenia </b>jednego typu danych na inny. Aby przeprowadzić rzutowanie, należy podać nazwę typu docelowego, a następnie w nawiasie umieścić zmienną, którą chcemy przekształcić.</p>
        <br />
        <component:CodeExample />
        <br />
        <component:CodeExample />
    </div></>);
}

export default Article;