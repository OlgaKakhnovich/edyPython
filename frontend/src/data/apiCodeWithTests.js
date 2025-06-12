import axios from "axios";
import prisma from "../../../backend/db/prisma.js";
import _ from "lodash";
import { it, tr } from "date-fns/locale";

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
});

function safeParse(value){
    try{
        return JSON.parse(value);
    }catch(e){
        return value;
    }
}

function parseString(str){
    if (str === "True") return true;
    if (str === "False") return false;
    if (str === "None") return null;

    const tupleMatch = str.match(/^\(([^()]*)\)$/);
    if (!tupleMatch) return str;

    const items = tupleMatch[1].split(",").map(s=>{
        const trimmed = s.trim();
        if(trimmed==="True") return true;
        if(trimmed === "False") return false;
        if(trimmed === "None") return null;
        const num = Number(trimmed);
        return isNaN(num) ? trimmed : num;
    });
    return items;
}

function normalizeOneLevelArray(value) {
    while (Array.isArray(value) && value.length === 1) {
        return value[0];
    }
    return value;
}

function parsePythonList(str) {
    
    if (typeof str !== "string") return str;

    
    if (/^\[.*\]$/.test(str.trim())) {
    
        const jsonCompatible = str
            .replace(/'/g, '"')
            .replace(/none/g, 'Null')
            .replace(/true/g, 'True')
            .replace(/false/g, 'False');
        try {
            return JSON.parse(jsonCompatible);
        } catch (e) {
            return str; 
        }
    }
    return str;
}



function normalizeOutput(output){

     if (typeof output === 'string') {
        output = parsePythonList(output);  
    }

  if (typeof output === 'string') {
        output = safeParse(output);
    }

    if (typeof output === 'string') {
        output = parseString(output);
    }

    output = normalizeOneLevelArray(output);

    if (typeof output === "string") {
        return output.trim();
    }

    return output;
}

export const executeCodeWithTests = async (sourceCode, taskId) => {
    const tests = await prisma.test.findMany({
        where: { taskId: taskId },
    });

    let testResults = [];

    for (const test of tests) {
        const inputData = test.inputData; // []
        const expectedOutput = test.expectedOutput; // []

        try{
        //clean whitespace
        const cleanedSourceCode = sourceCode.replace(/^\s*print\s*\(.*?\)\s*$/gm, "");

        const functionNameMatch = cleanedSourceCode.match(/def\s+(\w+)\s*\(/);
        const functionName = functionNameMatch ? functionNameMatch[1] : 'function'; 

        
        const args = inputData.map(arg=>JSON.stringify(arg)).join(",");

        const functionCall=`print(${functionName}(${args}))`;
/*
        if(inputData.length===1 && Array.isArray(inputData[0])){
                const arg = JSON.stringify(inputData[0]);
                functionCall = `print(${functionName}(${arg}))`;
        }else{
            const args = inputData.map(e=>JSON.stringify(e)).join(", ");
            functionCall = `print(${functionName}(${args}))`;
        }*/

        const userCodeWithPrint = `
${cleanedSourceCode}
${functionCall}
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

        let parsedActual = safeParse(actualOutput);
        if(typeof parsedActual === 'string'){
            parsedActual = parseString(parsedActual);
        }

        let parsedExpected = typeof expectedOutput === 'string' ? safeParse(expectedOutput) : expectedOutput;

/*
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
        }else{
            parsedExpected = expectedOutput;
        }
        console.log("ParsedExpected: ", parsedExpected);
*/
       let normalizedActual = normalizeOutput(parsedActual);
       let normalizedExpected = normalizeOutput(parsedExpected);


        let isPassed=_.isEqual(normalizedExpected, normalizedActual);


        console.log("Expected: ",   normalizedExpected);
        console.log("Actual: ",  normalizedActual);

        const testResult = {
            inputData,
            parsedExpected: normalizedExpected,
            actualOutput: parsedActual,
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
    }
}

    const allTestPassed = testResults.every(result=>result.isPassed);

    return {testResults, allTestPassed};
};
