import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import DiaryListPage from "./pages/DiaryListPage";
import WriteDiaryPage from "./pages/WriteDiaryPage";
import DiaryDetailPage from "./pages/DiaryDetailPage";
import StatsPage from "./pages/StatsPage";
import UserCenterPage from "./pages/UserCenterPage";
import CategoryPage from "./pages/CategoryPage";
import SearchResultPage from "./pages/SearchResultPage";
import AchievementPage from "./pages/AchievementPage";
import ServiceIntroPage from "./pages/ServiceIntroPage";
import ReviewsPage from "./pages/ReviewsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import VoiceGuidePage from "./pages/VoiceGuidePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/diary" element={<DiaryListPage />} />
            <Route path="/diary/new" element={<WriteDiaryPage />} />
            <Route path="/diary/:id" element={<DiaryDetailPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/user" element={<UserCenterPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/search" element={<SearchResultPage />} />
            <Route path="/achievements" element={<AchievementPage />} />
            <Route path="/service" element={<ServiceIntroPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/voice-guide" element={<VoiceGuidePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
    </HashRouter>
  );
}
