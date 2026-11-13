import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const routeMetadata = {
  '/': {
    title: 'Prime Realtors | Janaharsha – Buy & Sell Verified Plots in Hyderabad',
    description: 'Prime Realtors offers verified residential, farmhouse, and investment plots across 2,000+ acres in Janaharsha and Ibrahimpatnam, Hyderabad. Expert guidance & guided site visits.',
    path: '/',
  },
  '/our-presence': {
    title: 'Our Presence in Janaharsha & Ibrahimpatnam | Prime Realtors',
    description: 'Explore Prime Realtors presence across 2,000+ acres in Janaharsha, Ibrahimpatnam, Polkampally, and Raipole with established roads and teak plantations.',
    path: '/our-presence',
  },
  '/buy-sell': {
    title: 'Buy & Sell Verified Plots in Janaharsha | Prime Realtors',
    description: 'Find your ideal plot in Janaharsha for farmhouse, investment, or future home, or list your land for sale with Prime Realtors trusted team.',
    path: '/buy-sell',
  },
  '/contact': {
    title: 'Contact Prime Realtors | Book a Guided Site Visit in Janaharsha',
    description: 'Get in touch with Kalyan, Srinivas, and Shiva at Prime Realtors. Call 80736 48872 or visit our Ibrahimpatnam office to explore Janaharsha plots.',
    path: '/contact',
  },
  '/gallery': {
    title: 'Janaharsha Photo Gallery & Layout Views | Prime Realtors',
    description: 'Browse photos of Janaharsha community, open horizons, lakes, parks, and planned layouts near Ramoji Film City, Hyderabad.',
    path: '/gallery',
  },
  '/news-update': {
    title: 'News & Development Updates from Janaharsha | Prime Realtors',
    description: 'Stay updated with regional growth, highway connectivity, and land development milestones around Janaharsha and Ibrahimpatnam.',
    path: '/news-update',
  },
  '/faqs': {
    title: 'Janaharsha Plot FAQs – Buying, Farmhouses & Land Use | Prime Realtors',
    description: 'Answers to frequently asked questions about buying plots, legal registration, farmhouse planning, and investment in Janaharsha near Hyderabad.',
    path: '/faqs',
    schemaType: 'FAQPage',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Prime Realtors Janaharsha',
    description: 'Read the privacy policy of Prime Realtors Janaharsha regarding client information handling and inquiry privacy.',
    path: '/privacy-policy',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | Prime Realtors Janaharsha',
    description: 'Read our terms and conditions regarding plot consultancy, site visits, and property transactions with Prime Realtors.',
    path: '/terms-and-conditions',
  },
  '/thank-you': {
    title: 'Thank You for Your Enquiry | Prime Realtors',
    description: 'Your enquiry has been received. The Prime Realtors team will connect with you shortly regarding Janaharsha plots.',
    path: '/thank-you',
  },
}

const faqSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'What kind of properties does Prime Realtors offer in Janaharsha?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Prime Realtors focuses on verified plot opportunities in and around Janaharsha. Depending on availability, plots suit future investment, personal farming, farmhouse planning, or weekend use.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Who is Janaharsha suitable for?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Janaharsha is suitable for families looking for land outside crowded city limits, buyers planning personal farming or farmhouses, and investors seeking long-term land appreciation.',
      },
    },
    {
      '@type': 'Question',
      'name': 'How far is Janaharsha from Hyderabad?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Janaharsha is positioned approximately 35 km from Hyderabad near Ramoji Film City and Vijayawada Highway corridor with strong road connectivity.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Can I schedule a site visit before making a decision?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Yes, Prime Realtors arranges guided site visits so you can inspect location, approach roads, surroundings, and available plot blocks in person.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Are different plot sizes available?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Plot sizes range from 120, 200, 240, 360, 480, 600, 1000, to 2400+ square yards based on current inventory and buyer requirements.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Can I build a farmhouse on the plot in Janaharsha?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Farmhouse development depends on land-use regulations and local permissions. Prime Realtors assists buyers with property details and technical verification before construction.',
      },
    },
  ],
}

export default function SEO() {
  const { pathname } = useLocation()
  const siteUrl = 'https://primerealtorsjanaharsha.com'

  useEffect(() => {
    const meta = routeMetadata[pathname] || routeMetadata['/']
    const fullUrl = `${siteUrl}${meta.path === '/' ? '' : meta.path}`

    // Update document title
    document.title = meta.title

    // Helper to update or create meta tags
    const setMetaTag = (selector, attribute, value) => {
      let tag = document.querySelector(selector)
      if (!tag) {
        tag = document.createElement('meta')
        const [attrName] = selector.replace(/[[\]]/g, '').split('=')
        tag.setAttribute(attrName, attribute)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', value)
    }

    // Update Meta Description
    setMetaTag('meta[name="description"]', 'description', meta.description)
    setMetaTag('meta[property="og:title"]', 'og:title', meta.title)
    setMetaTag('meta[property="og:description"]', 'og:description', meta.description)
    setMetaTag('meta[property="og:url"]', 'og:url', fullUrl)
    setMetaTag('meta[name="twitter:title"]', 'twitter:title', meta.title)
    setMetaTag('meta[name="twitter:description"]', 'twitter:description', meta.description)
    setMetaTag('meta[name="twitter:url"]', 'twitter:url', fullUrl)

    // Update Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', fullUrl)

    // Dynamic FAQ Schema injection
    let existingFaqScript = document.getElementById('faq-schema-jsonld')
    if (meta.schemaType === 'FAQPage') {
      if (!existingFaqScript) {
        const script = document.createElement('script')
        script.id = 'faq-schema-jsonld'
        script.type = 'application/ld+json'
        script.textContent = JSON.stringify(faqSchemaData)
        document.head.appendChild(script)
      }
    } else if (existingFaqScript) {
      existingFaqScript.remove()
    }
  }, [pathname])

  return null
}
