import React, { useState } from "react";
import AceEditor from 'react-ace';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-eclipse';
import 'ace-builds/src-noconflict/theme-dawn';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-cobalt';
import 'ace-builds/src-noconflict/ext-language_tools';
import { useTheme } from "../../context/ThemeContext";
import themes from "../../data/themes";
ace.config.set('basePath', '/node_modules/ace-builds/src-min-noconflict/');

const CodeEditor = ({ code, setCode, editorRef }) => {

    const { theme } = useTheme();
    const themeEditor = themes.find(themeObj => themeObj.name === theme)?.editor;
    const formattedCode = code.replace(/\\n/g, "\n");

    const handleEditorLoad = (editor) => {
        console.log("AceEditor is ready to use");
        editorRef.current = editor;
    }

    const onChange = (newCode) => {
        setCode(newCode);
    }

    return (
        <AceEditor
            mode="python"
            theme={themeEditor}
            name="code_editor"
            onChange={onChange}
            onLoad={handleEditorLoad}
            value={formattedCode}
            fontSize={16}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 4,
            }}
            className="w-full h-full rounded-lg  border-neutral border-2"
            style={{ width: '100%', height: '100%', fontFamily: "Fira Code, monospace", }}
        />
    )
}


export default CodeEditor;