export interface HashtagProps {
  children: string;
  size?: 'sm' | 'lg';
  defaultColor?: string;
  hoverColor?: string;
  activeColor?: string;
  borderColor?: string;
  onClick?: () => void;
}

export function Hashtag({
  children,
  size = 'sm',
  borderColor,
  activeColor,
  defaultColor,
  hoverColor,
  onClick,
}: HashtagProps) {
  console.log('TCL: activeColor', activeColor);
  const sizeMap: { [key: string]: string } = {
    sm: 'py-1 px-3 text-sm',
    lg: 'py-2 px-5 text-2xl',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${borderColor && `border-1 ${borderColor}`} ${
        sizeMap[size]
      } rounded-3xl hover:${hoverColor} ${defaultColor} ${activeColor && activeColor}`}
    >
      <div className="leading-tight"># {children}</div>
    </button>
  );
}
