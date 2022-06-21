import styles from './style.module.scss';

import { Editor } from '../../../../node_modules/@tiptap/react/src/Editor';

interface IMenuProps {
    editor: Editor | null
}

export const TextEditorMenu = ({ editor }: IMenuProps) => {
    if (!editor) return null;

    return (
        <div className={styles.menubar}>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleBold().run()
                }}
                className={editor.isActive('bold') ? styles.active : ''}
            >bold</button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleItalic().run()
                }}
                className={editor.isActive('italic') ? styles.active : ''}
            >italic</button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleStrike().run()
                }}
                className={editor.isActive('strike') ? styles.active : ''}
            >strike</button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleCode().run()
                }}
                className={editor.isActive('code') ? styles.active : ''}
            >code</button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }}
                className={editor.isActive('heading', { level: 1 }) ? styles.active : ''}
            >h1</button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }}
                className={editor.isActive('heading', { level: 2 }) ? styles.active : ''}
            >h2</button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }}
                className={editor.isActive('heading', { level: 3 }) ? styles.active : ''}
            >h3</button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                }}
                className={editor.isActive('heading', { level: 4 }) ? styles.active : ''}
            >h4</button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                }}
                className={editor.isActive('heading', { level: 5 }) ? styles.active : ''}
            >h5</button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 6 }).run()
                }}
                className={editor.isActive('heading', { level: 6 }) ? styles.active : ''}
            >h6</button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleOrderedList().run()
                }}
                className={editor.isActive('orderedList') ? styles.active : ''}
            >ordered list</button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleBulletList().run()
                }}
                className={editor.isActive('bulletList') ? styles.active : ''}
            >bullet list</button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().setHardBreak().run()
                }}
            >hard break</button>
            <div className={styles.cancel}>
                <button onClick={() => editor.chain().focus().undo().run()}>
                    undo
                </button>
                <button onClick={() => editor.chain().focus().redo().run()}>
                    redo
                </button>
            </div>

        </div>
    )
}