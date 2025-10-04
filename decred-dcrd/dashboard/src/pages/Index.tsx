import { NodeStatus } from "@/components/NodeStatus";
import { MetricCard } from "@/components/MetricCard";
import { BlockchainInfo } from "@/components/BlockchainInfo";
import { PeersList } from "@/components/PeersList";
import { RPCConnection } from "@/components/RPCConnection";
import { Users, Layers, TrendingUp, Zap, Coins, Wallet, Lock, DollarSign, Shield, Globe } from "lucide-react";
import decredLogo from "@/assets/decred-logo.jpg";
import dcrSymbol from "@/assets/dcr-symbol.png";
import { useQuery } from "@tanstack/react-query";

// Local node API functions
const fetchNodeInfo = async () => {
  const res = await fetch("/api/node/info");
  if (!res.ok) throw new Error('Node not available');
  return res.json();
};

const fetchBlockchainInfo = async () => {
  const res = await fetch("/api/node/blockchain");
  if (!res.ok) throw new Error('Node not available');
  return res.json();
};

const fetchPeerInfo = async () => {
  const res = await fetch("/api/node/peerinfo");
  if (!res.ok) throw new Error('Node not available');
  return res.json();
};

const fetchNetworkHashrate = async () => {
  const res = await fetch("/api/node/networkhashps");
  if (!res.ok) throw new Error('Node not available');
  return res.json();
};

// Explorer API functions (for network-wide stats not available from local node)
const fetchSupply = async () => {
  const res = await fetch("https://explorer.dcrdata.org/api/supply");
  return res.json();
};

const fetchStakePool = async () => {
  const res = await fetch("https://explorer.dcrdata.org/api/stake/pool");
  return res.json();
};

const fetchExchangeRate = async () => {
  const res = await fetch("https://explorer.dcrdata.org/api/exchangerate");
  return res.json();
};

const Index = () => {
  // Local node queries
  const { data: nodeInfo, isError: nodeError } = useQuery({
    queryKey: ["nodeInfo"],
    queryFn: fetchNodeInfo,
    refetchInterval: 10000,
    retry: 3,
  });

  const { data: blockchainInfo } = useQuery({
    queryKey: ["blockchainInfo"],
    queryFn: fetchBlockchainInfo,
    refetchInterval: 30000,
    enabled: !!nodeInfo,
  });

  const { data: peerInfo } = useQuery({
    queryKey: ["peerInfo"],
    queryFn: fetchPeerInfo,
    refetchInterval: 30000,
    enabled: !!nodeInfo,
  });

  const { data: hashrateData } = useQuery({
    queryKey: ["networkHashrate"],
    queryFn: fetchNetworkHashrate,
    refetchInterval: 60000,
    enabled: !!nodeInfo,
  });

  // Explorer queries (fallback/supplementary data)
  const { data: supplyData } = useQuery({
    queryKey: ["supply"],
    queryFn: fetchSupply,
    refetchInterval: 60000,
  });

  const { data: stakePoolData } = useQuery({
    queryKey: ["stakePool"],
    queryFn: fetchStakePool,
    refetchInterval: 60000,
  });

  const { data: exchangeRateData } = useQuery({
    queryKey: ["exchangeRate"],
    queryFn: fetchExchangeRate,
    refetchInterval: 60000,
  });

  // Calculate metrics from local node
  const blockHeight = blockchainInfo
    ? blockchainInfo.blocks.toLocaleString()
    : nodeInfo?.blocks?.toLocaleString() || "Syncing...";

  const peerCount = peerInfo?.length || nodeInfo?.connections || 0;

  const syncProgress = blockchainInfo
    ? Number((blockchainInfo.verificationprogress * 100).toFixed(1))
    : 0;

  const isSyncing = syncProgress < 99.9;
  const nodeStatus = nodeError ? "stopped" : (isSyncing ? "syncing" : "running");

  // Network hashrate from local node
  const hashrate = hashrateData?.hashrate
    ? (hashrateData.hashrate / 1e15).toFixed(0) + " PH/s"
    : "Calculating...";

  // Calculate metrics from explorer
  const circulatingSupply = supplyData 
    ? (supplyData.supply_mined / 100000000 / 1000000).toFixed(2) + "M"
    : "17.05M";
  
  const stakedSupply = stakePoolData
    ? (stakePoolData.value / 1000000).toFixed(2) + "M"
    : "10.15M";
  
  const stakedPercent = supplyData && stakePoolData
    ? ((stakePoolData.value / (supplyData.supply_mined / 100000000)) * 100).toFixed(1)
    : "59.4";

  const exchangeRate = exchangeRateData
    ? "$" + exchangeRateData.dcrPrice.toFixed(2)
    : "$17.70";

  // Treasury size - using approximate value (would need separate API or scraping)
  const treasurySize = "861.6K";
  const treasurySizeUSD = exchangeRateData
    ? "$" + (861600 * exchangeRateData.dcrPrice / 1000000).toFixed(2) + "M"
    : "$15.25M";
  
  // Mixed supply - percentage of total supply
  const mixedPercent = "62%";

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <img 
              src={decredLogo} 
              alt="Decred Logo" 
              className="h-16 w-16 rounded-xl shadow-glow-primary animate-pulse-glow"
            />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                Decred Node
              </h1>
              <p className="text-muted-foreground">Monitor your dcrd node performance and network status</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://nodes.jholdstock.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all duration-300 hover:shadow-glow-primary flex items-center gap-2"
            >
              <img src={dcrSymbol} alt="Decred" className="h-10 w-10" />
              <span className="text-primary font-semibold">Node Mapper</span>
            </a>
            <a
              href="https://github.com/decred/dcrd"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all duration-300 hover:shadow-glow-primary backdrop-blur-sm"
            >
              <p className="text-sm text-muted-foreground">Version</p>
              <p className="text-lg font-semibold text-primary">
                {nodeInfo?.version ? `v${(nodeInfo.version / 10000).toFixed(1)}` : 'v2.0.6'}
              </p>
            </a>
          </div>
        </div>

        {/* Node Status */}
        <NodeStatus status={nodeStatus} syncProgress={Number(syncProgress)} />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Circulating Supply"
            value={circulatingSupply}
            subtitle="DCR in circulation"
            icon={Coins}
            trend={{ value: "Max 21M", isPositive: true }}
          />
          <MetricCard
            title="Network Peers"
            value={peerCount}
            subtitle="Connected nodes"
            icon={Users}
            trend={{ value: nodeError ? "Node offline" : "Your node", isPositive: !nodeError }}
          />
          <MetricCard
            title="Block Height"
            value={blockHeight}
            subtitle="Latest block"
            icon={Layers}
          />
          <MetricCard
            title="Network Hashrate"
            value={hashrate}
            subtitle="Total network power"
            icon={TrendingUp}
            trend={{ value: "Real-time", isPositive: true }}
          />
        </div>

        {/* Additional Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Treasury Size"
            value={treasurySize}
            subtitle="Self-funded from block reward"
            icon={Wallet}
            usdValue={treasurySizeUSD}
          />
          <MetricCard
            title="Supply Staked"
            value={stakedSupply}
            subtitle="Stakeholders Rule"
            icon={Lock}
          />
          <MetricCard
            title="Supply Mixed"
            value={mixedPercent}
            subtitle="Privacy enhanced"
            icon={Shield}
            trend={{ value: "CoinShuffle++", isPositive: true }}
          />
          <MetricCard
            title="Exchange Rate"
            value={exchangeRate}
            subtitle="USD per DCR"
            icon={DollarSign}
          />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BlockchainInfo />
          <RPCConnection />
        </div>

        {/* Peers List */}
        <PeersList />
      </div>
    </div>
  );
};

export default Index;
