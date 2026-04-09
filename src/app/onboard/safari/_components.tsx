// Shared bits for the Safari setup pages.
// Files prefixed with `_` are not routed by Next.js App Router.

export function StepDot({
  children,
  active = false,
  done = false,
}: {
  children: React.ReactNode;
  active?: boolean;
  done?: boolean;
}) {
  let cls = "border-[var(--card-border)] text-[var(--muted)]";
  if (done)
    cls = "bg-[var(--accent)] border-[var(--accent)] text-white";
  else if (active)
    cls = "border-[var(--accent)] text-[var(--accent)] dragon-glow";
  return (
    <div
      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold ${cls}`}
    >
      {children}
    </div>
  );
}

export function StepLine({ done = false }: { done?: boolean }) {
  return (
    <div
      className={`w-12 h-0.5 ${
        done ? "bg-[var(--accent)]" : "bg-[var(--card-border)]"
      }`}
    />
  );
}

export function Instruction({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40 flex items-center justify-center text-sm font-bold text-[var(--accent)]">
        {number}
      </div>
      <div className="flex-1 text-[var(--muted)] leading-relaxed pt-1">
        {children}
      </div>
    </li>
  );
}

export function WaitingForApp({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-6 text-sm text-[var(--muted)]">
      <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
      {message}
    </div>
  );
}

export function WhyItMatters({
  emoji,
  title,
  body,
}: {
  emoji: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 mb-8">
      <div className="flex items-start gap-3">
        <div className="text-2xl">{emoji}</div>
        <div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  );
}

export function StepIndicator({ current }: { current: 1 | 2 | 3 | 4 }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <StepDot active={current === 1} done={current > 1}>
        {current > 1 ? "✓" : "1"}
      </StepDot>
      <StepLine done={current > 1} />
      <StepDot active={current === 2} done={current > 2}>
        {current > 2 ? "✓" : "2"}
      </StepDot>
      <StepLine done={current > 2} />
      <StepDot active={current === 3} done={current > 3}>
        {current > 3 ? "✓" : "3"}
      </StepDot>
    </div>
  );
}
