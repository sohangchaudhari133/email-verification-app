// Main App component that sets up routing and navigation
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import Navbar from './components/Common/Navbar.jsx';

const App = () => {
    return (
        <Router>
            {/* Navigation bar displayed on all pages */}
            <Navbar />
            {/* Application routes */}
            <AppRoutes />
        </Router>
    );
};

export default App;