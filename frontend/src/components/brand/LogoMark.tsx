import { ANVIL_PATHS, ANVIL_VIEWBOX } from './anvil';

type LogoMarkProps = {
  size?: number;
  className?: string;
  title?: string;
};

export function LogoMark({ size = 28, className, title = 'ShortForge' }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={ANVIL_VIEWBOX}
      role="img"
      aria-label={title}
      fill="currentColor"
      className={className}
    >
      {ANVIL_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
