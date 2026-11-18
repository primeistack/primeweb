import './App.css'
import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import SEO from './Components/SEO/SEO.jsx'

// Route-based code splitting for Core Web Vitals (TBT/INP & faster initial bundle)
const Home = lazy(() => import('./Components/Home/Home.jsx'))
const Presence = lazy(() => import('./Components/Presence/Presence.jsx'))
const Contact = lazy(() => import('./Components/Contact/Contact.jsx'))
const BuySell = lazy(() => import('./Components/buysell.jsx'))
const ThankYou = lazy(() => import('./Components/ThankYou/ThankYou.jsx'))
const Gallery = lazy(() => import('./Components/Gallery/Gallery.jsx'))
const NewsUpdate = lazy(() => import('./Components/NewsUpdate/NewsUpdate.jsx'))
const BlogPost = lazy(() => import('./Components/Blog/BlogPost.jsx'))
const AdminPortal = lazy(() => import('./Components/Admin/AdminPortal.jsx'))
const FAQs = lazy(() => import('./Components/FAQs/FAQs.jsx'))
const PrivacyPolicy = lazy(() => import('./Components/PrivacyPolicy/PrivacyPolicy.jsx'))
const TermsAndConditions = lazy(() => import('./Components/TermsAndConditions/TermsAndConditions.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function RouteLoading() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '3px solid #dce5d7', borderTopColor: '#275b3b', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div className="app-shell">
      {!isAdmin && <SEO />}
      {!isAdmin && <Header />}
      <ScrollToTop />
      <Suspense fallback={<RouteLoading />}>
        <Routes>
          <Route path="/our-presence" element={<Presence />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/buy-sell" element={<BuySell />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news-update" element={<NewsUpdate />} />
          <Route path="/news-update/:slug" element={<BlogPost />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      {!isAdmin && <Footer />}
    </div>
  )
}

export default App