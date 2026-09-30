import './LegalDocuments.css'

const sections = [
    {
        number: '01',
        title: 'Information We Collect',
        items: [
            'Name, mobile number, email address and city/location.',
            'Budget range, preferred plot size, property requirements and site-visit preferences.',
            'Enquiry details shared through our website, WhatsApp, calls, social media or advertisements.',
        ],
    },
    {
        number: '02',
        title: 'How We Use Your Information',
        items: [
            'To respond to enquiries and share plot availability, pricing and location details.',
            'To arrange site visits and provide property-related assistance.',
            'To send relevant updates, offers or follow-up communication where permitted.',
        ],
    },
    {
        number: '03',
        title: 'Information Sharing',
        items: [
            'We do not sell or rent your personal information for independent third-party marketing.',
            'Information may be shared only with authorised team members and service providers when needed to support your enquiry.',
            'Where requested, details may be shared with banks/financial partners or with authorities when legally required.',
        ],
    },
    {
        number: '04',
        title: 'Cookies & Digital Advertising',
        items: [
            'Our website may use cookies and analytics tools to understand website usage and improve performance.',
            'Meta/Facebook, Instagram, Google Ads or similar platforms may be used to measure campaigns and enquiries.',
            'Third-party platforms process data according to their own privacy policies.',
        ],
    },
    {
        number: '05',
        title: 'Your Privacy Choices',
        items: [
            'You may ask us to correct or update inaccurate information.',
            'You may request to stop promotional calls, messages or other marketing communication.',
            'Where applicable, you may request deletion or withdrawal of consent, subject to legal or record-keeping requirements.',
        ],
    },
]

function PrivacyPolicy() {
    return (
        <main className="legal-page">
            <header className="legal-hero">
                <div className="legal-hero-inner">
                    <p className="legal-eyebrow">Prime Realtors <span>/</span> Janaharsha</p>
                    <h1>Privacy Policy</h1>
                    <p className="legal-subtitle">Simple, transparent and customer-friendly privacy practices.</p>
                    <p className="legal-trustline">Trusted value &amp; growth</p>
                </div>
            </header>

            <div className="legal-content">
                <p className="legal-intro">
                    This privacy policy explains how Prime Realtors - Janaharsha collects, uses and handles enquiry information shared by customers and prospects.
                </p>

                <div className="legal-sections">
                    {sections.map((section) => (
                        <section className="legal-section" key={section.number}>
                            <span className="legal-section-number">{section.number}</span>
                            <div className="legal-section-body">
                                <h2>{section.title}</h2>
                                <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
                            </div>
                        </section>
                    ))}
                </div>

                <aside className="legal-contact">
                    <div>
                        <p className="legal-eyebrow">Prime Realtors - Janaharsha</p>
                        <h2>Questions about your information?</h2>
                        <p>Janaharsha, Hyderabad, Telangana, India</p>
                    </div>
                    <div className="legal-contact-details">
                        <a href="mailto:primerealtors.janaharsha@gmail.com">primerealtors.janaharsha@gmail.com</a>
                        <a href="tel:+918106438696">Shiva: 8106438696</a>
                        <a href="tel:+918463937607">Srinivas: 8463937607</a>
                        <a href="tel:+918073648872">Kalyan: 8073648872</a>
                    </div>
                </aside>
                <p className="legal-review-note">Before publication, confirm the official email address and align this policy with the exact website forms, analytics, advertising and CRM tools used.</p>
            </div>
        </main>
    )
}

export default PrivacyPolicy
