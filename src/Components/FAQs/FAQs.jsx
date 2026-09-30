import '../PrivacyPolicy/LegalDocuments.css'
import './FAQs.css'

const questions = [
    {
        question: 'What kind of properties does Prime Realtors offer in Janaharsha?',
        answers: [
            'Prime Realtors focuses on plot opportunities in and around Janaharsha.',
            'Depending on availability, plots may suit future investment, personal farming, farmhouse planning or weekend use.',
            'Current plot details should always be confirmed before booking.',
        ],
    },
    {
        question: 'Who is Janaharsha suitable for?',
        answers: [
            'Families looking for their own piece of land outside the busy city environment.',
            'Buyers interested in personal farming, a future farmhouse or a weekend space.',
            'Investors who prefer land as a long-term asset and are comfortable evaluating location and market factors.',
        ],
    },
    {
        question: 'How far is Janaharsha from Hyderabad?',
        answers: [
            'Prime Realtors generally positions its Janaharsha options within roughly 35 km of Hyderabad.',
            'Travel time can vary depending on your starting point, traffic and the exact plot location.',
            'A site visit is the best way to judge practical accessibility for your family.',
        ],
    },
    {
        question: 'Can I schedule a site visit before making a decision?',
        answers: [
            'Yes. A site visit can be arranged so you can inspect the location, approach roads, surroundings and available plots.',
            'Ask for current availability before visiting so the team can show relevant options.',
            'It is useful to carry a list of questions about price, dimensions, documentation and registration.',
        ],
    },
    {
        question: 'Are different plot sizes available?',
        answers: [
            'Plot sizes can vary based on the property and current inventory.',
            'The team can suggest options based on your budget, intended use and preferred dimensions.',
            'Confirm the exact measurements and boundaries for the specific plot you shortlist.',
        ],
    },
    {
        question: 'Can I use the plot for personal farming or plantation?',
        answers: [
            'Many buyers consider land for vegetables, fruit plants, small plantations or other personal farming ideas.',
            'What you can legally do depends on the land classification, local rules and the individual property.',
            'Verify permitted use before spending on cultivation, fencing or structures.',
        ],
    },
    {
        question: 'Can I build a farmhouse on the plot?',
        answers: [
            "A farmhouse may be part of your future plan, but construction is subject to the applicable land-use rules and local permissions.",
            "Before building, confirm the plot's legal status, permissible construction and required approvals.",
            'Prime Realtors can help you understand the property details, while final legal and technical verification should be done before construction.',
        ],
    },
    {
        question: 'Is Janaharsha suitable for weekend retreats and family time?',
        answers: [
            'For buyers seeking a quieter space away from daily city routines, a plot can be planned as a future weekend retreat.',
            'You can evaluate greenery, access, nearby facilities and the surrounding environment during the site visit.',
            'Choose a plot based on how frequently you expect to use it and how easily your family can travel there.',
        ],
    },
]

function FAQs() {
    return (
        <main className="legal-page faq-page">
            <header className="legal-hero">
                <div className="legal-hero-inner">
                    <p className="legal-eyebrow">Prime Realtors <span>/</span> Janaharsha</p>
                    <h1>Frequently Asked Questions</h1>
                    <p className="legal-subtitle">Clear answers for plot buyers, families, investors and weekend-living seekers.</p>
                    <p className="legal-trustline">Trusted value &amp; growth</p>
                </div>
            </header>

            <div className="legal-content">
                <p className="legal-intro">A compact FAQ set for customer enquiries, brochures, website use and sales follow-up. Please confirm current property details before making a booking decision.</p>

                <aside className="faq-buyer-tip">
                    <span>Buyer tip</span>
                    <p>Compare location, documentation, total cost and intended use, not just the headline price.</p>
                </aside>

                <div className="faq-list">
                    {questions.map((item, index) => (
                        <details className="faq-item" key={item.question}>
                            <summary>
                                <span className="faq-number">{String(index + 1).padStart(2, '0')}</span>
                                <span className="faq-question">{item.question}</span>
                                <span className="faq-toggle" aria-hidden="true" />
                            </summary>
                            <div className="faq-answer">
                                <ul>{item.answers.map((answer) => <li key={answer}>{answer}</li>)}</ul>
                            </div>
                        </details>
                    ))}
                </div>

                <aside className="legal-important faq-important">
                    <span className="legal-important-label">Important note</span>
                    <p>Availability, pricing, approvals, permissible use and other property details can vary by plot and may change. Buyers should verify current documents, legal status and transaction terms before booking or registration.</p>
                </aside>
            </div>
        </main>
    )
}

export default FAQs