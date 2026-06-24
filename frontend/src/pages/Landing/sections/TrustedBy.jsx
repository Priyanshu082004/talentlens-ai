const COMPANIES = [
  'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple',
  'Netflix', 'Stripe', 'Notion', 'Figma', 'Linear',
  'Vercel', 'GitHub', 'Atlassian', 'Salesforce', 'Adobe',
];

export default function TrustedBy() {
  return (
    <section className="py-16 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-xs font-medium text-gray-600 uppercase tracking-widest">
          Trusted by candidates applying to
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #050816, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #050816, transparent)' }} />

        <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...COMPANIES, ...COMPANIES].map((name, i) => (
            <div key={i} className="mx-10 flex items-center gap-2 text-gray-600 hover:text-gray-400 transition-colors">
              <div className="w-2 h-2 rounded-full bg-primary-500/40" />
              <span className="text-sm font-semibold tracking-wide">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
