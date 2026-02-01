import { CheckCircle2, Copy, ExternalLink, ArrowRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import { payoutData } from "@/data/mockData";

const PayoutSuccess = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-lg w-full space-y-8">
          {/* Success Icon */}
          <div className="text-center space-y-4">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 mx-auto">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Payout Successful</h1>
            <p className="text-muted-foreground">Your funds have been released to your wallet</p>
          </div>

          {/* Total Payout */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Total Payout Amount</CardTitle>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  RELEASED
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{payoutData.totalPayout}</div>
            </CardContent>
          </Card>

          {/* Breakdown */}
          <Card className="bg-card border-border">
            <CardContent className="pt-6 space-y-6">
              {/* Initial Payout */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Initial Payout</span>
                  <span className="font-medium text-foreground">{payoutData.initialPayout}</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>

              {/* Remaining Balance */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Remaining Balance</span>
                  <span className="font-medium text-foreground">{payoutData.remainingBalance}</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Collateral Released */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Collateral Released</div>
                  <div className="text-2xl font-bold text-primary mt-1">{payoutData.collateralReleased}</div>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Hash */}
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground mb-2">Transaction Hash</div>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm font-mono text-foreground bg-secondary px-3 py-2 rounded-lg truncate">
                  {payoutData.transactionHash}
                </code>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => copyToClipboard(payoutData.transactionHash)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full">
                <ArrowRight className="mr-2 h-4 w-4" />
                View Ledger Details
              </Button>
            </Link>
            <Link to="/" className="flex-1">
              <Button className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PayoutSuccess;
