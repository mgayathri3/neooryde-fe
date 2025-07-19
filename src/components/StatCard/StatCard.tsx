import React from 'react';
import { StatCardProps } from './statcard.interface';

const StatCard = ({
  number,
  text,
  fromColor = 'from-blue-500',
  toColor = 'to-indigo-600',
  numberColor = 'text-white',
  textColor = 'text-white/90',
  className = '',
}: StatCardProps) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-xl p-6
        bg-gradient-to-r ${fromColor} ${toColor}
        shadow-lg hover:shadow-xl transition-shadow
        ${className}
      `}
    >
      <div className="relative z-10">
        <span className={`block text-4xl font-bold mb-1 ${numberColor}`}>
          {number.toLocaleString()}
        </span>
        <span className={`block text-sm font-medium ${textColor}`}>{text}</span>
      </div>
    </div>
  );
};

export default StatCard;
