import { useCallback, useEffect, useRef, useState, type TransitionEvent } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { AcquisitionPage } from './pages/Acquisition'
import { BudgetPage } from './pages/Budget'
import { EntitiesPage } from './pages/Entities'
import { GrowthPage } from './pages/Growth'
import { HomePage } from './pages/Home'
import { MetricsPage } from './pages/Metrics'
import { PricingPage } from './pages/Pricing'
import { SearchPage } from './pages/Search'
import { StrategyPage } from './pages/Strategy'
import { SystemTreePage } from './pages/SystemTree'

const LANDING_DISMISSED_KEY = 'corethink-strategy-os-landing-dismissed'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/strategy', label: 'Strategy' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/acquisition', label: 'Acquisition' },
  { to: '/growth', label: 'Growth' },
  { to: '/metrics', label: 'Metrics' },
  { to: '/budget', label: 'Budget' },
  { to: '/entities', label: 'Entities' },
  { to: '/system-tree', label: 'System Tree' },
  { to: '/search', label: 'Search' },
]

type LandingPhase = 'intro' | 'exit' | 'done'

function readLandingDismissed(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(LANDING_DISMISSED_KEY) === '1'
  } catch {
    return false
  }
}

function App() {
  const [landingPhase, setLandingPhase] = useState<LandingPhase>(() =>
    readLandingDismissed() ? 'done' : 'intro',
  )
  const focusMainAfterDismiss = useRef(false)

  useEffect(() => {
    if (landingPhase !== 'done' || !focusMainAfterDismiss.current) return
    focusMainAfterDismiss.current = false
    document.getElementById('main-dashboard')?.focus({ preventScroll: true })
  }, [landingPhase])

  useEffect(() => {
    if (landingPhase === 'intro' || landingPhase === 'exit') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [landingPhase])

  const dismissLanding = useCallback(() => {
    try {
      window.localStorage.setItem(LANDING_DISMISSED_KEY, '1')
    } catch {
      /* ignore quota / private mode */
    }
    focusMainAfterDismiss.current = true
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setLandingPhase('done')
      return
    }
    setLandingPhase('exit')
  }, [])

  const onLandingTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLElement>) => {
      if (event.target !== event.currentTarget) return
      if (landingPhase !== 'exit') return
      if (event.propertyName !== 'opacity') return
      setLandingPhase('done')
    },
    [landingPhase],
  )

  const replayLanding = useCallback(() => {
    try {
      window.localStorage.removeItem(LANDING_DISMISSED_KEY)
    } catch {
      /* ignore */
    }
    setLandingPhase('intro')
  }, [])

  const layoutSurfaceClass =
    landingPhase === 'done' || landingPhase === 'exit' ? 'layout layout--revealed' : 'layout layout--pre'

  return (
    <>
      <a
        href="#main-dashboard"
        className="skip-link"
        onClick={(event) => {
          if (landingPhase === 'intro') {
            event.preventDefault()
            dismissLanding()
          }
        }}
      >
        Skip to plan
      </a>
      {landingPhase !== 'done' ? (
        <section
          className={`landing ${landingPhase === 'exit' ? 'landing--exit' : ''}`}
          onTransitionEnd={onLandingTransitionEnd}
          aria-modal="true"
          role="dialog"
          aria-labelledby="landing-heading"
        >
          <div className={`landing-content ${landingPhase === 'intro' ? 'landing-content--in' : ''}`}>
            <img
              src="/corethink-Bh1OL6oM.svg"
              alt="CoreThink"
              className="landing-logo"
              width={320}
              height={184}
            />
            <p id="landing-heading" className="landing-title">
              12-month sales and growth plan
            </p>
            <p className="landing-subtitle">
              Pricing, customer channels, quarterly targets, budget, and metrics.
            </p>
            <button type="button" className="landing-btn" onClick={dismissLanding}>
              View Plan
            </button>
          </div>
        </section>
      ) : null}

      <div className={layoutSurfaceClass}>
        <header className="header">
          <div className="brand-row">
            <img
              src="/corethink-Bh1OL6oM.svg"
              alt=""
              className="header-logo"
              width={190}
              height={110}
            />
            <div>
              <p className="eyebrow">CoreThink / OpenClaw</p>
              <h1 className="title">12-month sales and growth plan</h1>
            </div>
          </div>
          <p className="muted">
            Pricing, customer acquisition, and quarter-by-quarter growth targets.
          </p>
          {landingPhase === 'done' ? (
            <div className="header-actions">
              <button type="button" className="ghost-link" onClick={replayLanding}>
                Show welcome screen
              </button>
            </div>
          ) : null}
        </header>

        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'tab active' : 'tab')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main id="main-dashboard" className="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/strategy" element={<StrategyPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/acquisition" element={<AcquisitionPage />} />
            <Route path="/growth" element={<GrowthPage />} />
            <Route path="/metrics" element={<MetricsPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/entities" element={<EntitiesPage />} />
            <Route path="/system-tree" element={<SystemTreePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
