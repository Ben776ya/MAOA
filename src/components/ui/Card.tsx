// src/components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ children, onClick, className = '', hoverable = true }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-bg-base border border-line p-6 transition-all duration-300
        ${hoverable ? 'cursor-pointer hover:border-gold/50 hover:bg-bg-elevated' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
