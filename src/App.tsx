import { Route, Switch } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/trpc';

import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ui/error-boundary';
import { DashboardLayout } from './components/DashboardLayout';
import LandingPage from './views/LandingPage';
import AffiliationForm from './views/AffiliationForm';
import AdminDashboard from './pages/AdminDashboard';
import DemandDetails from './pages/DemandDetails';
import Contact from './pages/Contact';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LoginHelpPage from './pages/LoginHelpPage';

// Dummy component for not found
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-500 mt-2">Page non trouvée</p>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login-help" component={LoginHelpPage} />
      <Route path="/dashboard">
        <DashboardLayout>
          <Home />
        </DashboardLayout>
      </Route>
      {/* Auth routes could go here */}
      <Route path="/affiliations">
        <DashboardLayout>
          <div>Affiliations Page (Draft)</div>
        </DashboardLayout>
      </Route>
      <Route path="/demandes/:id">
        <DashboardLayout>
          <DemandDetails />
        </DashboardLayout>
      </Route>
      <Route path="/contact" component={Contact} />
      <Route path="/admin/dashboard">
        <DashboardLayout>
          <AdminDashboard />
        </DashboardLayout>
      </Route>
      <Route path="/affiliations/new" component={AffiliationForm} />
      {/* Fallback */}
      <Route>
        <DashboardLayout>
          <NotFound />
        </DashboardLayout>
      </Route>
    </Switch>
  );
}

export default function App() {
  // For now, we skip tRPC provider until backend is ready
  // const [trpcClient] = useState(() =>
  //   trpc.createClient({
  //     links: [
  //       httpBatchLink({
  //         url: '/api/trpc',
  //       }),
  //     ],
  //   })
  // );

  return (
    // <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        onError={(error, errorInfo) => {
          console.error('Application error:', error, errorInfo);
          // Ici vous pourriez envoyer l'erreur à un service de monitoring
        }}
      >
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
    // </trpc.Provider>
  );
}
