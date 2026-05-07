"use client";
export function PageHead({
  title, sub, actions, mobileBack,
}: {
  title: string;
  sub?: string;
  actions?: React.ReactNode;
  mobileBack?: React.ReactNode;
}) {
  return (
    <header className="bg-white border-b border-line lg:bg-transparent lg:border-0 lg:mb-6">
      <div className="px-4 pt-4 pb-3 lg:px-0 lg:pt-0 lg:pb-0 flex items-center gap-3 lg:items-end lg:justify-between">
        {mobileBack && <div className="lg:hidden">{mobileBack}</div>}
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-[18px] lg:text-[28px] font-semibold tracking-tight text-navy-900 leading-tight">{title}</h1>
          {sub && <p className="text-[12px] lg:text-[13px] text-muted mt-0.5 lg:mt-1">{sub}</p>}
        </div>
        {actions && <div className="hidden lg:flex items-center gap-2">{actions}</div>}
      </div>
      {actions && <div className="lg:hidden px-4 pb-3 flex items-center gap-2">{actions}</div>}
    </header>
  );
}
