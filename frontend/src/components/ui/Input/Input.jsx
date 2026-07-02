import { useState } from 'react';
import clsx from 'clsx';

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  className = '',
  required = false,
  ...props
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={clsx('flex flex-col gap-1.5', className)}>
      {label && (
        <label className="text-sm font-medium text-slate-600">
          {label}{required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={16} />
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className={clsx(
            'w-full bg-white rounded-xl px-4 py-3 text-sm text-slate-900',
            'border transition-all duration-200 outline-none shadow-sm',
            'placeholder:text-slate-400',
            Icon && 'pl-10',
            RightIcon && 'pr-10',
            error
              ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
              : focused
              ? 'border-primary-500 shadow-[0_0_0_3px_rgba(99,102,241,0.12)]'
              : 'border-slate-200 hover:border-slate-300',
          )}
          {...props}
        />

        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <RightIcon size={16} />
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}


// This code defines a reusable Input component in React that supports various features such as labels, icons, error messages, 
// and focus states. It uses the clsx library for conditional class names and manages focus state with the useState hook. 
// The component is designed to be flexible and customizable, allowing for different input types, placeholders, and additional props.