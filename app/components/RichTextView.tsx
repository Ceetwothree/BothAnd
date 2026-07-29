// app/components/RichTextView.tsx
// Renders HTML produced by RichTextEditor.tsx back to *other* users --
// this is the half that matters for security. A Board post is written
// by one member and displayed to every other member of that org; without
// sanitizing here, a post body is a stored-XSS vector (anyone who can
// post could embed a <script> or an onerror= handler that runs in every
// other member's browser). DOMPurify's default profile strips exactly
// that class of thing while keeping the plain formatting tags Tiptap
// actually produces (bold/italic/headings/lists/quotes).
'use client'

import DOMPurify from 'isomorphic-dompurify'

export default function RichTextView({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html)
  return <div className="rich-text-view" dangerouslySetInnerHTML={{ __html: clean }} />
}
