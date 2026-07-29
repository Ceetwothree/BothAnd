// app/components/RichTextEditor.tsx
// A small Tiptap-based editor -- bold/italic/lists/headings only, not a
// full word processor. Stores/returns HTML; RichTextView.tsx is the
// other half of this pair and must be used anywhere this HTML is shown
// back to *other* users (sanitizes before rendering -- this component
// only produces the HTML, it doesn't make it safe to display).
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (html: string) => void
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    // Tiptap renders differently on the server's first pass vs. the
    // client; without this, Next.js's hydration flags a mismatch.
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        style: 'padding: 0.5rem; min-height: 120px; outline: none;',
      },
    },
  })

  if (!editor) return null

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.3rem 0.6rem',
    fontWeight: active ? 700 : 400,
    background: active ? '#e2e8f0' : 'transparent',
    border: '1px solid #ccc',
    borderRadius: '3px',
    cursor: 'pointer',
  })

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
      <div
        style={{
          display: 'flex',
          gap: '0.35rem',
          padding: '0.35rem',
          borderBottom: '1px solid #eee',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={btnStyle(editor.isActive('bold'))}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          style={btnStyle(editor.isActive('italic'))}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          style={btnStyle(editor.isActive('heading', { level: 3 }))}
        >
          Heading
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={btnStyle(editor.isActive('bulletList'))}
        >
          Bullet list
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          style={btnStyle(editor.isActive('orderedList'))}
        >
          Numbered list
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          style={btnStyle(editor.isActive('blockquote'))}
        >
          Quote
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
