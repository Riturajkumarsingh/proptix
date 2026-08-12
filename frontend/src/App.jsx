import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectInitialized, selectUserRole } from '@store/slices/authSlice';
import { PageLoader } from '@components/ui/Loading';
import useAuth from '@hooks/useAuth';

// ── Layouts ──────────────────────────────────────────────────────────────────
import PublicLayout    from '@components/layout/PublicLayout';
import DashboardLayout from '@components/layout/DashboardLayout';
import AuthLayout      from '@components/layout/AuthLayout';

// ── Auth Pages ───────────────────────────────────────────────────────────────
import Login          from '@pages/auth/Login';
import Register       from '@pages/auth/Register';
import ForgotPassword from '@pages/auth/ForgotPassword';

// ── Lazy Page Imports ─────────────────────────────────────────────────────────

// Public Website Pages
const Home           = lazy(() => import('@pages/website/Home'));
const Properties     = lazy(() => import('@pages/website/Properties'));
const ProjectsList   = lazy(() => import('@pages/website/ProjectsList'));
const ProjectDetail  = lazy(() => import('@pages/website/ProjectDetail'));
const About          = lazy(() => import('@pages/website/About'));
const Services       = lazy(() => import('@pages/website/Services'));
const Contact        = lazy(() => import('@pages/website/Contact'));
const Blog           = lazy(() => import('@pages/website/Blog'));
const BlogDetail     = lazy(() => import('@pages/website/BlogDetail'));
const Gallery        = lazy(() => import('@pages/website/Gallery'));
const Career         = lazy(() => import('@pages/website/Career'));
const Franchise      = lazy(() => import('@pages/website/Franchise'));
const Calculator     = lazy(() => import('@pages/website/Calculator'));
const BookSiteVisit  = lazy(() => import('@pages/website/BookSiteVisit'));
const Compare        = lazy(() => import('@pages/website/Compare'));
const Wishlist       = lazy(() => import('@pages/website/Wishlist'));
const PrivacyPolicy  = lazy(() => import('@pages/website/PrivacyPolicy'));
const TermsOfUse     = lazy(() => import('@pages/website/TermsOfUse'));
const RERACompliance = lazy(() => import('@pages/website/RERACompliance'));
const Sitemap        = lazy(() => import('@pages/website/Sitemap'));
const NotFound       = lazy(() => import('@pages/website/NotFound'));

// Auth Pages
const ResetPassword  = lazy(() => import('@pages/auth/ResetPassword'));

// Admin Pages
const AdminDashboard    = lazy(() => import('@pages/admin/Dashboard'));
const AdminLeads        = lazy(() => import('@pages/admin/Leads'));
const AdminCustomers    = lazy(() => import('@pages/admin/Customers'));
const AdminProjects     = lazy(() => import('@pages/admin/Projects'));
const AdminProjectDetail = lazy(() => import('@pages/admin/ProjectDetail'));
const AdminPlots        = lazy(() => import('@pages/admin/Plots'));
const AdminBookings     = lazy(() => import('@pages/admin/Bookings'));
const AdminPayments     = lazy(() => import('@pages/admin/Payments'));
const AdminAssociates   = lazy(() => import('@pages/admin/Associates'));
const AdminUsers        = lazy(() => import('@pages/admin/Users'));
const AdminReports      = lazy(() => import('@pages/admin/Reports'));
const AdminSettings     = lazy(() => import('@pages/admin/Settings'));
const AdminInventory    = lazy(() => import('@pages/admin/Inventory'));
const AdminAgreements   = lazy(() => import('@pages/admin/Agreements'));
const AdminCommissions  = lazy(() => import('@pages/admin/Commissions'));
const AdminBlog         = lazy(() => import('@pages/admin/Blog'));
const AdminGallery      = lazy(() => import('@pages/admin/Gallery'));
const AdminSupport      = lazy(() => import('@pages/admin/Support'));
const AdminNotifications = lazy(() => import('@pages/admin/Notifications'));
const AdminAuditLogs    = lazy(() => import('@pages/admin/AuditLogs'));
const AdminFollowUps    = lazy(() => import('@pages/admin/FollowUps'));
const AdminSiteVisits   = lazy(() => import('@pages/admin/SiteVisits'));
const AdminQuotations   = lazy(() => import('@pages/admin/Quotations'));
const AdminEnquiries    = lazy(() => import('@pages/admin/Enquiries'));
const AdminAnalytics    = lazy(() => import('@pages/admin/Analytics'));
const AdminProfile      = lazy(() => import('@pages/admin/Profile'));

// Associate Pages
const AssociateDashboard   = lazy(() => import('@pages/associate/Dashboard'));
const AssociateLeads       = lazy(() => import('@pages/associate/Leads'));
const AssociateCustomers   = lazy(() => import('@pages/associate/Customers'));
const AssociatePlots       = lazy(() => import('@pages/associate/Plots'));
const AssociateBookings    = lazy(() => import('@pages/associate/Bookings'));
const AssociateCommissions = lazy(() => import('@pages/associate/Commissions'));
const AssociateFollowUps   = lazy(() => import('@pages/associate/FollowUps'));
const AssociateSiteVisits  = lazy(() => import('@pages/associate/SiteVisits'));
const AssociateSubAssociates = lazy(() => import('@pages/associate/SubAssociates'));
const AssociateProfile     = lazy(() => import('@pages/associate/Profile'));
const AssociateNotifications = lazy(() => import('@pages/associate/Notifications'));

// Customer Pages
const CustomerDashboard     = lazy(() => import('@pages/customer/Dashboard'));
const CustomerProperties    = lazy(() => import('@pages/customer/Properties'));
const CustomerPayments      = lazy(() => import('@pages/customer/Payments'));
const CustomerDocuments     = lazy(() => import('@pages/customer/Documents'));
const CustomerSupport       = lazy(() => import('@pages/customer/Support'));
const CustomerProfile       = lazy(() => import('@pages/customer/Profile'));
const CustomerNotifications = lazy(() => import('@pages/customer/Notifications'));



// ── Route Guards ──────────────────────────────────────────────────────────────

/** Redirect authenticated users away from auth pages */
const GuestGuard = ({ children }) => {
  const isAuth = useSelector(selectIsAuth);
  const role   = useSelector(selectUserRole);
  if (isAuth) {
    const redirect = role === 'CUSTOMER' ? '/customer/dashboard'
      : role?.includes('ASSOCIATE') ? '/associate/dashboard' : '/admin/dashboard';
    return <Navigate to={redirect} replace />;
  }
  return children;
};

/** Require authentication */
const AuthGuard = ({ children }) => {
  const isAuth      = useSelector(selectIsAuth);
  const initialized = useSelector(selectInitialized);
  if (!initialized) return <PageLoader />;
  if (!isAuth) return <Navigate to="/auth/login" replace />;
  return children;
};

/** Require specific roles */
const RoleGuard = ({ children, roles }) => {
  const isAuth = useSelector(selectIsAuth);
  const role   = useSelector(selectUserRole);
  if (!isAuth) return <Navigate to="/auth/login" replace />;
  if (!roles.includes(role)) return <Navigate to="/" replace />;
  return children;
};

// ── Scroll To Top Utility ─────────────────────────────────────────────────────
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ── App Initializer ───────────────────────────────────────────────────────────
const AppInitializer = ({ children }) => {
  const { getMe }   = useAuth();
  const accessToken = useSelector((s) => s.auth.accessToken);
  const initialized = useSelector(selectInitialized);

  useEffect(() => {
    if (accessToken && !initialized) {
      getMe();
    }
  }, [accessToken]);

  return children;
};

// ── App Router ────────────────────────────────────────────────────────────────
const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <AppInitializer>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ── Public Website ──────────────────────────────────────────── */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="properties"           element={<Properties />} />
            <Route path="projects"             element={<ProjectsList />} />
            <Route path="projects/:type"       element={<ProjectsList />} />
            <Route path="projects/:type/:slug" element={<ProjectDetail />} />
            <Route path="about"                element={<About />} />
            <Route path="services"             element={<Services />} />
            <Route path="contact"              element={<Contact />} />
            <Route path="blog"                 element={<Blog />} />
            <Route path="blog/:slug"           element={<BlogDetail />} />
            <Route path="gallery"              element={<Gallery />} />
            <Route path="career"               element={<Career />} />
            <Route path="franchise"            element={<Franchise />} />
            <Route path="calculator"           element={<Calculator />} />
            <Route path="book-site-visit"      element={<BookSiteVisit />} />
            <Route path="compare"              element={<Compare />} />
            <Route path="wishlist"             element={<Wishlist />} />
            <Route path="privacy-policy"       element={<PrivacyPolicy />} />
            <Route path="terms-of-use"         element={<TermsOfUse />} />
            <Route path="rera-compliance"      element={<RERACompliance />} />
            <Route path="sitemap"              element={<Sitemap />} />
            <Route path="*"                    element={<NotFound />} />
          </Route>

          {/* ── Auth ────────────────────────────────────────────────────── */}
          <Route path="auth" element={<GuestGuard><AuthLayout /></GuestGuard>}>
            <Route path="login"           element={<Login />} />
            <Route path="register"        element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password"  element={<ResetPassword />} />
          </Route>

          {/* ── Admin ───────────────────────────────────────────────────── */}
          <Route path="admin" element={
            <RoleGuard roles={['SUPER_ADMIN', 'ADMIN', 'MANAGER']}>
              <DashboardLayout />
            </RoleGuard>
          }>
            <Route index                 element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard"      element={<AdminDashboard />} />
            <Route path="analytics"      element={<AdminAnalytics />} />
            <Route path="leads"          element={<AdminLeads />} />
            <Route path="customers"      element={<AdminCustomers />} />
            <Route path="follow-ups"     element={<AdminFollowUps />} />
            <Route path="site-visits"    element={<AdminSiteVisits />} />
            <Route path="quotations"     element={<AdminQuotations />} />
            <Route path="projects"       element={<AdminProjects />} />
            <Route path="projects/:id"   element={<AdminProjectDetail />} />
            <Route path="plots"          element={<AdminPlots />} />
            <Route path="inventory"      element={<AdminInventory />} />
            <Route path="bookings"       element={<AdminBookings />} />
            <Route path="payments"       element={<AdminPayments />} />
            <Route path="agreements"     element={<AdminAgreements />} />
            <Route path="commissions"    element={<AdminCommissions />} />
            <Route path="associates"     element={<AdminAssociates />} />
            <Route path="users"          element={<AdminUsers />} />
            <Route path="blog"           element={<AdminBlog />} />
            <Route path="gallery"        element={<AdminGallery />} />
            <Route path="reports"        element={<AdminReports />} />
            <Route path="audit-logs"     element={<AdminAuditLogs />} />
            <Route path="support"        element={<AdminSupport />} />
            <Route path="enquiries"      element={<AdminEnquiries />} />
            <Route path="notifications"  element={<AdminNotifications />} />
            <Route path="settings"       element={<AdminSettings />} />
            <Route path="profile"        element={<AdminProfile />} />
          </Route>

          {/* ── Associate ───────────────────────────────────────────────── */}
          <Route path="associate" element={
            <RoleGuard roles={['ASSOCIATE', 'SUB_ASSOCIATE']}>
              <DashboardLayout />
            </RoleGuard>
          }>
            <Route index                  element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard"       element={<AssociateDashboard />} />
            <Route path="leads"           element={<AssociateLeads />} />
            <Route path="customers"       element={<AssociateCustomers />} />
            <Route path="plots"           element={<AssociatePlots />} />
            <Route path="bookings"        element={<AssociateBookings />} />
            <Route path="commissions"     element={<AssociateCommissions />} />
            <Route path="follow-ups"      element={<AssociateFollowUps />} />
            <Route path="site-visits"     element={<AssociateSiteVisits />} />
            <Route path="sub-associates"  element={<AssociateSubAssociates />} />
            <Route path="notifications"   element={<AssociateNotifications />} />
            <Route path="profile"         element={<AssociateProfile />} />
          </Route>

          {/* ── Customer ────────────────────────────────────────────────── */}
          <Route path="customer" element={
            <RoleGuard roles={['CUSTOMER']}>
              <DashboardLayout />
            </RoleGuard>
          }>
            <Route index                  element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard"       element={<CustomerDashboard />} />
            <Route path="properties"      element={<CustomerProperties />} />
            <Route path="payments"        element={<CustomerPayments />} />
            <Route path="documents"       element={<CustomerDocuments />} />
            <Route path="support"         element={<CustomerSupport />} />
            <Route path="notifications"   element={<CustomerNotifications />} />
            <Route path="profile"         element={<CustomerProfile />} />
          </Route>

          {/* ── 404 ─────────────────────────────────────────────────────── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppInitializer>
  </BrowserRouter>
);

export default App;
