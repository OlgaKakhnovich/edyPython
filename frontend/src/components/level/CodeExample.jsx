import React from "react";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/ext-language_tools';

const CodeExample = () => {

    return (
        <AceEditor
            mode="python"
            theme="dracula"
            name="code_editor"
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            readOnly={true}
            minLines={3}
            maxLines={Infinity}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
            }}
            className="w-full rounded-lg  border-[#45495c] border-2 "
            style={{ width: '100%' }}
        />

    );
}

export default CodeExample;