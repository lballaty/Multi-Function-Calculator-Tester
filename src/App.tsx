import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import ConversionsPage from './pages/ConversionsPage';
import GeometryPage from './pages/GeometryPage';
import AlgebraPage from './pages/AlgebraPage';
import GraphingPage from './pages/GraphingPage';
import IPCalculatorPage from './pages/IPCalculatorPage';
import ApiTesterPage from './pages/ApiTesterPage';
import DocumentationPage from './pages/DocumentationPage';
import { SettingsProvider } from './context/SettingsContext';
import { ThemeProvider } from './components/ThemeProvider';
import { TabVisibilityProvider } from './context/TabVisibilityContext';

export default function App() {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <TabVisibilityProvider>
          <BrowserRouter>
            <Toaster />
            <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/calculator" element={<CalculatorPage />} />
                  <Route path="/conversions" element={<ConversionsPage />} />
                  <Route path="/geometry" element={<GeometryPage />} />
                  <Route path="/algebra" element={<AlgebraPage />} />
                  <Route path="/graphing" element={<GraphingPage />} />
                  <Route path="/ip-calculator" element={<IPCalculatorPage />} />
                  <Route path="/api-tester" element={<ApiTesterPage />} />
                  <Route path="/documentation" element={<DocumentationPage />} />
                </Routes>
              </Layout>
            </div>
          </BrowserRouter>
        </TabVisibilityProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}