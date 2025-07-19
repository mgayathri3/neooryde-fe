export interface Theme {
  name: string;
  primary: {
    background: string;
    hover?: string;
    text?: string;
    border?: string;
  };
  secondary?: {
    background?: string;
    hover?: string;
    text?: string;
  };
  extend?: {
    backgroundSize?: {
      'size-200': string;
    };
    backgroundPosition?: {
      [k: string]: string;
    };
  };
}

export const themes: Record<string, Theme> = {
  admin: {
    name: 'Admin',
    primary: {
      background: 'bg-[#00A980]',
      text: 'text-white',
      hover: 'hover:bg-[#007C61]',
      border: 'border-[#00A980]',
    },
    secondary: {
      background: 'bg-gray-100',
      hover: 'hover:bg-gray-200',
      text: 'text-gray-800',
    },
    extend: {
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-90': '90%',
        'pos-100': '100% 100%',
      },
    },
  },
  corporate: {
    name: 'Corporate',
    primary: {
      background: 'bg-blue-800',
      hover: 'hover:bg-blue-700',
      text: 'text-white',
      border: 'border-blue-700',
    },
    secondary: {
      background: 'bg-blue-50',
      hover: 'hover:bg-blue-100',
      text: 'text-blue-800',
    },
  },
  operator: {
    name: 'Operator',
    primary: {
      background: 'bg-green-800',
      hover: 'hover:bg-green-700',
      text: 'text-white',
      border: 'border-green-700',
    },
    secondary: {
      background: 'bg-green-50',
      hover: 'hover:bg-green-100',
      text: 'text-green-800',
    },
  },
};
