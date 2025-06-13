import React, { useState } from "react";

const AccordionTests = ({ tests }) => {
    const [openInd, setOpenInd] = useState(null);


    const toggleAccordion = (ind) => {
        setOpenInd(openInd === ind ? null : ind);
    };


    return (
        <>
            <div className="flex flex-col gap-3  ">
                {tests.map((test, ind) => (
                    <div key={ind} className=" flex flex-col items-center border border-neutral rounded-lg overflow-hidden">
                        <button onClick={() => toggleAccordion(ind)}
                            className="w-full h-10 flex justify-between items-center p-4 bg-base200 hover:bg-base300 transition-all ease-in-out duration-300 text-baseContent">
                            <span>Test {ind + 1}</span>
                            <div className="flex items-center justify-center gap-5">
                                {test.isPassed ? <span className="text-success">Zaliczony</span> : <span className="text-error">Faild</span>}
                                <span>{openInd === ind ? "▲" : "▼"}</span>
                            </div>
                        </button>

                        {openInd === ind && (
                            <div className=" w-full grid grid-cols-3 grid-rows-[0.2fr_1fr] gap-2 py-2">
                                <div className="col-start-1 col-end-2 row-start-1 row-end-2 text-center text-sm">Dane wejściowe</div>
                                <div className="col-start-2 col-end-3 row-start-1 row-end-2 text-center text-sm">Oczekiwane wyjście</div>
                                <div className="col-start-3 col-end-4 row-start-1 row-end-2 text-center text-sm">Faktyczne wyjście</div>
                                <div className="col-start-1 col-end-2 row-start-2 row-end-3 text-center font-bold text-lg">{JSON.stringify(test.inputData, null, 2)}</div>
                                <div className="col-start-2 col-end-3 row-start-2 row-end-3 text-center font-bold text-lg">{JSON.stringify(test.parsedExpected, null, 2)}</div>
                                <div className="col-start-3 col-end-4 row-start-2 row-end-3 text-center font-bold text-lg">{JSON.stringify(test.actualOutput, null, 2)}</div>
                            </div>
                        )}

                    </div>
                ))}

            </div>
        </>
    )

}

export default AccordionTests;