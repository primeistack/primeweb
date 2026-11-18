import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStoredBlogs, saveStoredBlogs, initialBlogs } from '../../data/blogs.js'
import BlogPost from '../Blog/BlogPost.jsx'
import TiptapEditor from './TiptapEditor.jsx'
import './AdminPortal.css'

function convertSectionsToHtml(sections) {
  if (!sections || !Array.isArray(sections)) return '<p>Start writing your blog post...</p>'
  return sections
    .map((s) => {
      const heading = s.heading ? `<h2>${s.heading}</h2>` : ''
      const paras = (s.content || '')
        .split('\n\n')
        .map((p) => {
          if (p.startsWith('* ') || p.startsWith('- ')) {
            const items = p
              .split('\n')
              .filter(Boolean)
              .map((item) => `<li>${item.replace(/^[*-\s]+/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`)
              .join('')
            return `<ul>${items}</ul>`
          }
          if (/^\d+\.\s/.test(p)) {
            const items = p
              .split('\n')
              .filter(Boolean)
              .map((item) => `<li>${item.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`)
              .join('')
            return `<ol>${items}</ol>`
          }
          return `<p>${p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`
        })
        .join('')
      return `${heading}${paras}`
    })
    .join('')
}

// SHA-256 hash of complex password "PR#Janaharsha@2026!Secure"
const ADMIN_HASH = '88ce3017f2b7af057f65691b21c3c912925df4b53fb374f0fc2cf5f685c66d73'

async function hashPassword(str) {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function AdminPortal() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('prime_realtors_admin_auth') === 'true'
    } catch {
      return false
    }
  })
  const [passcode, setPasscode] = useState('')
  const [loginError, setLoginError] = useState('')
  const [viewMode, setViewMode] = useState('split') // 'split' | 'editor' | 'preview'
  const [blogsList, setBlogsList] = useState([])
  const [activePostId, setActivePostId] = useState('')
  const [saveStatus, setSaveStatus] = useState('')

  // Draft state initialized with initial blog so it is immediately editable!
  const [draft, setDraft] = useState(() => {
    const list = getStoredBlogs()
    return list[0] || initialBlogs[0]
  })

  // Load stored blogs on mount
  useEffect(() => {
    const stored = getStoredBlogs()
    setBlogsList(stored)
    if (stored.length > 0) {
      setActivePostId(stored[0].id || stored[0].slug)
      setDraft(JSON.parse(JSON.stringify(stored[0])))
    }
  }, [])

  // Handle Login with SHA-256
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const hashed = await hashPassword(passcode.trim())
      if (hashed === ADMIN_HASH) {
        setIsAuthenticated(true)
        localStorage.setItem('prime_realtors_admin_auth', 'true')
        setLoginError('')
      } else {
        setLoginError('Incorrect password. Access denied.')
      }
    } catch {
      setLoginError('Authentication error. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('prime_realtors_admin_auth')
  }

  // Auto-slug generator
  const handleTitleChange = (val) => {
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
    setDraft((prev) => ({
      ...prev,
      title: val,
      slug: prev.id === 'new' || !prev.slug ? slug : prev.slug,
      id: prev.id === 'new' || !prev.id ? slug : prev.id,
    }))
  }

  // Load an existing blog to edit
  const handleEditPost = (post) => {
    setActivePostId(post.id || post.slug)
    setDraft(JSON.parse(JSON.stringify(post)))
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }

  const handleCreateNew = () => {
    const newId = 'post-' + Date.now()
    setActivePostId('new')
    setDraft({
      id: newId,
      slug: 'new-article-' + Date.now(),
      title: 'New Article Title',
      subtitle: 'Brief engaging subtitle for the new article...',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      author: 'Prime Realtors Team',
      category: 'Land Investment Guide',
      readTime: '6 min read',
      heroImage: '/blog/why-investing-open-plots-hyderabad.webp',
      heroImageAlt: 'Open residential plots in Ibrahimpatnam near Hyderabad',
      secondaryImage: '/blog/open-plots-lifestyle-hyderabad.webp',
      secondaryImageAlt: 'Scenic greenery and plotted layout',
      summary: 'Executive summary explaining key takeaways of this guide...',
      metaDescription: 'SEO meta description for Google search results...',
      sections: [
        {
          heading: '1. Introduction',
          content: 'Write your first section paragraph here. Use **bold text** for emphasis.'
        }
      ],
      faqs: [
        {
          question: 'Sample Question 1?',
          answer: 'Clear, helpful answer explaining property details.'
        }
      ],
      comparisonTable: null
    })
  }

  // Save changes
  const handleSave = () => {
    const updated = [...blogsList]
    const existingIndex = updated.findIndex((b) => b.id === draft.id || b.slug === draft.slug)

    if (existingIndex >= 0) {
      updated[existingIndex] = draft
    } else {
      updated.unshift(draft)
    }

    setBlogsList(updated)
    saveStoredBlogs(updated)
    setSaveStatus('✓ Saved successfully! Updated in site state.')
    setTimeout(() => setSaveStatus(''), 4000)
  }

  // Copy JSON
  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(draft, null, 2))
    setSaveStatus('✓ Article JSON copied to clipboard!')
    setTimeout(() => setSaveStatus(''), 4000)
  }

  // Download JSON file
  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(blogsList, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `prime-realtors-blogs-${Date.now()}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
    setSaveStatus('✓ Blogs JSON file downloaded!')
    setTimeout(() => setSaveStatus(''), 4000)
  }

  // Rich Text Formatting Toolbar Helper
  const applyFormatting = (sectionIndex, tag) => {
    const textarea = document.getElementById(`section-textarea-${sectionIndex}`)
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const selected = text.substring(start, end) || 'text'
    let replacement = ''

    switch (tag) {
      case 'bold':
        replacement = `**${selected}**`
        break
      case 'italic':
        replacement = `*${selected}*`
        break
      case 'h2':
        replacement = `\n## ${selected}\n`
        break
      case 'h3':
        replacement = `\n### ${selected}\n`
        break
      case 'ul':
        replacement = `\n* ${selected}\n* Second item`
        break
      case 'ol':
        replacement = `\n1. ${selected}\n2. Second item`
        break
      case 'quote':
        replacement = `\n> ${selected}\n`
        break
      case 'link':
        replacement = `[${selected}](https://prime-realtors.in/contact)`
        break
      case 'image':
        replacement = `\n![Image caption](/blog/open-plots-lifestyle-hyderabad.webp)\n`
        break
      default:
        replacement = selected
    }

    const newContent = text.substring(0, start) + replacement + text.substring(end)
    handleUpdateSection(sectionIndex, 'content', newContent)
  }

  // Section handlers
  const handleAddSection = () => {
    setDraft((prev) => ({
      ...prev,
      sections: [...(prev.sections || []), { heading: `${(prev.sections?.length || 0) + 1}. New Heading`, content: '' }]
    }))
  }

  const handleUpdateSection = (index, field, val) => {
    const newSections = [...(draft.sections || [])]
    newSections[index][field] = val
    setDraft({ ...draft, sections: newSections })
  }

  const handleRemoveSection = (index) => {
    const newSections = draft.sections.filter((_, i) => i !== index)
    setDraft({ ...draft, sections: newSections })
  }

  // FAQ handlers
  const handleAddFaq = () => {
    setDraft((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), { question: '', answer: '' }]
    }))
  }

  const handleUpdateFaq = (index, field, val) => {
    const newFaqs = [...(draft.faqs || [])]
    newFaqs[index][field] = val
    setDraft({ ...draft, faqs: newFaqs })
  }

  const handleRemoveFaq = (index) => {
    const newFaqs = draft.faqs.filter((_, i) => i !== index)
    setDraft({ ...draft, faqs: newFaqs })
  }

  // Image Upload helper (converts to base64 for instant preview)
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setDraft((prev) => ({ ...prev, [field]: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  // If not authenticated, show passcode login screen
  if (!isAuthenticated) {
    return (
      <main className="admin-page">
        <div className="admin-login-wrap">
          <div className="admin-login-box">
            <h2>Prime Realtors Admin</h2>
            <p>Enter the secure master password to manage and preview blogs.</p>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                className="admin-login-input"
                placeholder="Enter Secure Admin Password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
              />
              {loginError && <p style={{ color: '#b91c1c', fontSize: '13px', margin: '0 0 14px' }}>{loginError}</p>}
              <button type="submit" className="admin-login-btn">
                Unlock Admin Portal →
              </button>
            </form>
          </div>
        </div>
      </main>
    )
  }

  return (
    <div className="admin-page">
      {/* Top Bar */}
      <header className="admin-header">
        <h1>
          <span>Prime Realtors Portal</span>
          <span className="admin-header-badge">WYSIWYG &amp; Preview</span>
        </h1>

        <div className="admin-header-actions">
          {/* View Toggles */}
          <div className="admin-view-toggle">
            <button 
              type="button" 
              className={`admin-view-btn ${viewMode === 'editor' ? 'active' : ''}`}
              onClick={() => setViewMode('editor')}
            >
              Editor Only
            </button>
            <button 
              type="button" 
              className={`admin-view-btn ${viewMode === 'split' ? 'active' : ''}`}
              onClick={() => setViewMode('split')}
            >
              Split View
            </button>
            <button 
              type="button" 
              className={`admin-view-btn ${viewMode === 'preview' ? 'active' : ''}`}
              onClick={() => setViewMode('preview')}
            >
              Live Preview
            </button>
          </div>

          <button type="button" className="admin-exit-btn" onClick={() => navigate('/news-update')}>
            Exit to Site
          </button>
          <button type="button" className="admin-exit-btn" onClick={handleLogout}>
            Lock Portal
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="admin-container">
        <div className={`admin-split ${viewMode === 'editor' ? 'editor-only' : viewMode === 'preview' ? 'preview-only' : ''}`}>
          
          {/* LEFT: Editor Panel */}
          {viewMode !== 'preview' && (
            <div className="admin-editor-panel">
              {/* Blog Posts Manager Banner */}
              <div className="admin-posts-banner">
                <div className="admin-posts-header">
                  <h3>Existing Blog Posts ({blogsList.length})</h3>
                  <button 
                    type="button" 
                    className="admin-tool-btn" 
                    style={{ background: '#254b33', color: '#fff', border: 'none', padding: '6px 12px' }}
                    onClick={handleCreateNew}
                  >
                    + Write New Post
                  </button>
                </div>

                {blogsList.map((post) => {
                  const isSelected = (post.id || post.slug) === activePostId
                  return (
                    <div key={post.id || post.slug} className={`admin-post-item ${isSelected ? 'selected' : ''}`}>
                      <div className="admin-post-info">
                        <span className="admin-post-title">{post.title}</span>
                        <span className="admin-post-meta">{post.category} · {post.date} · {post.readTime}</span>
                      </div>
                      <div className="admin-post-actions">
                        <button 
                          type="button" 
                          className="admin-btn-edit"
                          onClick={() => handleEditPost(post)}
                        >
                          {isSelected ? 'Editing Now' : '✏️ Edit Post'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Basic Article Meta */}
              <div className="admin-section-card">
                <h3>1. Post Details &amp; Meta</h3>
                <div className="admin-form-group">
                  <label>Article Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Article title..."
                    value={draft.title || ''}
                    onChange={(e) => handleTitleChange(e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Subtitle / Strapline</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Short engaging subtitle..."
                    value={draft.subtitle || ''}
                    onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>URL Slug</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={draft.slug || ''}
                      onChange={(e) => setDraft({ ...draft, slug: e.target.value, id: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={draft.category || 'Land Investment Guide'}
                      onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>Author</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={draft.author || 'Prime Realtors Team'}
                      onChange={(e) => setDraft({ ...draft, author: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Reading Time</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={draft.readTime || '7 min read'}
                      onChange={(e) => setDraft({ ...draft, readTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Executive Summary / Key Takeaways</label>
                  <textarea
                    rows="3"
                    className="admin-textarea"
                    placeholder="Brief 2-3 sentence summary shown in cards and key takeaway box..."
                    value={draft.summary || ''}
                    onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
                  />
                </div>
              </div>

              {/* Images */}
              <div className="admin-section-card">
                <h3>2. Visuals &amp; Media</h3>
                <div className="admin-form-group">
                  <label>Hero Featured Image URL or Upload</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. /blog/why-investing-open-plots-hyderabad.webp"
                    value={typeof draft.heroImage === 'string' && draft.heroImage.startsWith('data:') ? '(Uploaded Custom Image)' : draft.heroImage || ''}
                    onChange={(e) => setDraft({ ...draft, heroImage: e.target.value })}
                  />
                  <div style={{ marginTop: '8px' }}>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'heroImage')} />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Secondary / In-Body Image URL or Upload</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. /blog/open-plots-lifestyle-hyderabad.webp"
                    value={typeof draft.secondaryImage === 'string' && draft.secondaryImage.startsWith('data:') ? '(Uploaded Custom Image)' : draft.secondaryImage || ''}
                    onChange={(e) => setDraft({ ...draft, secondaryImage: e.target.value })}
                  />
                  <div style={{ marginTop: '8px' }}>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'secondaryImage')} />
                  </div>
                </div>
              </div>

              {/* Modern Tiptap Document Editor */}
              <div className="admin-section-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0 }}>3. Article Body (Visual Tiptap Document Editor)</h3>
                  <span style={{ fontSize: '11px', background: '#254b33', color: '#c6df9c', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                    Tiptap WYSIWYG
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#55665a', margin: '0 0 16px' }}>
                  Write and format your entire article naturally with the top toolbar (Headings, Bold, Lists, Quotes, Links, Images). Real-time preview updates on the right!
                </p>

                <TiptapEditor
                  key={draft.id || draft.slug}
                  content={draft.contentHtml || convertSectionsToHtml(draft.sections)}
                  onChange={(html) => setDraft((prev) => ({ ...prev, contentHtml: html }))}
                />
              </div>

              {/* FAQs Section */}
              <div className="admin-section-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ margin: 0 }}>4. Frequently Asked Questions (FAQs)</h3>
                  <button type="button" className="admin-tool-btn" onClick={handleAddFaq}>
                    + Add FAQ
                  </button>
                </div>

                {draft.faqs && draft.faqs.map((faq, idx) => (
                  <div key={idx} className="admin-faq-row">
                    <div className="admin-form-group">
                      <label>Question #{idx + 1}</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. Is buying land in Ibrahimpatnam a good decision?"
                        value={faq.question}
                        onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Answer</label>
                      <textarea
                        rows="3"
                        className="admin-textarea"
                        value={faq.answer}
                        onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                      />
                    </div>
                    <button type="button" className="admin-remove-btn" onClick={() => handleRemoveFaq(idx)}>
                      Remove FAQ
                    </button>
                  </div>
                ))}
              </div>

              {/* Publish & Export Bar */}
              <div className="admin-publish-bar">
                <div className="admin-save-notice">
                  {saveStatus || 'Live editing'}
                </div>
                <div className="admin-publish-actions">
                  <button type="button" className="admin-btn-secondary" onClick={handleCopyJSON}>
                    Copy JSON
                  </button>
                  <button type="button" className="admin-btn-secondary" onClick={handleDownloadJSON}>
                    Download Backup
                  </button>
                  <button type="button" className="admin-btn-primary" onClick={handleSave}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT: Live Preview Panel */}
          {viewMode !== 'editor' && (
            <div className="admin-preview-panel">
              <div style={{ background: '#254b33', color: '#c6df9c', padding: '10px 20px', fontSize: '12px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
                <span>● REAL-TIME VISITOR PREVIEW</span>
                <span>Updates as you type</span>
              </div>
              <BlogPost previewPost={draft} />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
