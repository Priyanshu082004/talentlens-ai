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
        <label className="text-sm font-medium text-gray-300">
          {label}{required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
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
            'w-full bg-bg-surface rounded-xl px-4 py-3 text-sm text-white',
            'border transition-all duration-200 outline-none',
            'placeholder:text-gray-600',
            Icon && 'pl-10',
            RightIcon && 'pr-10',
            error
              ? 'border-red-500/60 focus:border-red-500'
              : focused
              ? 'border-primary-500 shadow-[0_0_0_3px_rgba(99,102,241,0.15)]'
              : 'border-white/10 hover:border-white/20',
          )}
          {...props}
        />

        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
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
