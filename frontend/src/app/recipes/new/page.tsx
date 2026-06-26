'use client';
import Head from 'next/head';
import Link from 'next/link';

export default function SubmitRecipe() {
  return (
    <div style={{ minHeight: '100vh', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Head>
        <title>Submit Recipe | SmartChef Pro</title>
      </Head>

      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Link href="/recipes" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-block', marginBottom: '20px', fontWeight: 500 }}>
          &larr; Back to Dashboard
        </Link>

        <div className="glass-panel animate-fade-in-up" style={{ padding: '40px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '24px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Submit a Recipe
          </h2>
          
          <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/recipes'; }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 500 }}>Recipe Name</label>
              <input type="text" required placeholder="e.g. Avocado Toast" style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.5)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 500 }}>Description</label>
              <textarea required rows={4} placeholder="Briefly describe the cooking steps..." style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.5)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none', resize: 'vertical' }}></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '12px', width: '100%' }}>
              Submit for Approval
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
