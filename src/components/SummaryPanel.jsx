export default function SummaryPanel({ expenses }) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Group expenses by category
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  // Convert object to array and sort by amount descending
  const sortedCategories = Object.entries(categoryTotals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: '500' }}>
          Total Vault
        </p>
        <p className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1, margin: 0 }}>
          ${total.toFixed(2)}
        </p>
      </div>

      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--text-primary)', fontWeight: '600' }}>
          Spending Analytics
        </h3>
        
        {sortedCategories.length === 0 ? (
          <div style={{ height: '4px', background: 'var(--glass-border)', borderRadius: '2px', width: '100%', opacity: 0.5 }} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sortedCategories.map(({ category, amount }) => {
              const percentage = total > 0 ? ((amount / total) * 100).toFixed(1) : 0;
              
              return (
                <div key={category} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>{category}</span>
                    <span style={{ fontWeight: '600' }}>${amount.toFixed(2)} <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '400', marginLeft: '0.25rem' }}>({percentage}%)</span></span>
                  </div>
                  
                  <div style={{ height: '6px', background: 'rgba(15, 23, 42, 0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${percentage}%`, 
                        background: 'var(--gradient-secondary)',
                        borderRadius: '3px',
                        transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
