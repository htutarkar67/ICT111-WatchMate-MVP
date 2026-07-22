import type { ReactNode } from 'react';

type SectionBlockProps = {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
};

export default function SectionBlock({
  title,
  actions,
  children,
}: SectionBlockProps) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        {actions}
      </div>
      {children}
    </section>
  );
}
