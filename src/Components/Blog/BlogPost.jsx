import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getStoredBlogs } from '../../data/blogs.js'
import './BlogPost.css'

export default function BlogPost({ previewPost }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)
  const [copied, setCopied] = useState(false)

  // Support either previewPost passed from Admin or lookup by slug from route
  const post = previewPost || (() => {
    const blogs = getStoredBlogs()
    return blogs.find((b) => b.slug === slug || b.id === slug) || blogs[0]
  })()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  if (!post) {
    return (
      <main className="blog-post-page" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>Blog post not found</h2>
        <p>The article you are looking for does not exist or has moved.</p>
        <Link to="/news-update" style={{ color: '#254b33', fontWeight: 'bold' }}>← Back to News & Updates</Link>
      </main>
    )
  }

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <main className="blog-post-page">
      {/* Hero Header */}
      <section className="blog-hero">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <button type="button" onClick={() => navigate('/news-update')}>News & Updates</button>
          <span>/</span>
          <span>{post.category || 'Article'}</span>
        </nav>

        <h1>{post.title}</h1>

        {post.subtitle && <p className="blog-hero-subtitle">{post.subtitle}</p>}

        <div className="blog-meta-bar">
          <div className="blog-meta-left">
            <span className="blog-badge">{post.category || 'Guide'}</span>
            <span>By <strong>{post.author || 'Prime Realtors Team'}</strong></span>
            <span>·</span>
            <time>{post.date || 'November 2026'}</time>
            <span>·</span>
            <span>{post.readTime || '7 min read'}</span>
          </div>

          <div className="blog-meta-actions">
            <button type="button" className="blog-share-btn" onClick={handleShare}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              {copied ? 'Link Copied!' : 'Share Article'}
            </button>
            <a 
              className="blog-share-btn" 
              href={`https://wa.me/?text=${encodeURIComponent(post.title + ' - ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
              target="_blank" 
              rel="noreferrer"
              style={{ backgroundColor: '#25d366', color: '#093616', borderColor: '#25d366' }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Featured Banner Image */}
      {post.heroImage && (
        <div className="blog-featured-image-wrap">
          <img 
            className="blog-featured-image" 
            src={post.heroImage} 
            alt={post.heroImageAlt || post.title} 
            loading="eager"
            fetchPriority="high"
          />
          <div className="blog-featured-caption">
            {post.heroImageAlt || 'Prime Realtors · Janaharsha & Ibrahimpatnam Land Planning'}
          </div>
        </div>
      )}

      {/* Main Content Layout with Sticky Sidebar */}
      <div className="blog-layout">
        {/* Sidebar Table of Contents */}
        <aside className="blog-sidebar">
          <div className="blog-toc-title">In This Article</div>
          <nav className="blog-toc-list">
            {post.sections && post.sections.map((sec, idx) => (
              <a key={idx} href={`#section-${idx}`}>
                {sec.heading.replace(/^\d+\.\s*/, '')}
              </a>
            ))}
            {post.comparisonTable && (
              <a href="#comparison-table">Plots vs Apartments</a>
            )}
            {post.faqs && post.faqs.length > 0 && (
              <a href="#faqs">Frequently Asked Questions</a>
            )}
          </nav>

          <div className="blog-sidebar-cta">
            <h4>Plan a Site Visit</h4>
            <p>Inspect layout road dimensions and teak surroundings in person.</p>
            <button type="button" onClick={() => navigate('/buy-sell?tab=visit#contact-details')}>
              Book Guided Tour
            </button>
          </div>
        </aside>

        {/* Article Content */}
        <article className="blog-body">
          {/* Summary Quote Box */}
          {post.summary && (
            <div className="blog-highlight-box">
              <h3>Key Takeaways</h3>
              <p>{post.summary}</p>
            </div>
          )}

          {/* Article Content: Rich HTML from Tiptap or Structured Sections */}
          {post.contentHtml ? (
            <div 
              className="blog-body-rich" 
              dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
            />
          ) : (
            post.sections && post.sections.map((sec, idx) => {
            // Place secondary image after Section 4
            const showSecondaryImg = idx === 3 && post.secondaryImage

            // Check if section 7/8 for special card
            const isProjectSection = sec.heading.toLowerCase().includes('prime realtors')

            return (
              <div key={idx} id={`section-${idx}`}>
                <h2>{sec.heading}</h2>

                {sec.content.split('\n\n').map((para, pIdx) => {
                  if (para.startsWith('* ') || para.startsWith('- ')) {
                    const items = para.split('\n').filter(Boolean)
                    return (
                      <ul key={pIdx}>
                        {items.map((item, iIdx) => {
                          const clean = item.replace(/^[*-\s]+/, '')
                          return (
                            <li key={iIdx} dangerouslySetInnerHTML={{ 
                              __html: clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                            }} />
                          )
                        })}
                      </ul>
                    )
                  }
                  if (/^\d+\.\s/.test(para)) {
                    const items = para.split('\n').filter(Boolean)
                    return (
                      <ol key={pIdx}>
                        {items.map((item, iIdx) => {
                          const clean = item.replace(/^\d+\.\s*/, '')
                          return (
                            <li key={iIdx} dangerouslySetInnerHTML={{ 
                              __html: clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                            }} />
                          )
                        })}
                      </ol>
                    )
                  }
                  return (
                    <p key={pIdx} dangerouslySetInnerHTML={{ 
                      __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                    }} />
                  )
                })}

                {/* Show secondary image inside content */}
                {showSecondaryImg && (
                  <figure className="blog-inline-image-wrap">
                    <img 
                      src={post.secondaryImage} 
                      alt={post.secondaryImageAlt || 'Scenic open plots and green surroundings'} 
                      loading="lazy" 
                    />
                    <figcaption>{post.secondaryImageAlt || 'Scenic green surroundings and planned plot layouts in Ibrahimpatnam'}</figcaption>
                  </figure>
                )}

                {/* Show project highlight card for Section 8 */}
                {isProjectSection && (
                  <div className="blog-project-card">
                    <h3>Explore QP-11 Dream City II, Sagar Block</h3>
                    <p>
                      Looking for clear-title, legally verified open plots with established teak tree avenues and wide roads in Ibrahimpatnam? Our team is directly available on-site to walk you through available plots.
                    </p>
                    <div className="blog-project-actions">
                      <button 
                        type="button" 
                        className="blog-btn-primary"
                        onClick={() => navigate('/buy-sell?tab=visit#contact-details')}
                      >
                        Schedule Free Site Visit →
                      </button>
                      <a 
                        className="blog-btn-secondary" 
                        href="https://wa.me/918073648872?text=Hello%20Prime%20Realtors,%20I%20am%20interested%20in%20QP-11%20Dream%20City%20II%20Ibrahimpatnam%20plots."
                        target="_blank" 
                        rel="noreferrer"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )
          }))}

          {/* Comparison Table */}
          {post.comparisonTable && (
            <div id="comparison-table" style={{ margin: '40px 0' }}>
              <h2>Open Plots vs Apartments: Comparison</h2>
              <p>A quick breakdown to help you match your property choice with your immediate and long-term priorities:</p>
              <div className="blog-table-container">
                <table className="blog-comparison-table">
                  <thead>
                    <tr>
                      {post.comparisonTable.headers.map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {post.comparisonTable.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FAQ Accordion */}
          {post.faqs && post.faqs.length > 0 && (
            <section id="faqs" className="blog-faq-section">
              <h2>Frequently Asked Questions</h2>
              <p>Common questions answered by real estate legal and site advisors:</p>

              {post.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div className="blog-faq-item" key={idx}>
                    <button 
                      type="button" 
                      className="blog-faq-question" 
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span className="blog-faq-icon">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="blog-faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </section>
          )}

          {/* Author Card Footer */}
          <div className="blog-author-footer">
            <div className="blog-author-avatar">PR</div>
            <div className="blog-author-info">
              <h4>Published by {post.author || 'Prime Realtors Team'}</h4>
              <p>
                Prime Realtors specializes in verified residential, farmhouse, and investment plots across 2,000+ acres in Janaharsha and Ibrahimpatnam, Hyderabad. Guided by experience and built on trust.
              </p>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}
