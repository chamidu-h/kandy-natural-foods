import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const ApiTest = () => {
  const { allProducts, loading, error, refreshProducts, clearError } = useContext(ProductContext);
  const [testResult, setTestResult] = useState('');
  const [isTestRunning, setIsTestRunning] = useState(false);

  const testApiConnection = async () => {
    setIsTestRunning(true);
    setTestResult('🔄 Testing API connection...');
    
    try {
      // Clear any previous errors
      clearError();
      
      // Test direct API call
      const response = await fetch('https://kandy-admin.vercel.app/api/products');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setTestResult(`✅ Direct API Success! Found ${data.length} products`);
      
      // Also refresh context
      setTimeout(() => {
        refreshProducts();
      }, 1000);
      
    } catch (err) {
      setTestResult(`❌ API Connection Failed: ${err.message}`);
      console.error('API Test Error:', err);
    } finally {
      setIsTestRunning(false);
    }
  };

  return (
    <div style={{ 
      padding: '1.5rem', 
      border: '2px dashed var(--primary-color)', 
      margin: '1rem',
      borderRadius: '12px',
      backgroundColor: 'white',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
        🔗 Admin API Connection Test
      </h3>
      
      <button 
        onClick={testApiConnection} 
        disabled={isTestRunning || loading}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: isTestRunning ? '#ccc' : 'var(--primary-color)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: isTestRunning ? 'not-allowed' : 'pointer',
          fontWeight: '600',
          marginBottom: '1rem'
        }}
      >
        {isTestRunning ? 'Testing...' : 'Test API Connection'}
      </button>
      
      {testResult && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: testResult.includes('✅') ? '#d4edda' : '#f8d7da',
          borderRadius: '8px',
          marginBottom: '1rem',
          fontWeight: '600'
        }}>
          {testResult}
        </div>
      )}
      
      <div style={{ fontSize: '0.9rem', color: '#666' }}>
        <p><strong>Context Status:</strong></p>
        <p>• Products in context: {allProducts.length}</p>
        <p>• Loading: {loading ? 'Yes' : 'No'}</p>
        <p>• Error: {error || 'None'}</p>
        <p>• API URL: https://kandy-admin.vercel.app/api</p>
      </div>
      
      {error && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '0.75rem',
          backgroundColor: '#fff3cd',
          borderRadius: '6px',
          fontSize: '0.9rem'
        }}>
          <strong>Context Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default ApiTest;
