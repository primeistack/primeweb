import { useNavigate } from 'react-router-dom'
import './NewsUpdate.css'
import heroImage from '../../assets/Home1.jpg'
import layoutImage from '../../assets/Gallery/layout.jpeg'
import greeneryImage from '../../assets/Gallery/park.jpeg'
import siteImage from '../../assets/Gallery/view.jpeg'
import { getStoredBlogs } from '../../data/blogs.js'

const updates = [
    {
        category: 'Layout plans',
        title: 'Explore the plot plans',
        copy: 'Review sample plot boundaries, dimensions, road access and neighbouring plots before discussing a specific option with our team.',
        image: layoutImage,
        alt: 'Printed plotted land plan showing boundaries and dimensions',
        action: 'View plot options',
        href: '/buy-sell?tab=buy',
    },
    {
        category: 'The landscape',
        title: 'A greener setting outside the city',
        copy: 'Janaharsha includes established teak plantations and open surroundings. Visit to experience the landscape in person.',
        image: greeneryImage,
        alt: 'Green landscape and trees at the project',
        action: 'Plan a site visit',
        href: '/buy-sell?tab=visit',
    },
    {
        category: 'On-site views',
        title: 'See the surroundings for yourself',
        copy: 'Browse views from the project and talk with Prime Realtors about locality, access and the plans that interest you.',
        image: siteImage,
        alt: 'View across the Janaharsha project surroundings',
        action: 'Open the gallery',
        href: '/gallery',
    },
]

function NewsUpdate() {
    const navigate = useNavigate()
    const blogs = getStoredBlogs()
    const featuredBlog = blogs[0]

    return (
        <main className="news-page">
            <section className="news-hero">
                <div className="news-hero-copy">
                    <p className="news-eyebrow">Prime Realtors · Insights & News</p>
                    <h1>News from<br /><em>the landscape.</em></h1>
                    <p>In-depth property investment guides, master plan developments, and updates from Prime Realtors Janaharsha.</p>
                </div>
                <div className="news-hero-image">
                    <img src={heroImage} alt="Aerial view of Janaharsha plotted landscape and roads" />
                    <span>Janaharsha · Hyderabad</span>
                </div>
            </section>

            {/* Featured Lead Blog Article */}
            {featuredBlog && (
                <section className="news-featured-section">
                    <div className="news-featured-card">
                        <div className="news-featured-media">
                            <img src={featuredBlog.heroImage} alt={featuredBlog.heroImageAlt || featuredBlog.title} />
                            <span className="news-featured-badge">{featuredBlog.category}</span>
                        </div>
                        <div className="news-featured-content">
                            <div className="news-featured-meta">
                                <span>{featuredBlog.date}</span>
                                <span>·</span>
                                <span>{featuredBlog.readTime}</span>
                                <span>·</span>
                                <span>By {featuredBlog.author}</span>
                            </div>
                            <h2>{featuredBlog.title}</h2>
                            <p>{featuredBlog.summary}</p>
                            <div className="news-featured-actions">
                                <button 
                                    type="button" 
                                    className="news-read-btn"
                                    onClick={() => navigate(`/news-update/${featuredBlog.slug}`)}
                                >
                                    Read Complete Guide <span aria-hidden="true">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Additional Articles & Project Highlights */}
            <section className="news-listing">
                <div className="news-listing-heading">
                    <div>
                        <p className="news-eyebrow">Explore More</p>
                        <h2>Plot planning &amp;<br /><em>site opportunities.</em></h2>
                    </div>
                    <p>Guidance on boundaries, site visits, and surrounding amenities across Janaharsha and Ibrahimpatnam.</p>
                </div>

                <div className="news-card-list">
                    {blogs.slice(1).map((blog, idx) => (
                        <article className="news-card" key={blog.id || idx}>
                            <div className="news-card-image">
                                <span className="news-card-number">{idx + 2}</span>
                                <img src={blog.heroImage} alt={blog.title} />
                            </div>
                            <div className="news-card-copy">
                                <p className="news-card-category">{blog.category}</p>
                                <h3>{blog.title}</h3>
                                <p>{blog.summary}</p>
                                <button type="button" onClick={() => navigate(`/news-update/${blog.slug}`)}>
                                    Read Article <span aria-hidden="true">&#8599;</span>
                                </button>
                            </div>
                        </article>
                    ))}

                    {updates.map((item, idx) => (
                        <article className="news-card" key={idx}>
                            <div className="news-card-image">
                                <span className="news-card-number">{blogs.length + idx}</span>
                                <img src={item.image} alt={item.alt} />
                            </div>
                            <div className="news-card-copy">
                                <p className="news-card-category">{item.category}</p>
                                <h3>{item.title}</h3>
                                <p>{item.copy}</p>
                                <button type="button" onClick={() => navigate(item.href)}>
                                    {item.action} <span aria-hidden="true">&#8599;</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="news-contact-band">
                <div>
                    <p className="news-eyebrow">Have a question?</p>
                    <h2>Get the details<br /><em>that matter to you.</em></h2>
                </div>
                <p>Talk with the Prime Realtors team about plot plans, locality or arranging a visit.</p>
                <button type="button" onClick={() => navigate('/contact')}>
                    Contact Prime Realtors<span aria-hidden="true">&#8599;</span>
                </button>
            </section>
        </main>
    )
}

export default NewsUpdate