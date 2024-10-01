import React, { forwardRef } from 'react';
import { WidgetProps } from '../consts';

const BaseWidget = forwardRef<HTMLDivElement, WidgetProps>(({ 
  className = '', 
  onClick,
  children,
  style,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      style={{ background: "#ccc", ...style }}
      className={`widget ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
});

export default BaseWidget;