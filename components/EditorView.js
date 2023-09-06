import EDITOR_JS_TOOLS from "./utils/constants";
import EditorJS from "@editorjs/editorjs";
import { useRef } from "react";

function EditorView({ content }) {
    console.log("check blog data----->", content)
    const instanceRef = useRef();
    return (
        <>
            <EditorJS
                instanceRef={(instance) => (instanceRef.current = instance)}
                tools={EDITOR_JS_TOOLS}
                readOnly={true}
                data={content}
            />

        </>
    );
}

export default EditorView;