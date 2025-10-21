
import { Link, LinkProps } from "react-router-dom";
import React from "react";

interface NavigationLinkProps extends LinkProps {
  children: React.ReactNode;
  activeClassName?: string;
}

/**
 * NavigationLink component that wraps React Router's Link component
 * and adds state to track navigation source
 */
export const NavigationLink = ({
  children,
  className,
  to,
  activeClassName,
  ...props
}: NavigationLinkProps) => {
  // Add navigation state to show we're navigating programmatically
  const state = { navigated: true };
  
  return (
    <Link
      to={to}
      className={className}
      state={state}
      {...props}
    >
      {children}
    </Link>
  );
};
