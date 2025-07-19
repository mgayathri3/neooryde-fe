// Function to generate a consistent color based on a string
const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Define a set of pleasant, professional colors
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-rose-500',
    'bg-emerald-500',
  ];

  // Use the hash to select a color
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

// Function to get initials from a name
const getInitials = (name: string): string => {
  return name[0].toUpperCase();
};

export { getInitials, stringToColor };
