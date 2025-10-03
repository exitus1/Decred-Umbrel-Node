import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Server, Lock } from "lucide-react";
import { useState } from "react";

export const RPCConnection = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // Connection logic will go here
    setIsConnected(!isConnected);
  };

  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Server className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">RPC Connection</h3>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rpc-host">RPC Host</Label>
            <Input 
              id="rpc-host" 
              placeholder="localhost" 
              defaultValue="localhost"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rpc-port">RPC Port</Label>
            <Input 
              id="rpc-port" 
              placeholder="9109" 
              defaultValue="9109"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rpc-username">RPC Username</Label>
          <Input 
            id="rpc-username" 
            placeholder="Enter username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rpc-password">RPC Password</Label>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <Input 
              id="rpc-password" 
              type="password" 
              placeholder="Enter password"
            />
          </div>
        </div>

        <Button 
          onClick={handleConnect}
          className="w-full"
          variant={isConnected ? "secondary" : "default"}
        >
          {isConnected ? "Disconnect" : "Connect to Node"}
        </Button>

        {isConnected && (
          <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm text-primary font-medium">✓ Connected to dcrd node</p>
          </div>
        )}
      </div>
    </Card>
  );
};
