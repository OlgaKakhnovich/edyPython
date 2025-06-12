import React, { useState, useEffect, useRef } from "react";
import CodeEditor from "../components/level/CodeEditor";
import OutputEditor from "../components/level/Output";
import { fetchLevel, fetchTask } from "../data/useLevel";
import { useParams, useLocation } from "react-router-dom";
import HelpComponent from "../components/level/HelpContainer";
import { executeCode } from "../data/apiCode";
import Loading from "../components/LoadingBall";
import CodeExample from "../components/level/CodeExample";
import useProgressUpdate from "../hooks/useProgressUpdate";
import { Lightbulb } from 'lucide-react';
import { runCode } from "../data/runCode";
import LevelResult from "../components/level/LevelResult";
import InDevelopment from "../components/level/LevelInDevelopment";

const LAST_TASK_INDEX = 3;
const ONE_TASK_INDEX = 1;

const LevelPage = () => {

    // State
    const [points, setPoints] = useState(0);
    const [level, setLevel] = useState(null);
    const [task, setTask] = useState(null);
    const [taskDataList, setTaskDataList] = useState([]);
    const [nextTask, setNextTask] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isActiveHelp, setIsActiveHelp] = useState(false);
    const [isLevelProgress, setIsLevelProgress] = useState(false);
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("Naciśnij \"Kompiluj\" żeby zobaczyć wynik");
    const [isCodeLoading, setIsCodeLoading] = useState(false);
    const [isTesting, setIsTesting] = useState(false);
    const [tests, setTests] = useState([]);
    const [activeTab, setActiveTab] = useState('output');
    const [activeTab2, setActiveTab2] = useState('content');
    const [isCompleted, setIsCompleted] = useState(false);

    const [levelProgressData, setLevelProgressData] = useState({
        progress: 55,
        levelId: parseInt(useParams().id),
        date: new Date().toISOString(),
    })

    // Refs
    const editorRef = useRef(null);

    //Hooks
    const { id } = useParams();
    const location = useLocation();
    const chapterId = new URLSearchParams(location.search).get('chapterId');
    const { loading } = useProgressUpdate();

    // Effects

    useEffect(() => {
        const getLevel = async () => {
            try {
                setIsLoading(true);
                const data = await fetchLevel(id);
                setLevel(data.level);
                await getTask(chapterId);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        getLevel();
    }, [id]);


    // API Calls

    const getTask = async (chapterId) => {
        try {
            setIsLoading(true);

            const lastTask = taskDataList[taskDataList.length - 1] || { chapterId };
            const taskId = lastTask.taskId || null;
            const taskInd = lastTask.taskInd || null;

            const recentCompletedTaskIds = taskDataList.map(task => task.taskId);
            console.log("Recent Completed Tasks: ", recentCompletedTaskIds);

            const taskResponse = await fetchTask(id, {
                taskId,
                chapterId,
                taskInd,
                recentCompletedTaskIds
            });

            const newTaskData = createTaskData(taskResponse, chapterId, taskResponse.task?.difficulty);

            console.log("New Task Data: ", newTaskData);

            setTask(taskResponse.task);
            setCode(taskResponse.task.code);
            setOutput("Naciśnij \"Kompiluj\" żeby zobaczyć wynik");
            setNextTask(false);
            setTests([]);
            setIsCompleted(false);
            setActiveTab('output');

            setTaskDataList(prev => [...prev, newTaskData]);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handlers

    const run = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;

        try {
            setIsCodeLoading(true);
            const { run: result } = await runCode(sourceCode);
            setOutput(result.output);
        } catch (error) {
            console.error(error);
        } finally {
            setIsCodeLoading(false);
        }
    }

    const testCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;

        try {
            setIsTesting(true);

            const updatedList = [...taskDataList];
            const lastIndex = updatedList.length - 1;
            updatedList[lastIndex].attempts += 1;
            setTaskDataList(updatedList);

            const { testResults, allTestPassed } = await executeCode(sourceCode, task.id);
            if (allTestPassed) {
                setNextTask(true);
            }
            setTests(testResults);
            setIsCompleted(true);
            const points = calculateScore(allTestPassed, updatedList[lastIndex].attempts);

            setPoints(points);
        } catch (error) {
            console.error(error);
        } finally {
            setIsTesting(false);
        }
    };

    const handleNextTask = async () => {
        const current = taskDataList[taskDataList.length - 1];
        if (!nextTask || !current) return;


        if (current.taskInd === LAST_TASK_INDEX) {
            completeLevel();
        } else {
            await getTask(chapterId);
        }
    };

    const completeLevel = () => {
        setTaskDataList(prev => {
            const updated = [...prev];
            updated[updated.length - 1].nextTask = false;
            return updated;
        });

        const progress = calculateProgress();

        setLevelProgressData(prev => ({
            ...prev,
            progress: progress,
        }));

        setIsLevelProgress(true);
    };

    const calculateProgress = () => {
        let totalWeight = 0;
        let weightScore = 0;

        for (const task of taskDataList) {
            const weight = task.difficulty;
            totalWeight += weight;

            let score = 1.0;
            if (task.hintsUsed) score -= 0.2;
            score -= (task.attempts - 1) * 0.1;
            score = Math.max(0.1, score);

            weightScore += score * weight;
        }

        return Math.round((weightScore / totalWeight) * 100);
    }


    const calculateScore = (allTestPassed, attempts) => {
        if (!allTestPassed) return 0;

        if (attempts === 1) return 5;
        else if (attempts === 2) return 4;
        else if (attempts === 3) return 3;
        else if (attempts === 4) return 2;
        else return 1;
    }

    const createTaskData = (taskResponse, chapterId, taskDifficulty) => {
        return {
            taskInd: Number(taskResponse.taskInd),
            nextTask: true,
            attempts: 1,
            hintsUsed: false,
            taskId: taskResponse.task?.id,
            difficulty: taskDifficulty,
            chapterId,
        };
    };

    const activateHelp = () => {
        setIsActiveHelp(true);

        setTaskDataList(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                hintsUsed: true,
            };
            return updated;
        });
    }

    // Rendering

    const renderArticle = () => {
        if (!level) return null;

        const regex = /<component:CodeExample id="(\d+)" \/>/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(level.description)) !== null) {
            parts.push({
                type: "text",
                content: level.description.substring(lastIndex, match.index)
            });

            const example = level.examples.find((e) => e.id === parseInt(match[1], 10));
            if (example) {
                const formattedCode = example.code.replace(/\\n/g, "\n");
                parts.push({
                    type: "codeexample",
                    id: example.id,
                    code: formattedCode
                });
            }
            lastIndex = regex.lastIndex;
        }

        if (lastIndex < level.description.length) {
            parts.push({
                type: "text",
                content: level.description.substring(lastIndex)
            });
        }

        return parts.map((part, index) => {
            if (part.type === "text") {
                return <div key={index} dangerouslySetInnerHTML={{ __html: part.content }} />;
            } else if (part.type === "codeexample") {
                return (
                    <React.Fragment key={index}>
                        <CodeExample code={part.code} />
                    </React.Fragment>
                )
            }
        })

    }


    if (isLoading || !level || loading) {
        return <Loading />
    }
    else if (!task || error) {
        console.log("Error: ", error);
        return <InDevelopment />
    } else {
        return (<>
            <div className="grid grid-cols-2 grid-rows-[1fr_5fr_3fr_1fr] gap-x-5 gap-y-2 w-screen h-screen px-12 pt-16 pb-5">
                <div className="col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col">
                    <h1 className="font-bold text-3xl text-baseContent">{level.title}</h1>
                    <h2 className="text-lg text-gray-200 text-baseContent">{level.chapter.title}</h2>
                </div>
                .
                <div className="col-start-1 col-end-2 row-start-2 row-end-5 text-baseContent">

                    <nav className="relative z-0 flex border border-neutral rounded-xl mb-2 overflow-hidden" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                        <button
                            type="button"
                            className={`relative min-w-0 flex-1 bg-base200 first:border-s-0   ${activeTab2 === 'content' ? 'bg-neutral' : 'border-transparent'} py-2 px-4 text-baseContent text-sm font-medium text-center overflow-hidden focus:z-10  disabled:opacity-50 disabled:pointer-events-none`}
                            onClick={() => setActiveTab2('content')}
                        >
                            Artykuł
                        </button>
                        <button
                            type="button"
                            className={`relative min-w-0 flex-1 bg-base200 first:border-s-0  ${activeTab2 === 'task' ? 'bg-neutral' : 'border-transparent'} py-2 px-4 text-baseContent text-sm font-medium text-center overflow-hidden focus:z-10 disabled:opacity-50 disabled:pointer-events-none`}
                            onClick={() => setActiveTab2('task')}
                        >
                            Zadanie
                        </button>
                    </nav>
                    <div className="overflow-y-auto h-full">
                        <div className="content">
                            {activeTab2 === 'content' && renderArticle()}
                            {activeTab2 === 'task' && (
                                <div className="">
                                    <h2 className="font-bold text-xl text-baseContent">Zadanie: <span className="">{task.title}</span></h2>
                                    <p>Treść zadania:{task.task}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-start-2 col-end-3 row-start-1 row-end-2  flex flex-row justify-between items-center gap-2 ">
                    <div className="flex flex-row items-center justify-end  gap-5">
                        <button onClick={activateHelp} className="p-2 cursor-pointer flex items-center justify-center text-accentContent bg-accent rounded-3xl font-medium hover:bg-accentHover transition-all ease-in duration-200 active:scale-95">
                            <Lightbulb className="text-secondaryContent" />
                        </button>
                        <button onClick={run} className="h-10 w-24 cursor-pointer flex items-center justify-center text-secondaryContent bg-secondary rounded-3xl font-medium text-base hover:bg-secondaryHover transition-all ease-in duration-200 active:scale-95">
                            {isCodeLoading ? <div
                                className="w-5 h-5 border-4 border-t-accent border-base200 rounded-full animate-spin"
                            ></div> : "Kompiluj"}
                        </button>
                        <button onClick={testCode} className="h-10 w-24 cursor-pointer flex items-center justify-center text-secondaryContent bg-secondary rounded-3xl font-medium text-base hover:bg-secondaryHover transition-all ease-in duration-200 active:scale-95">
                            {isTesting ? <div
                                className="w-5 h-5 border-4 border-t-accent border-base200 rounded-full animate-spin"
                            ></div> : "Sprawdź"}
                        </button>
                    </div>
                </div>
                <div className="col-start-2 col-end-3 row-start-2 row-end-3">
                    <CodeEditor code={code} setCode={setCode} editorRef={editorRef} />
                </div>
                <div className="col-start-2 col-end-3 row-start-3 row-end-4 ">
                    <OutputEditor output={output} tests={tests} activeTab={activeTab} setActiveTab={setActiveTab} isComplited={isCompleted} />
                </div>
                <div className="col-start-2 col-end-3 row-start-4 row-end-5 flex items-center justify-between pt-2 ">
                    <div className="">
                        <h1 className="font-bold text-xl text-baseContent">
                            {(taskDataList[taskDataList.length - 1]?.taskInd || 0)}/ 3
                        </h1>

                    </div>
                    <button className={`h-10 w-24 flex items-center justify-center text-secondaryContent rounded-3xl font-medium text-base transition-all ease-in duration-200 active:scale-95 
                        ${nextTask ? 'bg-secondary cursor-pointer' : 'cursor-not-allowed bg-secondaryHover'}`} onClick={() => handleNextTask()}>
                        Dalej
                    </button>
                </div>
                {isActiveHelp ? <HelpComponent setIsActive={setIsActiveHelp} text={task.help} /> : null}
                {isLevelProgress ? <LevelResult getTask={getTask} taskData={taskDataList} data={levelProgressData} score={points} levelId={id} setIsLevelProgress={setIsLevelProgress} /> : null}
            </div></>)
    }
}

export default LevelPage;

