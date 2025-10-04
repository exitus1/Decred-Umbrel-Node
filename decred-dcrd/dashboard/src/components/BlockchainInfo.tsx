import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Blocks, Clock, HardDrive, Network } from "lucide-react";

export const BlockchainInfo = () => {
  const infoItems = [
    { label: "Latest Block", value: "856,234", icon: Blocks },
    { label: "Block Time", value: "5m 12s", icon: Clock },
    { label: "Chain Size", value: "8.2 GB", icon: HardDrive },
    { label: "Difficulty", value: "45.2T", icon: Network },
  ];

  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 animate-fade-in">
      <h3 className="text-lg font-semibold text-foreground mb-4">Blockchain Information</h3>
      <div className="space-y-4">
        {infoItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.label}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{item.value}</span>
              </div>
              {index < infoItems.length - 1 && <Separator className="mt-4 bg-border/50" />}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
