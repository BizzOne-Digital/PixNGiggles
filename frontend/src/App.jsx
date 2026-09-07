import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import MainLayout from './layouts/MainLayout';
import LoadingSpinner from './components/common/LoadingSpinner';
import ScrollToTop from './components/common/ScrollToTop';
import ProtectedRoute from './admin/routes/ProtectedRoute';
import AdminLogin from './admin/pages/AdminLogin';
import ComingSoon from './pages/ComingSoon';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Booths = lazy(() => import('./pages/Booths'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Booking = lazy(() => import('./pages/Booking'));
const Contact = lazy(() => import('./pages/Contact'));

const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const LeadsManagement = lazy(() => import('./admin/pages/LeadsManagement'));
const ContactsManagement = lazy(() => import('./admin/pages/ContactsManagement'));
const ServicesManagement = lazy(() => import('./admin/pages/ServicesManagement'));
const BoothsManagement = lazy(() => import('./admin/pages/BoothsManagement'));
const AddOnsManagement = lazy(() => import('./admin/pages/AddOnsManagement'));
const GalleryManagement = lazy(() => import('./admin/pages/GalleryManagement'));
const TestimonialsManagement = lazy(() => import('./admin/pages/TestimonialsManagement'));
const FAQsManagement = lazy(() => import('./admin/pages/FAQsManagement'));
const SettingsManagement = lazy(() => import('./admin/pages/SettingsManagement'));

const PageLoader = () => <LoadingSpinner className="min-h-[50vh]" size="lg" />;

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: '#2d2d2d', color: '#fff', border: '1px solid rgba(201,169,98,0.3)' },
              success: { iconTheme: { primary: '#c9a962', secondary: '#1a1a1a' } },
            }}
          />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<ComingSoon />} />
              <Route path="/about" element={<ComingSoon />} />
              <Route path="/services" element={<ComingSoon />} />
              <Route path="/booths" element={<ComingSoon />} />
              <Route path="/gallery" element={<ComingSoon />} />
              <Route path="/booking" element={<ComingSoon />} />
              <Route path="/contact" element={<ComingSoon />} />
              <Route path="*" element={<ComingSoon />} />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/leads" element={<ProtectedRoute><LeadsManagement /></ProtectedRoute>} />
              <Route path="/admin/contacts" element={<ProtectedRoute><ContactsManagement /></ProtectedRoute>} />
              <Route path="/admin/services" element={<ProtectedRoute><ServicesManagement /></ProtectedRoute>} />
              <Route path="/admin/booths" element={<ProtectedRoute><BoothsManagement /></ProtectedRoute>} />
              <Route path="/admin/addons" element={<ProtectedRoute><AddOnsManagement /></ProtectedRoute>} />
              <Route path="/admin/gallery" element={<ProtectedRoute><GalleryManagement /></ProtectedRoute>} />
              <Route path="/admin/testimonials" element={<ProtectedRoute><TestimonialsManagement /></ProtectedRoute>} />
              <Route path="/admin/faqs" element={<ProtectedRoute><FAQsManagement /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><SettingsManagement /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
