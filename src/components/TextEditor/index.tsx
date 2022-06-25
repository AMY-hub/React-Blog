import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import { TextEditorMenu } from "./TextEditorMenu";

import styles from './style.module.scss';

interface IEditorProps {
    bodyHTML: string,
    setBodyHTML: React.Dispatch<React.SetStateAction<string>>,
    previewHTML: string,
    setPreviewHTML: React.Dispatch<React.SetStateAction<string>>
}

export const TextEditor = ({ bodyHTML, setBodyHTML, previewHTML, setPreviewHTML }: IEditorProps) => {

    const prevEditor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write preview for your post...'
            })
        ],
        onUpdate: ({ editor }) => setPreviewHTML(editor.getHTML()),
    })

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
            <TextEditorMenu editor={prevEditor} />
            <EditorContent editor={prevEditor}
                className={styles.texteditor__previewfield} />
            <TextEditorMenu editor={editor} />
            <EditorContent editor={editor}
                className={styles.texteditor__textfield} />
        </div>

    )
}
