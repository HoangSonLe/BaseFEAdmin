import React, { useEffect, Suspense, forwardRef, useImperativeHandle, useRef } from "react";
import type { UncontrolledEditorProps, UncontrolledEditorRef } from "./UncontrolledEditor";

// Use React.lazy for dynamic import
const UncontrolledEditor = React.lazy(() => import("./UncontrolledEditor"));

// Use the UncontrolledEditorProps directly instead of creating an empty interface
type ClientSideCustomEditorProps = UncontrolledEditorProps;

const ClientSideCustomEditor = forwardRef<UncontrolledEditorRef, ClientSideCustomEditorProps>(
    (props, ref) => {
        const editorRef = useRef<UncontrolledEditorRef>(null);

        // Forward the ref to the UncontrolledEditor
        useImperativeHandle(ref, () => ({
            getContent: () => {
                return editorRef.current ? editorRef.current.getContent() : "";
            },
            setContent: (content: string) => {
                if (editorRef.current) {
                    editorRef.current.setContent(content);
                }
            },
        }));

        // Log when value changes to help with debugging
        useEffect(() => {
            if (props.value !== undefined) {
                console.log(
                    "ClientSideCustomEditor value changed:",
                    props.value?.substring(0, 50) + "..."
                );
            }
        }, [props.value]);

        return (
            <Suspense
                fallback={
                    <div className="p-4 border border-gray-200 rounded">Loading editor...</div>
                }
            >
                <UncontrolledEditor ref={editorRef} {...props} />
            </Suspense>
        );
    }
);

ClientSideCustomEditor.displayName = "ClientSideCustomEditor";

export default ClientSideCustomEditor;
