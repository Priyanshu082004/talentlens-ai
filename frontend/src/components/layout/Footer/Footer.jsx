import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { ROUTES } from '@constants/routes.js';




//   below is called as configuration object for the footer links, which makes it easier to add/remove links in the future
const LINKS = {
  Product: [{ label: 'Features', href: '#features' }, { label: 'How it works', href: '#how-it-works' }, { label: 'Pricing', href: '#' }],
  Company: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Careers', href: '#' }],
  Legal:   [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">ResumeAI</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              AI-powered resume analysis that helps you land the job. Powered by Google Gemini Flash 2.5.
            </p>
          </div>

          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">{group}</h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-gray-500 hover:text-gray-200 transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} TalentLens-AI</p>
          <p className="text-xs text-gray-600">Built with Google Gemini Flash 2.5</p>
        </div>
      </div>
    </footer>
  );
}