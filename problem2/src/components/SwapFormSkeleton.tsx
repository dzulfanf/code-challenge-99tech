/**
 * Renders a loading skeleton that represents the swap form
 * while currency price data is being fetched.
 *
 * @returns A swap form loading skeleton.
 */
export function SwapFormSkeleton() {
  return (
    <main className="swap-page">
      <section className="swap-card">
        <header className="swap-header">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-subtitle" />
        </header>

        <div className="skeleton-field">
          <div className="skeleton skeleton-label" />

          <div className="skeleton skeleton-input" />
        </div>

        <div className="skeleton-direction">
          <div className="skeleton skeleton-icon" />
        </div>

        <div className="skeleton-field">
          <div className="skeleton skeleton-label" />

          <div className="skeleton skeleton-input" />
        </div>

        <div className="skeleton skeleton-rate" />

        <div className="skeleton skeleton-submit" />
      </section>
    </main>
  );
}