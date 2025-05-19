import axios from "axios";
import prisma from "../../../backend/db/prisma.js";
import _ from "lodash";

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
});


function normalizeArrayString(arrStr){
    try{
        const parsed = JSON.parse(arrStr);
        if(Array.isArray(parsed)){
            return parsed.map(Number);
        }
    }catch(e){}
    return null;
}

export const executeCodeWithTests = async (sourceCode, taskId) => {
    const tests = await prisma.test.findMany({
        where: { taskId: taskId },
    });

    let testResults = [];

    for (const test of tests) {
        const inputData = test.inputData;
        const expectedOutput = test.expectedOutput;

        try{

        const cleanedSourceCode = sourceCode.replace(/^\s*print\s*\(.*?\)\s*$/gm, "");

        const functionNameMatch = cleanedSourceCode.match(/def\s+(\w+)\s*\(/);
        const functionName = functionNameMatch ? functionNameMatch[1] : 'function'; 


        const userCodeWithPrint = `
${cleanedSourceCode}
print(${functionName}(${inputData.length > 0 ?  inputData.join(", "): ""})) 
`;

       
        const response = await API.post("/execute", {
            "language": "python",
            "version": "3.10.0",
            "files": [
                {
                    "content": userCodeWithPrint,
                }
            ],
        });

        
        let actualOutput = response.data.run.output ? response.data.run.output.trim() : '';  
        const lines = actualOutput.split("\n").filter(line => !line.startsWith("print("));
        actualOutput = lines.join("\n").trim();

        let parsedActual;
        try{
            parsedActual = JSON.parse(actualOutput);
        }catch(e){
            const tupleMatch = actualOutput.match(/^\(([^()]+)\)$/);
            if(tupleMatch){
                parsedActual = tupleMatch[1].split(",").map(s=>{
                    const trimmed = s.trim();
                    if(trimmed === "True") return true;
                    if(trimmed === "False") return false;
                    const num = Number(trimmed);
                    return isNaN(num) ? trimmed : num;
                });
            }else{
                parsedActual = actualOutput;
            }
        }

        let parsedExpected = expectedOutput;
        if(typeof expectedOutput === 'string'){
            try {
                parsedExpected = JSON.parse(expectedOutput);
            } catch (error) {
                parsedExpected = expectedOutput;
            }
        }

        let isPassed=_.isEqual(parsedActual, parsedExpected);


/*
        const normalizedActual = normalizeArrayString(actualOutput);
        const normalizedExpected = Array.isArray(expectedOutput)?expectedOutput.map(Number):null;

        let isPassed;

        if(normalizedActual && normalizedExpected){
            isPassed = normalizedActual.length===normalizedExpected.length && normalizedActual.every((num, i)=>num===normalizedExpected[i]);
        }else{
            const actualNum = Number(actualOutput);
            const expectedNum = Number(expectedOutput);
            
            if(!isNaN(actualNum) && !isNaN(expectedNum)){
                isPassed = actualNum===expectedNum;
            }else{
                isPassed=actualOutput===JSON.stringify(expectedOutput).trim();
            }
        }
*/
        const testResult = {
            inputData,
            parsedExpected,
            actualOutput,
            isPassed
        };

        testResults.push(testResult);
    }catch(error){
        console.error("Error executing code:", error);
            testResults.push({
                inputData,
                expectedOutput,
                actualOutput: "Error executing code",
                isPassed: false,
            });
    }}

    const allTestPassed = testResults.every(result=>result.isPassed);

    return {testResults, allTestPassed};
};
