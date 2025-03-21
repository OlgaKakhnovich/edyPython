import React from "react";
import AceEditor from 'react-ace';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';
ace.config.set('basePath', '/node_modules/ace-builds/src-min-noconflict/');

const CodeEditor = () => {
    return (
        <AceEditor
            mode="python"
            theme="dracula"
            name="code_editor"
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
            }}
            className="w-full h-full rounded-lg  border-[#45495c] border-2"
            style={{ width: '100%', height: '100%' }}
        />
    )
}


export default CodeEditor;