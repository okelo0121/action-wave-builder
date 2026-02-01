import { ArrowRight, ExternalLink, Shield, Zap, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { protocolStats, liquidityPools, onChainOperations } from "@/data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 px-4 py-1.5">
              <Zap className="h-3 w-3 mr-1.5" />
              Powered by Stellar Mainnet
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              DECENTRALIZED
              <br />
              <span className="text-primary">SAVINGS PROTOCOL</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join trustless savings circles powered by smart contracts. 
              Earn together, grow together with transparent on-chain settlements.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="min-w-[160px]">
                Join Network
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="min-w-[160px]">
                Explore Protocol
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border bg-card/30">
          <div className="container py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center space-y-1">
                <div className="text-3xl font-bold text-foreground">{protocolStats.totalValueLocked}</div>
                <div className="text-sm text-muted-foreground">Total Value Locked</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-3xl font-bold text-foreground">{protocolStats.activeCircles}</div>
                <div className="text-sm text-muted-foreground">Active Circles</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-3xl font-bold text-foreground">{protocolStats.totalPayouts}</div>
                <div className="text-sm text-muted-foreground">Total Payouts</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-3xl font-bold text-foreground">{protocolStats.settlementTime}</div>
                <div className="text-sm text-muted-foreground">Settlement Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Liquidity Pools */}
        <section className="container py-16">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Active Liquidity Pools</h2>
                <p className="text-muted-foreground mt-1">Join a savings circle and start growing your wealth</p>
              </div>
              <Button variant="outline" size="sm">
                View All Pools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {liquidityPools.map((pool) => (
                <Card key={pool.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {pool.name}
                      </CardTitle>
                      <StatusBadge status={pool.status} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Contribution</div>
                        <div className="font-medium text-foreground">{pool.contribution}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Frequency</div>
                        <div className="font-medium text-foreground">{pool.frequency}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Members</div>
                        <div className="font-medium text-foreground">{pool.members}/{pool.maxMembers}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Target Payout</div>
                        <div className="font-medium text-primary">{pool.targetPayout}</div>
                      </div>
                    </div>
                    
                    <Link to={`/circle/${pool.id}`}>
                      <Button className="w-full" size="sm">
                        Join Circle
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* On-Chain Transparency */}
        <section className="container py-16">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">On-Chain Transparency</h2>
                <p className="text-muted-foreground mt-1">Live operations feed from the Stellar network</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
                Live
              </div>
            </div>

            <Card className="bg-card border-border">
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
                  {onChainOperations.map((op) => (
                    <TableRow key={op.id} className="border-border">
                      <TableCell className="font-mono text-sm text-foreground">{op.entity}</TableCell>
                      <TableCell className="text-foreground">{op.action}</TableCell>
                      <TableCell className="text-muted-foreground">{op.timestamp}</TableCell>
                      <TableCell className="text-right font-medium text-foreground">{op.volume}</TableCell>
                      <TableCell className="text-right">
                        <StatusBadge status={op.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </section>

        {/* Features */}
        <section className="container py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Trustless Security</h3>
              <p className="text-sm text-muted-foreground">
                Smart contracts ensure your funds are always secure with automated escrow and collateral management.
              </p>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                Join verified savings circles with like-minded members and build trust through on-chain reputation.
              </p>
            </Card>

            <Card className="bg-card border-border p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Instant Settlements</h3>
              <p className="text-sm text-muted-foreground">
                Powered by Stellar's fast finality, receive your payouts in seconds with minimal transaction fees.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
