'use client';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>SmartChef Pro | AI Recipe App</title>
      </Head>

      {/* Navigation */}
      <nav className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', margin: '20px', borderRadius: '16px', position: 'sticky', top: '20px', zIndex: 100 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-primary)', margin: 0 }}>
          SmartChef<span style={{ color: 'var(--color-accent)' }}>Pro</span>
        </h1>
        <div style={{ display: 'flex', gap: '30px' }}>
          <Link href="/recipes" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Features</Link>
          <Link href="/recipes" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Recipes</Link>
          <Link href="/recipes" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Pricing</Link>
        </div>
        <Link href="/signin" style={{ textDecoration: 'none' }}>
          <button className="btn-primary">Sign In</button>
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 20px' }}>
        <div className="animate-fade-in-up" style={{ maxWidth: '800px' }}>
          <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(5, 150, 105, 0.1)', color: 'var(--color-accent)', borderRadius: '20px', fontWeight: 600, marginBottom: '24px', fontSize: '0.9rem' }}>
            ⭐️ 4.9/5 Rating on App Store
          </span>
          
          <h2 style={{ fontSize: '4rem', fontWeight: 600, lineHeight: 1.1, marginBottom: '24px', color: 'var(--text-primary)' }}>
            Your Intelligent <br />
            <span style={{ background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Kitchen Companion
            </span>
          </h2>
          
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            SmartChef Pro analyzes your ingredients, predicts grocery prices, and generates premium recipes tailored to your dietary needs. Fully compliant with AWS Learner Lab limits.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/recipes" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>Get Started</button>
            </Link>
            <Link href="/recipes" style={{ textDecoration: 'none' }}>
              <button className="btn-glass" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>View Recipes</button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="animate-fade-in-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', width: '100%', marginTop: '80px', animationDelay: '0.2s' }}>
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(154, 52, 18, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '24px' }}>🍳</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--text-primary)' }}>AI Recipe Generation</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Upload a photo of your fridge and let our AI generate the perfect recipe.</p>
          </div>
          
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(5, 150, 105, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '24px' }}>💰</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--text-primary)' }}>Price Prediction</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Get real-time price alerts on your favorite grocery ingredients.</p>
          </div>
          
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(154, 52, 18, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '24px' }}>🔥</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--text-primary)' }}>Calorie Tracking</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Automatically calculate nutritional macros for every meal you cook.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
