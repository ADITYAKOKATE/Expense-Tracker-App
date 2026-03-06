export default function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <div style={{ marginBottom: '1rem', opacity: 0.5 }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Your canvas is clear</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Record your first expense above to start tracking.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Recent Activity</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {expenses.map((expense, index) => (
          <div 
            key={expense.id}
            className="animate-fade-in-up" 
            style={{ 
              animationDelay: `${index * 0.05}s`,
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '1.25rem',
              backgroundColor: 'rgba(15, 23, 42, 0.01)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(15, 23, 42, 0.05)',
              transition: 'var(--transition)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.04)';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.01)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                {expense.name}
              </h4>
              <span 
                style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: '600',
                  color: 'var(--accent-color)',
                  backgroundColor: 'var(--accent-glow)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {expense.category}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span style={{ fontWeight: '700', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
                ${expense.amount.toFixed(2)}
              </span>
              <button 
                onClick={() => onDeleteExpense(expense.id)}
                className="btn-danger"
                aria-label="Delete expense"
                title="Delete"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
