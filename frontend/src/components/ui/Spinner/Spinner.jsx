export default function Spinner({ size = 20, className = '', color = 'currentColor' }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      style={{ width: size, height: size }}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke={color} strokeWidth="4" />
      <path className="opacity-80" fill={color} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}


// This code defines a reusable Spinner component in React that renders a spinning SVG loader. The component 
// accepts three props: size (defaulting to 20), className (defaulting to an empty string), and color (defaulting to 'currentColor').
//  The spinner consists of a circular path and a filled path, creating a visual spinning effect.
//  The size and color of the spinner can be customized through the props.