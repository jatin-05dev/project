import React, { useState } from 'react';

function App() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('Vault is Locked 🔒');
  const [loading, setLoading] = useState(false);

  // BUG 1: Port is 8001 (Django runs on 8000). 
  // Team has to find this and change it to 8000.
  const API_URL = "http://127.0.0.1:8000/api"

  const login = async () => {
    setMessage("Attempting Login...");
    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      
      if (data.access) {
        setToken(data.access);
        setMessage("Logged In! Token Received. Now Open the Vault.");
      } else {
        setMessage("Login Failed! Check Console.");
      }
    } catch (err) {
      setMessage("Connection Error!?");
    }
  };

  const openVault = async () => {
    setLoading(true);
    setMessage("Unlocking...");
    try {
      const response = await fetch(`${API_URL}/vault/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          // BUG 2: 'X-SECRET-HASH' header is missing here.
          // Team must manually add 'X-SECRET-HASH': '53' to fetch the flag.
          'X-SECRET-HASH': '53' 
        }
      });
      const data = await response.json();

      if (response.status === 403) {
        setMessage(`Error 403: ${data.error}. Hint: ${data.hint}`);
      } else if (data.flag) {
        setMessage(`SUCCESS! FLAG: ${data.flag}`);
      } else {
        setMessage(data.detail || "Access Denied.");
      }
    } catch (err) {
      // BUG 3: Due to the 'while' loop in Django, this might timeout.
      setMessage("Request Timeout! The server is too slow or looping.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>⚡ TECH TREASURE HUNT ⚡</h1>
      <div style={styles.card}>
        <p style={styles.status}><strong>Status:</strong> {message}</p>
        
        <button onClick={login} style={styles.button}>
          Step 1: Get Access Token
        </button>

        <button 
          onClick={openVault} 
          style={{...styles.button, backgroundColor: '#28a745'}}
          disabled={!token || loading}
        >
          {loading ? "Processing..." : "Step 2: Unlock Vault"}
        </button>
      </div>
      <p style={styles.footer}>Find the bugs in Frontend, Settings, Middleware, and Views!</p>
    </div>
  );
}

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212', color: 'white', fontFamily: 'Arial' },
  header: { color: '#f39c12', marginBottom: '20px' },
  card: { padding: '30px', borderRadius: '10px', backgroundColor: '#1e1e1e', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', textAlign: 'center' },
  status: { fontSize: '18px', marginBottom: '20px', color: '#00d4ff' },
  button: { padding: '10px 20px', fontSize: '16px', cursor: 'pointer', margin: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', fontWeight: 'bold' },
  footer: { marginTop: '20px', fontSize: '12px', color: '#666' }
};

export default App;