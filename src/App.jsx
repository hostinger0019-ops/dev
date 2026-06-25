import { Routes, Route, useLocation } from 'react-router-dom';
import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/CustomCursor';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import LandingPage from './pages/LandingPage';
import EcommercePage from './projects/ecommerce/EcommercePage';
import RealEstatePage from './projects/realestate/RealEstatePage';
import RestaurantPage from './projects/restaurant/RestaurantPage';
import SalonPage from './projects/salon/SalonPage';
import DentalPage from './projects/dental/DentalPage';
import WeddingPage from './projects/wedding/WeddingPage';
import GymPage from './projects/gym/GymPage';
import LawFirmPage from './projects/lawfirm/LawFirmPage';
import EducationPage from './projects/education/EducationPage';
import TravelPage from './projects/travel/TravelPage';
import PhotographyPage from './projects/photography/PhotographyPage';
import InteriorDesignPage from './projects/interiordesign/InteriorDesignPage';
import HotelPage from './projects/hotel/HotelPage';
import CarDealerPage from './projects/cardealership/CarDealerPage';
import BakeryPage from './projects/bakery/BakeryPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import PaymentSuccess from './components/PaymentSuccess';

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isDemoPage = ['/restaurant', '/realestate', '/ecommerce', '/salon', '/dental', '/wedding', '/gym', '/lawfirm', '/education', '/travel', '/photography', '/interiordesign', '/hotel', '/cardealership', '/bakery', '/privacy-policy', '/terms-and-conditions', '/payment-success'].includes(location.pathname);

  return (
    <CursorProvider>
      <CustomCursor />
      {!isDemoPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage introComplete={true} />} />
        <Route path="/ecommerce" element={<EcommercePage />} />
        <Route path="/realestate" element={<RealEstatePage />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/salon" element={<SalonPage />} />
        <Route path="/dental" element={<DentalPage />} />
        <Route path="/wedding" element={<WeddingPage />} />
        <Route path="/gym" element={<GymPage />} />
        <Route path="/lawfirm" element={<LawFirmPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/travel" element={<TravelPage />} />
        <Route path="/photography" element={<PhotographyPage />} />
        <Route path="/interiordesign" element={<InteriorDesignPage />} />
        <Route path="/hotel" element={<HotelPage />} />
        <Route path="/cardealership" element={<CarDealerPage />} />
        <Route path="/bakery" element={<BakeryPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
      {!isDemoPage && <Footer />}
      {!isDemoPage && <ChatBot />}
    </CursorProvider>
  );
}
