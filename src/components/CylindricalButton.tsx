interface CylindricalButtonProps {
  expanded: boolean; // current state
  onClick: () => void; // toggle action
  labelExpanded?: string; // text when expanded
  labelCollapsed?: string; // text when collapsed
  className?: string; // Tailwind classes for styling
}

export function CylindricalButton({
  expanded,
  onClick,
  labelExpanded = 'Show Less ▲',
  labelCollapsed = 'Read More ▼',
  className = 'text-blue-500 border-blue-500 hover:bg-blue-100 cursor-pointer',
}: CylindricalButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full border transition-colors duration-300 cursor-pointer ${className}`}>
      {expanded || false ? labelExpanded : labelCollapsed}
    </button>
  );
}
