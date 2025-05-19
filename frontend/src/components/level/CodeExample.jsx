import React from "react";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-eclipse';
import 'ace-builds/src-noconflict/theme-dawn';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-cobalt';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/ext-language_tools';
import { useTheme } from "../../context/ThemeContext";
import themes from "../../data/themes";
ace.config.set('basePath', '/node_modules/ace-builds/src-min-noconflict/');

const CodeExample = ({ code }) => {


    const { theme } = useTheme();
    const themeEditor = themes.find(themeObj => themeObj.name === theme)?.editor;


    return (
        <AceEditor
            mode="python"
            theme={themeEditor}
            name="code_editor"
            fontSize={16}
            value={code}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            readOnly={true}
            minLines={4}
            maxLines={Infinity}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 4,
            }}
            className="w-full rounded-lg  border-[#45495c] border-2 "
            style={{ width: '100%', fontFamily: "Fira Code, monospace", }}
        />

    );
}

export default CodeExample;