import React from 'react';

const baseButtonStyle = {
  color: 'var(--dash-text-2)',
  background: 'var(--dash-card)',
  borderColor: 'var(--dash-border)',
  boxShadow: 'var(--dash-card-shadow)',
};

const activeButtonStyle = {
  color: 'var(--dash-accent)',
  background: 'color-mix(in oklch, var(--dash-accent-muted) 58%, white)',
  borderColor: 'color-mix(in oklch, var(--dash-accent) 24%, var(--dash-border))',
};

export default function DashboardActionButton({
  as: Component = 'button',
  active = false,
  className = '',
  style,
  children,
  ...props
}) {
  const componentProps = Component === 'button' ? { type: 'button' } : {};

  return (
    <Component
      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${className}`.trim()}
      style={{
        ...baseButtonStyle,
        ...(active ? activeButtonStyle : {}),
        ...style,
      }}
      {...componentProps}
      {...props}
    >
      {children}
    </Component>
  );
}