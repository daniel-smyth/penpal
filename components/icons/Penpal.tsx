import Link from "next/link";
import cn from "classnames";

interface PenpalProps {
  className?: string;
}

const Penpal: React.FC<PenpalProps> = ({ className }) => {
  return (
    <Link
      href="/"
      className={cn("flex items-center font-display text-2xl", className)}
    >
      <p>Penpal</p>
    </Link>
  );
};

export default Penpal;
