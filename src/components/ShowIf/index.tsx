import React from 'react';

interface ShowIfProps {
  cond: boolean;
  children: React.ReactNode;
}

export const ShowIf: React.FC<ShowIfProps> = ({ cond, children }) => {
  return <>{cond ? children : null}</>;
};
