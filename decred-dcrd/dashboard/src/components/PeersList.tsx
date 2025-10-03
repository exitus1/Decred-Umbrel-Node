import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wifi, ArrowUpDown } from "lucide-react";

const mockPeers = [
  { id: 1, address: "45.32.176.123:9108", protocol: "TCP", latency: "45ms" },
  { id: 2, address: "167.99.82.41:9108", protocol: "TCP", latency: "67ms" },
  { id: 3, address: "192.168.1.100:9108", protocol: "TCP", latency: "12ms" },
  { id: 4, address: "104.248.23.156:9108", protocol: "TCP", latency: "89ms" },
  { id: 5, address: "178.128.45.67:9108", protocol: "TCP", latency: "54ms" },
];

export const PeersList = () => {
  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Connected Peers</h3>
        <Badge className="bg-primary/10 text-primary border-primary/20">
          {mockPeers.length} Active
        </Badge>
      </div>
      
      <ScrollArea className="h-[300px]">
        <div className="space-y-3">
          {mockPeers.map((peer) => (
            <div
              key={peer.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10 border border-success/20">
                  <Wifi className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{peer.address}</p>
                  <p className="text-xs text-muted-foreground">{peer.protocol}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{peer.latency}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
