import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// RPC connection details from environment
const RPC_HOST = process.env.DCRD_RPC_HOST || 'dcrd';
const RPC_PORT = process.env.DCRD_RPC_PORT || '9109';
const RPC_USER = process.env.DCRD_RPC_USER;
const RPC_PASS = process.env.DCRD_RPC_PASS;

// RPC helper function
async function rpcCall(method, params = []) {
  const auth = Buffer.from(`${RPC_USER}:${RPC_PASS}`).toString('base64');
  
  try {
    const response = await fetch(`http://${RPC_HOST}:${RPC_PORT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(RPC_USER && RPC_PASS ? { 'Authorization': `Basic ${auth}` } : {})
      },
      body: JSON.stringify({
        jsonrpc: '1.0',
        id: 'dashboard',
        method: method,
        params: params
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    return data.result;
  } catch (error) {
    console.error(`RPC Error (${method}):`, error.message);
    throw error;
  }
}

// API endpoints
app.get('/api/node/info', async (req, res) => {
  try {
    const info = await rpcCall('getinfo');
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/node/blockcount', async (req, res) => {
  try {
    const blockCount = await rpcCall('getblockcount');
    res.json({ blockCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/node/peerinfo', async (req, res) => {
  try {
    const peerInfo = await rpcCall('getpeerinfo');
    res.json(peerInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/node/blockchain', async (req, res) => {
  try {
    const blockchainInfo = await rpcCall('getblockchaininfo');
    res.json(blockchainInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/node/networkhashps', async (req, res) => {
  try {
    const hashrate = await rpcCall('getnetworkhashps');
    res.json({ hashrate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/node/difficulty', async (req, res) => {
  try {
    const difficulty = await rpcCall('getdifficulty');
    res.json({ difficulty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Handle the invalid RPC_USER or RPC_PASS
if (!RPC_USER || !RPC_PASS) {
  console.error("RPC_USER and RPC_PASS must be set as environment variables");
  process.exit(1);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Dashboard server running on port ${PORT}`);
  console.log(`Connecting to dcrd RPC at ${RPC_HOST}:${RPC_PORT}`);
});
