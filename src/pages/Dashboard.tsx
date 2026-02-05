import { ChevronRight, Info, CheckCircle2, Clock, CircleDot, TrendingUp, Calendar, Wallet, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { useProtocol } from "@/components/providers/ProtocolProvider";
import { useWallet } from "@/components/providers/WalletProvider";
import { useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const { circles, transactions, depositToCircle } = useProtocol();
  const { connectWallet, isConnected } = useWallet();
  const [depositingId, setDepositingId] = useState<string | null>(null);

  // Use the first circle as the active one for the dashboard view, or default mock if none
  const activeCircle = circles.length > 0 ? circles[0] : null;

  const handleDeposit = async (circleId: string, amount: string) => {
    if (!isConnected) {
      toast.error("Please connect wallet first");
      connectWallet();
      return;
    }
    setDepositingId(circleId);
    await depositToCircle(circleId, amount);
    setDepositingId(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background font-sans selection:bg-primary/30">
        <DashboardSidebar />

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {/* Top Bar / Breadcrumb */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 sm:gap-4 text-sm text-muted-foreground/60">
              <SidebarTrigger className="md:hidden text-foreground" />
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-muted-foreground">Network Stable</span>
              </div>
              {!isConnected && (
                <Button size="sm" className="bg-primary text-black hover:bg-primary/90" onClick={connectWallet}>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>

          <div className="max-w-7xl mx-auto space-y-8">
            {/* Pool Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-4">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-xs opacity-80 break-all">
                    {activeCircle ? `ID: ${activeCircle.id.slice(0, 8)}...` : "No Active Circle"}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight break-words">
                  {activeCircle ? activeCircle.name : "Welcome to Action Wave"}
                </h1>
              </div>
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
                {activeCircle && (
                  <Button
                    onClick={() => handleDeposit(activeCircle.id, activeCircle.contributionAmount)}
                    disabled={!!depositingId}
                    className="bg-primary text-black hover:bg-primary/90 font-bold w-full sm:w-auto"
                  >
                    {depositingId === activeCircle.id ? "Processing..." : `Deposit $${activeCircle.contributionAmount}`}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {!activeCircle && (
                  <Link to="/create-circle" className="w-full sm:w-auto">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white w-full">
                      Create Your First Circle
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* If no circles, show Empty State */}
            {!activeCircle && (
              <div className="p-12 border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center">
                  <CircleDot className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">No Savings Circles Yet</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm">Get started by deploying a new savings circle to the Stellar network.</p>
                </div>
              </div>
            )}

            {activeCircle && (
              <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Payout Protocol Sidebar */}
                <div className="space-y-6 lg:order-2">
                  <Card className="bg-card/50 border-white/10 backdrop-blur-sm card-gradient">
                    <CardHeader className="border-b border-white/5 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <CircleDot className="h-4 w-4 text-primary" />
                        </div>
                        <CardTitle className="text-base text-white">Payout Protocol</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        The payout algorithm distributes funds based on a randomized selection each cycle, ensuring fair and transparent disbursement.
                      </p>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                          <div className="text-sm font-medium text-white/80">Your Position</div>
                          <div className="text-2xl font-bold text-white mt-1 flex items-baseline gap-2">
                            1st <span className="text-sm font-normal text-muted-foreground">in Queue</span>
                          </div>
                          <div className="text-xs text-primary/80 mt-2 flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" />
                            Expected payout: This Cycle
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
                    <CardHeader className="pb-3 border-b border-white/5">
                      <CardTitle className="text-base text-white">Circle Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Contribution</span>
                        <span className="font-mono font-medium text-white">${activeCircle.contributionAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Members</span>
                        <span className="font-mono font-medium text-white">{activeCircle.memberCount}/{activeCircle.maxMembers}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-mono font-medium text-primary capitalize">{activeCircle.status}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6 lg:order-1 min-w-0">
                  {/* Your Status */}
                  <Card className="bg-card/50 border-white/10 backdrop-blur-sm overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <CardHeader>
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Your Activities
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {/* Transaction Ledger */}
                      <div className="rounded-md border border-white/5 overflow-hidden">
                        <div className="overflow-x-auto">
                          <Table className="min-w-[600px] w-full">
                            <TableHeader>
                              <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="text-muted-foreground font-medium">Type</TableHead>
                                <TableHead className="text-muted-foreground font-medium">Amount</TableHead>
                                <TableHead className="text-muted-foreground font-medium">Date</TableHead>
                                <TableHead className="text-muted-foreground text-right font-medium">Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {transactions.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No recent transactions</TableCell>
                                </TableRow>
                              ) : (
                                transactions.map((tx) => (
                                  <TableRow key={tx.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                                    <TableCell className="font-mono text-sm text-white/90 capitalize">{tx.type}</TableCell>
                                    <TableCell className="text-white/80 font-mono">{tx.amount} XLM</TableCell>
                                    <TableCell className="text-muted-foreground whitespace-nowrap">{tx.date}</TableCell>
                                    <TableCell className="text-right">
                                      <StatusBadge status={tx.status} />
                                    </TableCell>
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
