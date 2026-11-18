import { useEffect, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import './TiptapEditor.css'

export default function TiptapEditor({ content, onChange }) {
  const fileInputRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: content || '<p>Start writing your blog post...</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Keep editor content in sync when loaded dynamically (e.g. from Supabase)
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) {
    return null
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          editor.chain().focus().setImage({ src: reader.result }).run()
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const addImage = () => {
    const choice = window.confirm('Click OK to upload an image from your computer, or Cancel to enter an Image URL.')
    if (choice) {
      if (fileInputRef.current) fileInputRef.current.click()
    } else {
      const url = window.prompt('Enter Image URL (e.g. /blog/why-investing-open-plots-hyderabad.webp):')
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    }
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL:', previousUrl)

    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="tiptap-editor-wrap">
      {/* Top Toolbar matching user's Simple Editor screenshot */}
      <div className="tiptap-toolbar">
        {/* Undo / Redo */}
        <button
          type="button"
          className="tiptap-btn"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          ↶
        </button>
        <button
          type="button"
          className="tiptap-btn"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          ↷
        </button>

        <span className="tiptap-sep" />

        {/* Headings */}
        <button
          type="button"
          className={`tiptap-btn ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          className={`tiptap-btn ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          className={`tiptap-btn ${editor.isActive('paragraph') ? 'is-active' : ''}`}
          onClick={() => editor.chain().focus().setParagraph().run()}
          title="Normal Paragraph"
        >
          ¶
        </button>

        <span className="tiptap-sep" />

        {/* Lists */}
        <button
          type="button"
          className={`tiptap-btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          •≡
        </button>
        <button
          type="button"
          className={`tiptap-btn ${editor.isActive('orderedList') ? 'is-active' : ''}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered List"
        >
          1≡
        </button>
        <button
          type="button"
          className={`tiptap-btn ${editor.isActive('blockquote') ? 'is-active' : ''}`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Blockquote"
        >
          ❝
        </button>

        <span className="tiptap-sep" />

        {/* Text Formats */}
        <button
          type="button"
          className={`tiptap-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold (Ctrl+B)"
        >
          <b>B</b>
        </button>
        <button
          type="button"
          className={`tiptap-btn ${editor.isActive('italic') ? 'is-active' : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic (Ctrl+I)"
        >
          <i>I</i>
        </button>
        <button
          type="button"
          className={`tiptap-btn ${editor.isActive('underline') ? 'is-active' : ''}`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </button>
        <button
          type="button"
          className={`tiptap-btn ${editor.isActive('strike') ? 'is-active' : ''}`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strikethrough"
        >
          <s>S</s>
        </button>
        <button
          type="button"
          className={`tiptap-btn ${editor.isActive('code') ? 'is-active' : ''}`}
          onClick={() => editor.chain().focus().toggleCode().run()}
          title="Code snippet"
        >
          &lt;/&gt;
        </button>

        <span className="tiptap-sep" />

        {/* Media & Links */}
        <button
          type="button"
          className={`tiptap-btn ${editor.isActive('link') ? 'is-active' : ''}`}
          onClick={setLink}
          title="Insert Link"
        >
          🔗 Link
        </button>
        <button
          type="button"
          className="tiptap-btn"
          onClick={addImage}
          title="Insert Image (Upload or URL)"
        >
          🖼️ Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <button
          type="button"
          className="tiptap-btn"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          —
        </button>
      </div>

      {/* Editor Surface */}
      <div className="tiptap-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
