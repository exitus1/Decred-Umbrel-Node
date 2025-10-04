import { Activity, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NodeStatusProps {
  status: "running" | "syncing" | "stopped";
  syncProgress?: number;
}

export const NodeStatus = ({ status, syncProgress = 0 }: NodeStatusProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "running":
        return {
          icon: Activity,
          label: "Fully Synced",
          color: "text-success",
          bgColor: "bg-success/10",
          borderColor: "border-success/20",
        };
      case "syncing":
        return {
          icon: Loader2,
          label: "Syncing",
          color: "text-warning",
          bgColor: "bg-warning/10",
          borderColor: "border-warning/20",
        };
      case "stopped":
        return {
          icon: AlertCircle,
          label: "Stopped",
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/20",
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${config.bgColor} border ${config.borderColor}`}>
            <StatusIcon className={`h-6 w-6 ${config.color} ${status === "syncing" ? "animate-spin" : ""}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Node Status</h3>
            <p className="text-sm text-muted-foreground">Decred</p>
          </div>
        </div>
        <div className={`px-6 py-3 rounded-xl ${status === "running" ? "bg-success text-white shadow-[0_0_30px_hsl(142_76%_36%/0.6)]" : `${config.bgColor} border-2 ${config.borderColor}`}`}>
          <span className={`${status === "running" ? "text-white" : config.color} font-bold text-lg tracking-wide`}>
            {config.label}
          </span>
        </div>
      </div>
      
      {status === "syncing" && (
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">Blockchain Sync Progress</span>
            <span className="text-foreground font-bold text-lg">{syncProgress}%</span>
          </div>
          <div className="relative h-3 bg-muted rounded-full overflow-hidden border border-border/50">
            <div 
              className="h-full bg-gradient-primary transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${syncProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Block: {Math.floor((syncProgress / 100) * 856234)}</span>
            <span>Target: 856,234</span>
          </div>
        </div>
      )}
    </Card>
  );
};
