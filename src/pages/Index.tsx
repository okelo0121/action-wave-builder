import { ArrowRight, ExternalLink, Shield, Zap, Users, Clock, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { protocolStats, liquidityPools, onChainOperations } from "@/data/mockData";
import { useProtocol } from "@/components/providers/ProtocolProvider";

const Index = () => {
  const { circles } = useProtocol();

  // Use real circles if available, otherwise mock data for demo
  const poolSource = circles.length > 0 ? circles : liquidityPools;

  // Duplicate data for seamless loops
  const marqueePools = [...poolSource, ...poolSource];
  const tickerOperations = [...onChainOperations, ...onChainOperations, ...onChainOperations];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/30 text-foreground overflow-x-hidden">
      <Header />

      <main className="flex-1 relative">
        {/* Background Gradients & Effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 blur-[120px] rounded-full opacity-50 mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[600px] bg-primary/5 blur-[100px] rounded-full opacity-30" />
          {/* Vertical Lines Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
          <div className="absolute inset-0 flex justify-center w-full h-full opacity-10 pointer-events-none select-none">
            <div className="w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent mx-12 md:mx-32" />
            <div className="w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent mx-12 md:mx-32" />
            <div className="w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent mx-12 md:mx-32" />
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-24 md:pt-48 md:pb-32 container">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-4 backdrop-blur-sm animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Powered by Stellar Mainnet
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] md:leading-[1.1] animate-fade-in-up [animation-delay:200ms]">
              DECENTRALIZED
              <br />
              <span className="text-gradient-gold drop-shadow-lg">SAVINGS PROTOCOL</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              Join trustless savings circles powered by smart contracts.
              Earn together, grow together with transparent on-chain settlements.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-fade-in-up [animation-delay:600ms]">
              <Button size="lg" className="min-w-[180px] rounded-full bg-white text-black hover:bg-white/90 font-semibold h-12 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all transform hover:-translate-y-0.5">
                Join Network
              </Button>
              <Button variant="link" size="lg" className="min-w-[180px] text-white hover:text-primary transition-colors h-12 underline-offset-4 decoration-primary/50">
                Explore Protocol
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section with Glassmorphism */}
        <section className="relative z-10 border-y border-white/5 bg-black/20 backdrop-blur-sm">
          <div className="container py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="text-center space-y-2 group">
                <div className="text-4xl font-bold text-white group-hover:text-primary transition-colors duration-500">{protocolStats.totalValueLocked}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Total Value Locked</div>
              </div>
              <div className="text-center space-y-2 group">
                <div className="text-4xl font-bold text-white group-hover:text-primary transition-colors duration-500">{protocolStats.activeCircles}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Active Circles</div>
              </div>
              <div className="text-center space-y-2 group">
                <div className="text-4xl font-bold text-white group-hover:text-primary transition-colors duration-500">{protocolStats.totalPayouts}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Total Payouts</div>
              </div>
              <div className="text-center space-y-2 group">
                <div className="text-4xl font-bold text-white group-hover:text-primary transition-colors duration-500">{protocolStats.settlementTime}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Settlement Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Liquidity Pools - Horizontal Marquee */}
        <section className="relative z-10 py-24 overflow-hidden">
          <div className="container space-y-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-6 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Active Liquidity Pools</h2>
                <p className="text-muted-foreground mt-2">Join a savings circle and start growing your wealth</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-full border-white/10 text-white hover:bg-white/5 hover:text-primary hover:border-primary/50 transition-all">
                View All Pools
              </Button>
            </div>
          </div>

          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-marquee-horizontal hover:[animation-play-state:paused]">
              {marqueePools.map((pool, index) => (
                <div key={`${pool.id}-${index}`} className="group relative w-[350px] shrink-0 mx-4">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-primary via-primary/0 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                  <Card className="relative h-full bg-card border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                          {pool.name}
                        </CardTitle>
                        <StatusBadge status={pool.status} />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-y-4 text-sm">
                        <div>
                          <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Contribution</div>
                          <div className="font-mono text-white text-lg">
                            {/* Handle both mock data format ($500) and Protocol format (500) */}
                            {pool.contributionAmount ? `$${pool.contributionAmount}` : (pool as any).contribution}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Frequency</div>
                          <div className="font-mono text-white text-lg capitalize">
                            {pool.cyclePeriod || (pool as any).frequency}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Members</div>
                          <div className="font-mono text-white text-lg">{pool.memberCount || (pool as any).members}/{pool.maxMembers}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Payout</div>
                          <div className="font-mono text-primary text-lg">{pool.targetPayout}</div>
                        </div>
                      </div>

                      <Link to={`/circle/${pool.id}`} className="block">
                        <Button className="w-full bg-white/5 text-white hover:bg-white hover:text-black border border-white/5 transition-all duration-300">
                          Join Circle
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* On-Chain Transparency - Vertical Ticker */}
        <section className="relative z-10 container py-24 border-t border-white/5">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">On-Chain Transparency</h2>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  Real-time stream of all protocol interactions. Verified and secured by the Stellar network.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Live Feed Active
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-sm text-muted-foreground mb-2">Network TPS</div>
                <div className="text-3xl font-mono text-white font-bold">1,240</div>
                <div className="h-1 w-full bg-white/10 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-primary w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card className="bg-black/40 border-white/5 backdrop-blur-xl overflow-hidden relative h-[500px]">
                {/* Table Header - Static */}
                <div className="grid grid-cols-5 p-4 border-b border-white/10 bg-black/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground z-20 relative">
                  <div className="col-span-1">Entity</div>
                  <div className="col-span-1">Action</div>
                  <div className="col-span-1">Timestamp</div>
                  <div className="col-span-1 text-right">Volume</div>
                  <div className="col-span-1 text-right">Status</div>
                </div>

                {/* Gradient Mask at Bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>

                {/* Ticker Content */}
                <div className="overflow-hidden h-full relative">
                  <div className="animate-marquee-vertical hover:[animation-play-state:paused] flex flex-col">
                    {tickerOperations.map((op, i) => (
                      <div key={`${op.id}-${i}`} className="grid grid-cols-5 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center">
                        <div className="col-span-1 font-mono text-sm text-white">{op.entity}</div>
                        <div className="col-span-1 text-white text-sm">{op.action}</div>
                        <div className="col-span-1 text-muted-foreground text-xs">{op.timestamp}</div>
                        <div className="col-span-1 text-right font-mono font-medium text-white text-sm">{op.volume}</div>
                        <div className="col-span-1 text-right flex justify-end">
                          <StatusBadge status={op.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative z-10 container py-24 grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Trustless Security", desc: "Smart contracts ensure your funds are always secure with automated escrow and collateral management." },
            { icon: Users, title: "Community Driven", desc: "Join verified savings circles with like-minded members and build trust through on-chain reputation." },
            { icon: Clock, title: "Instant Settlements", desc: "Powered by Stellar's fast finality, receive your payouts in seconds with minimal transaction fees." }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
