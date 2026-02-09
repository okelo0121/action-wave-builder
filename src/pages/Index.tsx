import { ArrowRight, ExternalLink, Shield, Zap, Users, Clock, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { protocolStats, liquidityPools, onChainOperations } from "@/data/mockData";
import { useProtocol } from "@/components/providers/ProtocolProvider";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const AnimationCard = ({ step, title, desc, animationPath, className, simplified = false }: { step: string, title: string, desc: string, animationPath: string, className?: string, simplified?: boolean }) => {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(animationPath)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Failed to load animation", err));
  }, [animationPath]);

  if (simplified) {
    return (
      <div className={`h-64 w-64 relative flex items-center justify-center transition-transform duration-500 hover:scale-105 ${className}`}>
        {animationData ? (
          <Lottie animationData={animationData} loop={true} className="w-full h-full drop-shadow-[0_0_25px_rgba(var(--primary),0.2)]" />
        ) : (
          <div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        )}
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col items-center text-center p-4">
      <div className="absolute -top-4 -right-4 md:top-0 md:right-10 text-6xl font-bold text-white/5 group-hover:text-primary/10 transition-colors select-none">{step}</div>
      <div className="h-48 w-48 mb-6 relative flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
        {animationData ? (
          <Lottie animationData={animationData} loop={true} className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
        ) : (
          <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-base text-muted-foreground max-w-xs leading-relaxed">{desc}</p>
    </div>
  );
};

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

        {/* How It Works - Visual Explainer */}
        <section className="relative z-10 py-24 container overflow-hidden">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">How Savings Circles Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple, transparent process to save and earn together.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto flex flex-col gap-24 md:gap-32">
            {/* Vertical Connecting Line (Dotted) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-primary/20 -translate-x-1/2 hidden md:block" />

            {[
              {
                step: "01",
                title: "Create a Circle",
                desc: "Define contribution amount, cycle period, and member capacity for your pool.",
                animationPath: "/animation/loading circle.json"
              },
              {
                step: "02",
                title: "Members Join",
                desc: "Verified participants join the circle and the smart contract locks the settings.",
                animationPath: "/animation/loading.json"
              },
              {
                step: "03",
                title: "Contribute",
                desc: "Members deposit stablecoins or XLM into the secure pool each cycle.",
                animationPath: "/animation/Coins drop.json"
              },
              {
                step: "04",
                title: "Receive Payout",
                desc: "One member receives the total pooled funds each cycle until everyone gets paid.",
                animationPath: "/animation/Crypto Wallet.json"
              }
            ].map((item, index) => (
              <RevealOnScroll key={index} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Step Number Badge - Center on Desktop */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 hidden md:flex font-bold text-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                  {item.step}
                </div>

                {/* Left Side (Text or Image depending on index) */}
                <div className="flex-1 w-full text-center md:text-left">
                  <div className={`flex flex-col gap-4 ${index % 2 !== 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                    <div className="md:hidden text-4xl font-bold text-primary mb-2 mx-auto">{item.step}</div>
                    <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-md">{item.desc}</p>
                  </div>
                </div>

                {/* Right Side (Image or Text depending on index) */}
                <div className="flex-1 w-full flex justify-center md:justify-end">
                  <div className={`relative w-full max-w-xs aspect-square flex items-center justify-center ${index % 2 !== 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}>
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl transform scale-150 animate-pulse" />
                    <AnimationCard
                      step=""
                      title=""
                      desc=""
                      animationPath={item.animationPath}
                      // Override standard card style to be just the lottie
                      className="!p-0 !bg-transparent !border-0"
                      simplified={true}
                    />
                  </div>
                </div>

              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* Stats Section - Redesigned to match How-To style */}
        <section className="relative z-10 py-24 container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Protocol Statistics</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time metrics from the Stellar network
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Connecting Line - visible on mobile too */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-primary/20 -translate-x-1/2" />

            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {[
                { value: protocolStats.totalValueLocked, label: "Total Value Locked", icon: "💰" },
                { value: protocolStats.activeCircles, label: "Active Circles", icon: "🔄" },
                { value: protocolStats.totalPayouts, label: "Total Payouts", icon: "💸" },
                { value: protocolStats.settlementTime, label: "Settlement Time", icon: "⚡" }
              ].map((stat, index) => (
                <RevealOnScroll key={index}>
                  <div className="group relative p-4 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                    <div className="absolute -top-2 -right-2 text-5xl md:text-8xl opacity-5 group-hover:opacity-10 transition-opacity select-none">{stat.icon}</div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 text-center">
                      <div className="text-2xl md:text-5xl font-bold text-white group-hover:text-primary transition-colors duration-500 mb-1 md:mb-2">{stat.value}</div>
                      <div className="text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Active Liquidity Pools - Redesigned Header */}
        <section className="relative z-10 py-24 overflow-hidden">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Active Savings Circles</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join a savings circle and start growing your wealth together
              </p>
            </div>
            <div className="flex justify-center mb-8">
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="rounded-full border-primary/30 text-white hover:bg-primary/10 hover:text-primary hover:border-primary transition-all px-8">
                  View All Circles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
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

        {/* On-Chain Transparency - Redesigned */}
        <section className="relative z-10 py-24 container overflow-hidden">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">On-Chain Transparency</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time stream of all protocol interactions. Verified and secured by the Stellar network.
            </p>
            <div className="flex justify-center mt-6">
              <div className="inline-flex items-center gap-2 text-sm text-primary px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Live Feed Active
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-8 mb-8 md:mb-12 max-w-4xl mx-auto">
            <RevealOnScroll>
              <div className="p-3 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all text-center">
                <div className="text-xl md:text-4xl font-mono text-white font-bold mb-1 md:mb-2">1,240</div>
                <div className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-wide">TPS</div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="p-3 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all text-center">
                <div className="text-xl md:text-4xl font-mono text-primary font-bold mb-1 md:mb-2">99.9%</div>
                <div className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-wide">Uptime</div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="p-3 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all text-center">
                <div className="text-xl md:text-4xl font-mono text-white font-bold mb-1 md:mb-2">~4s</div>
                <div className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-wide">Block</div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Transaction Feed */}
          <div className="max-w-5xl mx-auto px-4 md:px-0">
            <Card className="bg-black/40 border-white/5 backdrop-blur-xl overflow-hidden relative h-[350px] md:h-[500px]">
              {/* Table Header - Static */}
              <div className="grid grid-cols-3 md:grid-cols-5 p-3 md:p-4 border-b border-white/10 bg-black/40 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-muted-foreground z-20 relative">
                <div className="col-span-1">Entity</div>
                <div className="col-span-1 hidden md:block">Action</div>
                <div className="col-span-1 hidden md:block">Time</div>
                <div className="col-span-1 text-right">Volume</div>
                <div className="col-span-1 text-right">Status</div>
              </div>

              {/* Gradient Mask at Bottom */}
              <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>

              {/* Ticker Content */}
              <div className="overflow-hidden h-full relative">
                <div className="animate-marquee-vertical hover:[animation-play-state:paused] flex flex-col">
                  {tickerOperations.map((op, i) => (
                    <div key={`${op.id}-${i}`} className="grid grid-cols-3 md:grid-cols-5 p-3 md:p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center">
                      <div className="col-span-1 font-mono text-xs md:text-sm text-white truncate">{op.entity}</div>
                      <div className="col-span-1 text-white text-sm hidden md:block">{op.action}</div>
                      <div className="col-span-1 text-muted-foreground text-xs hidden md:block">{op.timestamp}</div>
                      <div className="col-span-1 text-right font-mono font-medium text-white text-xs md:text-sm">{op.volume}</div>
                      <div className="col-span-1 text-right flex justify-end">
                        <StatusBadge status={op.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Features Section - Redesigned to match How-To style */}
        <section className="relative z-10 py-16 md:py-24 container overflow-hidden">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Why Choose Action Wave</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Built for security, community, and speed on the Stellar network
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto flex flex-col gap-16 md:gap-32">
            {/* Vertical Connecting Line - visible on both */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-primary/20 -translate-x-1/2" />

            {[
              {
                icon: Shield,
                step: "01",
                title: "Trustless Security",
                desc: "Smart contracts ensure your funds are always secure with automated escrow and collateral management. No intermediaries, no trust required.",
                highlight: "100% Non-Custodial"
              },
              {
                icon: Users,
                step: "02",
                title: "Community Driven",
                desc: "Join verified savings circles with like-minded members and build trust through on-chain reputation. Transparent member verification.",
                highlight: "On-Chain Reputation"
              },
              {
                icon: Clock,
                step: "03",
                title: "Instant Settlements",
                desc: "Powered by Stellar's fast finality, receive your payouts in seconds with minimal transaction fees. No waiting, no delays.",
                highlight: "< 5 Second Finality"
              }
            ].map((feature, index) => (
              <RevealOnScroll key={index} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Step Number Badge - visible on both */}
                <div className="absolute left-1/2 top-4 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 font-bold text-primary text-sm md:text-base shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                  {feature.step}
                </div>

                {/* Text Side */}
                <div className="flex-1 w-full text-center md:text-left">
                  <div className={`flex flex-col gap-2 md:gap-4 items-center ${index % 2 !== 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                    <h3 className="text-xl md:text-3xl font-bold text-white">{feature.title}</h3>
                    <p className="text-sm md:text-lg text-muted-foreground leading-relaxed max-w-md px-4 md:px-0">{feature.desc}</p>
                    <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium">
                      {feature.highlight}
                    </div>
                  </div>
                </div>

                {/* Icon Side - smaller on mobile */}
                <div className="flex-1 w-full flex justify-center order-first pt-12 md:pt-0 md:order-none">
                  <div className={`relative w-24 h-24 md:w-48 md:h-48 flex items-center justify-center ${index % 2 !== 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}>
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl md:blur-3xl transform scale-150 animate-pulse" />
                    <div className="relative h-14 w-14 md:h-24 md:w-24 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                      <feature.icon className="h-7 w-7 md:h-12 md:w-12 text-primary" />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div >
  );
};

export default Index;
