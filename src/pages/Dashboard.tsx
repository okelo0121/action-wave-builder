import { ChevronRight, Info, CheckCircle2, Clock, CircleDot } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { dashboardData } from "@/data/mockData";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <main className="flex-1 p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Dashboard</span>
          </div>

          <div className="max-w-6xl">
            {/* Pool Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span className="font-mono">{dashboardData.smartContractId}</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">{dashboardData.poolName}</h1>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Your Status */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <div className="text-sm text-muted-foreground">Contributed</div>
                        <div className="text-2xl font-bold text-foreground mt-1">
                          {dashboardData.status.contributed}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Next Payment</div>
                        <div className="text-2xl font-bold text-foreground mt-1">
                          {dashboardData.status.nextPayment}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Current Cycle</div>
                        <div className="text-2xl font-bold text-foreground mt-1">
                          {dashboardData.status.currentCycle}/{dashboardData.status.totalCycles}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Coverage Progress</span>
                        <span className="font-medium text-foreground">
                          {dashboardData.status.coverageProgress}%
                        </span>
                      </div>
                      <Progress value={dashboardData.status.coverageProgress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Distribution Timeline */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Distribution Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      {dashboardData.timeline.map((item, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <div className={`relative ${
                            item.status === "active" ? "ring-2 ring-primary ring-offset-2 ring-offset-background rounded-full" : ""
                          }`}>
                            <Avatar className={`h-12 w-12 ${
                              item.status === "completed" 
                                ? "opacity-100" 
                                : item.status === "active" 
                                ? "opacity-100" 
                                : "opacity-40"
                            }`}>
                              <AvatarImage src={item.avatar} />
                              <AvatarFallback>{item.member[0]}</AvatarFallback>
                            </Avatar>
                            {item.status === "completed" && (
                              <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                                <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                              </div>
                            )}
                            {item.status === "active" && (
                              <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary flex items-center justify-center animate-pulse">
                                <Clock className="h-3 w-3 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-medium text-foreground">{item.month}</div>
                            <div className="text-xs text-muted-foreground">{item.member}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Transaction Ledger */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Transaction Ledger</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                          <TableHead className="text-muted-foreground">Entity</TableHead>
                          <TableHead className="text-muted-foreground">Action</TableHead>
                          <TableHead className="text-muted-foreground">Timestamp</TableHead>
                          <TableHead className="text-muted-foreground text-right">Volume</TableHead>
                          <TableHead className="text-muted-foreground text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboardData.transactions.map((tx) => (
                          <TableRow key={tx.id} className="border-border">
                            <TableCell className="font-mono text-sm text-foreground">{tx.entity}</TableCell>
                            <TableCell className="text-foreground">{tx.action}</TableCell>
                            <TableCell className="text-muted-foreground">{tx.timestamp}</TableCell>
                            <TableCell className="text-right font-medium text-foreground">{tx.volume}</TableCell>
                            <TableCell className="text-right">
                              <StatusBadge status={tx.status} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Payout Protocol Sidebar */}
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CircleDot className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">Payout Protocol</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      The payout algorithm distributes funds based on a randomized selection each cycle, ensuring fair and transparent disbursement.
                    </p>
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="text-sm font-medium text-foreground">Your Position</div>
                      <div className="text-2xl font-bold text-primary mt-1">5th in Queue</div>
                      <div className="text-xs text-muted-foreground mt-1">Expected payout: May 2024</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Circle Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Pool</span>
                      <span className="font-medium text-foreground">$5,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Members</span>
                      <span className="font-medium text-foreground">10/10</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Cycle</span>
                      <span className="font-medium text-foreground">5 of 10</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-medium text-primary">50%</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-4 rounded-lg bg-secondary border border-border">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      All transactions are recorded on the Stellar blockchain for complete transparency and auditability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
