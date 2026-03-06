import { useState, useEffect } from 'react';

const API_URL = 'https://api.frankfurter.app/latest';
const CURRENCIES = ['EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];

export default function CurrencyConverter({ totalAmountUSD }) {
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (totalAmountUSD <= 0) {
      setConvertedAmount(0);
      return;
    }

    const fetchConversionRate = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${API_URL}?from=USD&to=${targetCurrency}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rate');
        }
        
        const data = await response.json();
        const rate = data.rates[targetCurrency];
        
        setConvertedAmount(totalAmountUSD * rate);
      } catch (err) {
        console.error("Currency API Error:", err);
        setError('Conversion currently unavailable');
      } finally {
        setLoading(false);
      }
    };

    const timerId = setTimeout(() => {
        fetchConversionRate();
    }, 300);
    
    return () => clearTimeout(timerId);
  }, [totalAmountUSD, targetCurrency]);

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: '600' }}>
          Global Exchange
        </h3>
        <select 
          id="currency"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          style={{ width: 'auto', padding: '0.4rem 2rem 0.4rem 1rem', fontSize: '0.85rem', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '20px', color: 'var(--text-primary)' }}
        >
          {CURRENCIES.map(curr => (
            <option key={curr} value={curr}>{curr}</option>
          ))}
        </select>
      </div>

      <div 
        style={{ 
          background: 'rgba(15, 23, 42, 0.02)', 
          padding: '1.5rem', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(15, 23, 42, 0.06)',
          minHeight: '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ 
            position: 'absolute', 
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '100px', height: '100px',
            background: loading ? 'rgba(59, 130, 246, 0.15)' : 'rgba(13, 148, 136, 0.1)',
            filter: 'blur(30px)',
            borderRadius: '50%',
            transition: 'var(--transition)'
        }}></div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1 }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-color)', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Syncing rates...
            </p>
          </div>
        ) : error ? (
          <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center', zIndex: 1 }}>
             {error}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Equivalent to
            </p>
            <p className="gradient-text-alt" style={{ fontSize: '2.5rem', fontWeight: '700', margin: 0, lineHeight: 1 }}>
              {targetCurrency === 'EUR' ? '€' : 
               targetCurrency === 'GBP' ? '£' : 
               targetCurrency === 'INR' ? '₹' : 
               targetCurrency === 'JPY' ? '¥' : ''}
              {convertedAmount !== null ? convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
              {targetCurrency !== 'EUR' && targetCurrency !== 'GBP' && targetCurrency !== 'INR' && targetCurrency !== 'JPY' ? ` ${targetCurrency}` : ''}
            </p>
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
