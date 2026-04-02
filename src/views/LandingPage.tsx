import { Navbar } from '../components/Navbar';
import { Hero } from './Landing/Hero';
import { Features } from './Landing/Features';
import { Pricing } from './Landing/Pricing';
import { Testimonials } from './Landing/Testimonials';
import { CTA } from './Landing/CTA';
import { Footer } from '../components/Footer';

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <main className="flex-1">
                <Hero />
                <Features />
                <Pricing />
                <Testimonials />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
