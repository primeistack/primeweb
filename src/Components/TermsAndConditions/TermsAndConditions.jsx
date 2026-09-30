import '../PrivacyPolicy/LegalDocuments.css'

const sections = [
    {
        number: '01',
        title: 'Acceptance of These Terms',
        items: [
            'By using the Prime Realtors Janaharsha website, submitting an enquiry, requesting a callback, interacting with an advertisement, or arranging a site visit, you agree to these Terms & Conditions and the applicable Privacy Policy.',
            'If you do not agree with these terms, please do not submit personal details or rely on the website for a purchase decision.',
        ],
    },
    {
        number: '02',
        title: 'Nature of Our Services',
        items: [
            'Prime Realtors provides information and assistance relating to plot opportunities in and around Janaharsha, including customer enquiries, property information and site-visit coordination.',
            'Website, brochure, social-media and advertisement content is intended for general information and lead-assistance purposes unless a specific detail is confirmed in writing for a particular plot.',
        ],
    },
    {
        number: '03',
        title: 'Property Information & Representations',
        items: [
            'Plot dimensions, facing, road access, location references, images, maps, distances, development descriptions and other property details may vary by plot and may be updated as information changes.',
            'Photographs, illustrations, layouts and promotional creatives may be representational. Buyers should verify the specific property before booking.',
        ],
    },
    {
        number: '04',
        title: 'Prices, Offers & Availability',
        items: [
            'Prices, availability, plot sizes, promotional offers and payment schedules can change without prior notice and may differ from one plot or transaction to another.',
            'Any quoted amount should be reconfirmed at the time of booking. Government charges, registration costs and other applicable charges may be separate unless expressly stated otherwise.',
        ],
    },
    {
        number: '05',
        title: 'Site Visits',
        items: [
            'Site visits are arranged for convenience so buyers can inspect the location, access, surroundings and available plots.',
            'Travel time, nearby development and on-site conditions can vary. A site visit does not by itself reserve or guarantee a plot.',
        ],
    },
    {
        number: '06',
        title: 'Booking & Payments',
        items: [
            'A booking is subject to current availability, agreed commercial terms and completion of the applicable booking process.',
            'Before making any payment, buyers should understand the booking amount, cancellation or adjustment terms, payment schedule, applicable charges and the specific plot being considered.',
            'Payments should be made only through channels communicated or acknowledged by Prime Realtors.',
        ],
    },
    {
        number: '07',
        title: 'Documents & Independent Verification',
        items: [
            'Buyers should review the ownership/title documents, survey or layout information, encumbrance position and other documents relevant to the specific property before completing a purchase.',
            'Prime Realtors may assist with available property information, but buyers are encouraged to obtain independent legal, financial and technical advice before registration.',
        ],
    },
    {
        number: '08',
        title: 'Land Use, Construction & Approvals',
        items: [
            'Any proposed use such as personal farming, plantation, fencing, farmhouse construction or other development is subject to the land classification, applicable laws, local permissions and property-specific restrictions.',
            'Customers should verify permitted use and required approvals before starting any activity or construction on the land.',
        ],
    },
    {
        number: '09',
        title: 'Communication & Marketing Consent',
        items: [
            'When you voluntarily submit your contact details, you may be contacted in relation to your enquiry, plot availability, site visits, follow-up assistance and relevant offers through phone, WhatsApp, SMS, email or other communication channels where permitted.',
            'You may ask to stop promotional communication at any time. Service-related communication connected to an active enquiry or transaction may still be sent where necessary.',
        ],
    },
    {
        number: '10',
        title: 'Third-Party Services & Platforms',
        items: [
            'The website or marketing process may use or link to third-party services such as maps, social-media platforms, advertising platforms, messaging tools, payment services, banks or lenders.',
            'Third-party services operate under their own terms and privacy practices. Prime Realtors is not responsible for the independent acts, policies or availability of those third parties.',
        ],
    },
    {
        number: '11',
        title: 'Intellectual Property',
        items: [
            'Unless otherwise stated, the Prime Realtors name, logo, website content, promotional creatives, text and other brand materials may not be copied, reproduced or used for commercial purposes without permission.',
            'Third-party trademarks, maps, photographs or content remain the property of their respective owners.',
        ],
    },
    {
        number: '12',
        title: 'No Guaranteed Returns or Appreciation',
        items: [
            'Any discussion of future growth, investment potential or possible appreciation is informational and should not be treated as a guaranteed return, assured profit or financial promise.',
            'Land values may rise, remain unchanged or fall depending on market demand, infrastructure, regulation, location and other factors outside the control of Prime Realtors.',
        ],
    },
    {
        number: '13',
        title: 'Limitation, Updates & Applicable Law',
        items: [
            'Prime Realtors will make reasonable efforts to provide useful information, but customers should base final decisions on verified property documents and transaction terms rather than promotional material alone.',
            'These Terms & Conditions may be updated from time to time to reflect business, website or legal changes. The latest published version will apply to continued use of the website and enquiry services.',
            'These terms are intended to operate under the laws applicable in India. Any dispute should be handled in accordance with the jurisdiction stated in the final legally reviewed version used by Prime Realtors.',
        ],
    },
]

function TermsAndConditions() {
    return (
        <main className="legal-page">
            <header className="legal-hero">
                <div className="legal-hero-inner">
                    <p className="legal-eyebrow">Prime Realtors <span>/</span> Janaharsha</p>
                    <h1>Terms &amp; Conditions</h1>
                    <p className="legal-subtitle">Clear terms for website visitors, enquiries, site visits and plot buyers</p>
                    <p className="legal-trustline">PRIME REALTORS | JANAHARSHA</p>
                </div>
            </header>

            <div className="legal-content">
                <p className="legal-intro">
                    A customer-friendly Terms &amp; Conditions draft written specifically for Prime Realtors Janaharsha. These terms are designed for website, digital advertising, enquiry handling, site visits and plot-buyer communication. They are intentionally practical and should be legally reviewed before publication.
                </p>

                <aside className="legal-important">
                    <span className="legal-important-label">Important</span>
                    <p>Property details, availability, pricing, approvals, permitted use, statutory charges and transaction terms can vary by plot. Always verify the specific property and written transaction documents before booking or registration.</p>
                </aside>

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
                        <h2>Questions about these terms?</h2>
                        <p>Contact the Prime Realtors team through the official contact details used on the website, advertisements or customer communications.</p>
                    </div>
                    <div className="legal-contact-details">
                        <a href="mailto:primerealtors.janaharsha@gmail.com">primerealtors.janaharsha@gmail.com</a>
                        <a href="tel:+918106438696">Shiva: 8106438696</a>
                        <a href="tel:+918463937607">Srinivas: 8463937607</a>
                        <a href="tel:+918073648872">Kalyan: 8073648872</a>
                    </div>
                </aside>
                <p className="legal-review-note">Legal review note: This document is a business-ready draft, not a substitute for advice from a qualified lawyer. Before publishing, confirm the jurisdiction and other details in the final legally reviewed version.</p>
            </div>
        </main>
    )
}

export default TermsAndConditions
