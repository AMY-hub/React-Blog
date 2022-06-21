import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import { TextEditorMenu } from "./TextEditorMenu";

import styles from './style.module.scss';
import { useState } from "react";

interface IEditorProps {
    bodyHTML: string,
    setBodyHTML: React.Dispatch<React.SetStateAction<string>>
}

export const TextEditor = ({ bodyHTML, setBodyHTML }: IEditorProps) => {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write your post here...'
            })
        ],
        onUpdate: ({ editor }) => setBodyHTML(editor.getHTML()),
    });

    console.log(bodyHTML);

    return (
        <div className={styles.texteditor}>
            <TextEditorMenu editor={editor} />
            <EditorContent editor={editor} />
        </div>

    )
}
