import { useState } from "react";
import { ChevronRight, Info, FileText, Zap, Wallet } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProtocol } from "@/components/providers/ProtocolProvider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

const CreateCircle = () => {
  const [memberThreshold, setMemberThreshold] = useState([8]);
  const [distributionAlgorithm, setDistributionAlgorithm] = useState("randomized");
  const [activeTab, setActiveTab] = useState("configuration");

  // Form State
  const [identifier, setIdentifier] = useState("");
  const [contributionAmount, setContributionAmount] = useState("");
  const [cyclePeriod, setCyclePeriod] = useState("monthly");

  const { createCircle } = useProtocol();
  const navigate = useNavigate();

  const handleDeploy = async () => {
    await createCircle({
      name: identifier,
      contributionAmount: contributionAmount,
      cyclePeriod: cyclePeriod,
      memberCount: 1, // Creator starts as 1st member
      maxMembers: memberThreshold[0],
    });
    navigate('/dashboard');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background font-sans selection:bg-primary/30">
        <DashboardSidebar />

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 sm:gap-4 text-sm text-muted-foreground/60 mb-8">
            <SidebarTrigger className="md:hidden text-foreground" />
            <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Create Circle</span>
          </div>

          <div className="max-w-6xl">
            <div className="mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Create Savings Circle</h1>
              <p className="text-muted-foreground mt-3 text-lg">Configure your new decentralized savings circle</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <TabsList className="bg-white/5 border border-white/10 p-1 h-12 w-full sm:w-auto overflow-visible">
                      <TabsTrigger value="configuration" className="data-[state=active]:bg-primary data-[state=active]:text-black text-xs sm:text-sm h-10 px-6 rounded-md transition-all">
                        Configuration
                      </TabsTrigger>
                      <TabsTrigger value="governance" className="data-[state=active]:bg-primary data-[state=active]:text-black text-xs sm:text-sm h-10 px-6 rounded-md transition-all">
                        Governance
                      </TabsTrigger>
                      <TabsTrigger value="deploy" className="data-[state=active]:bg-primary data-[state=active]:text-black text-xs sm:text-sm h-10 px-6 rounded-md transition-all">
                        Deploy
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="configuration" className="space-y-6">
                    <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
                      <CardHeader className="border-b border-white/5 pb-6">
                        <CardTitle className="text-xl text-white">Circle Configuration</CardTitle>
                        <CardDescription className="text-muted-foreground">Set the basic parameters for your savings circle</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-8 pt-8">
                        {/* Circle Identifier */}
                        <div className="space-y-3">
                          <Label htmlFor="identifier" className="text-white font-medium">Circle Identifier</Label>
                          <Input
                            id="identifier"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            placeholder="e.g., monthly-savings-q1-2024"
                            className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 h-12 focus-visible:ring-primary/50 transition-all"
                          />
                          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <Info className="h-3.5 w-3.5" />
                            Unique identifier for your circle on-chain
                          </p>
                        </div>

                        {/* Periodic Contribution */}
                        <div className="space-y-3">
                          <Label htmlFor="contribution" className="text-white font-medium">Periodic Contribution Amount</Label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">$</span>
                            <Input
                              id="contribution"
                              type="number"
                              value={contributionAmount}
                              onChange={(e) => setContributionAmount(e.target.value)}
                              placeholder="500"
                              className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 pl-8 h-12 font-mono text-lg focus-visible:ring-primary/50 transition-all"
                            />
                          </div>
                        </div>

                        {/* Cycle Epoch */}
                        <div className="space-y-3">
                          <Label className="text-white font-medium">Cycle Epoch</Label>
                          <Select value={cyclePeriod} onValueChange={setCyclePeriod}>
                            <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 focus:ring-primary/50">
                              <SelectValue placeholder="Select cycle duration" />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-white/10 text-white">
                              <SelectItem value="weekly" className="focus:bg-primary/20 focus:text-white">Weekly (7 days)</SelectItem>
                              <SelectItem value="biweekly" className="focus:bg-primary/20 focus:text-white">Bi-weekly (14 days)</SelectItem>
                              <SelectItem value="monthly" className="focus:bg-primary/20 focus:text-white">Monthly (30 days)</SelectItem>
                              <SelectItem value="quarterly" className="focus:bg-primary/20 focus:text-white">Quarterly (90 days)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Member Threshold */}
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <Label className="text-white font-medium">Member Threshold</Label>
                            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{memberThreshold[0]} members</span>
                          </div>
                          <Slider
                            value={memberThreshold}
                            onValueChange={setMemberThreshold}
                            min={4}
                            max={20}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider">
                            <span>4 min</span>
                            <span>20 max</span>
                          </div>
                        </div>

                        {/* Distribution Algorithm */}
                        <div className="space-y-4">
                          <Label className="text-white font-medium">Distribution Algorithm</Label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                              onClick={() => setDistributionAlgorithm("randomized")}
                              className={`group relative p-6 rounded-xl border text-left transition-all duration-300 ${distributionAlgorithm === "randomized"
                                ? "border-primary bg-primary/10"
                                : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                                }`}
                            >
                              <Zap className={`h-6 w-6 mb-4 ${distributionAlgorithm === "randomized" ? "text-primary fill-primary/20" : "text-muted-foreground group-hover:text-white"
                                }`} />
                              <div className={`font-semibold text-lg ${distributionAlgorithm === "randomized" ? "text-primary" : "text-white"
                                }`}>Randomized</div>
                              <div className="text-sm text-muted-foreground mt-2 leading-relaxed">
                                Fair lottery-based selection each cycle
                              </div>
                            </button>

                            <button
                              onClick={() => setDistributionAlgorithm("sequential")}
                              className={`group relative p-6 rounded-xl border text-left transition-all duration-300 ${distributionAlgorithm === "sequential"
                                ? "border-primary bg-primary/10"
                                : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                                }`}
                            >
                              <div className={`h-6 w-6 mb-4 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold ${distributionAlgorithm === "sequential" ? "border-primary text-primary" : "border-muted-foreground text-muted-foreground group-hover:border-white group-hover:text-white"
                                }`}>1</div>
                              <div className={`font-semibold text-lg ${distributionAlgorithm === "sequential" ? "text-primary" : "text-white"
                                }`}>Sequential</div>
                              <div className="text-sm text-muted-foreground mt-2 leading-relaxed">
                                First-come, first-served order
                              </div>
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-end pt-4">
                      <Button
                        onClick={() => setActiveTab("governance")}
                        className="bg-primary text-black hover:bg-primary/90 h-12 px-8 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                      >
                        Continue to Governance
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="governance">
                    <Card className="bg-card/50 border-white/10 backdrop-blur-sm min-h-[400px] flex items-center justify-center">
                      <CardContent className="text-center text-muted-foreground">
                        <div className="h-16 w-16 rounded-full bg-white/5 mx-auto mb-6 flex items-center justify-center">
                          <FileText className="h-8 w-8 opacity-50" />
                        </div>
                        <p className="text-lg">Governance configuration coming in next phase...</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="deploy">
                    <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
                      <CardHeader className="border-b border-white/5 pb-6">
                        <CardTitle className="text-xl text-white">Review & Deploy</CardTitle>
                        <CardDescription className="text-muted-foreground">Finalize your circle configuration before deployment</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-8 pt-8">
                        <div className="space-y-4">
                          <div className="flex justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                            <span className="text-muted-foreground">Identifier</span>
                            <span className="text-white font-mono">{identifier || "N/A"}</span>
                          </div>
                          <div className="flex justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                            <span className="text-muted-foreground">Contribution</span>
                            <span className="text-white font-mono">${contributionAmount || "0"}</span>
                          </div>
                          <div className="flex justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                            <span className="text-muted-foreground">Cycle Period</span>
                            <span className="text-white capitalize">{cyclePeriod}</span>
                          </div>
                          <div className="flex justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                            <span className="text-muted-foreground">Members</span>
                            <span className="text-white font-mono">{memberThreshold[0]}</span>
                          </div>
                        </div>

                        <Button
                          onClick={handleDeploy}
                          disabled={!identifier || !contributionAmount}
                          className="w-full bg-primary text-black hover:bg-primary/90 h-14 text-lg font-bold shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all"
                        >
                          <Zap className="mr-2 h-5 w-5" />
                          Deploy to Stellar Network
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar Panels */}
              <div className="space-y-6">
                {/* Protocol Summary */}
                <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-base text-white">Protocol Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm py-2 border-b border-white/5">
                      <span className="text-muted-foreground">Contribution</span>
                      <span className="font-medium text-white font-mono">$500/month</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-white/5">
                      <span className="text-muted-foreground">Members</span>
                      <span className="font-medium text-white font-mono">{memberThreshold[0]}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-white/5">
                      <span className="text-muted-foreground">Target Payout</span>
                      <span className="font-medium text-primary font-mono">${500 * memberThreshold[0]}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2">
                      <span className="text-muted-foreground">Algorithm</span>
                      <span className="font-medium text-white capitalize">{distributionAlgorithm}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Collateral Requirement */}
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 backdrop-blur-sm">
                  <CardHeader className="pb-3 px-6 pt-6">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      <CardTitle className="text-base text-white">Collateral Requirement</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-2">
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Each member must lock collateral equal to one contribution period to join the circle.
                    </p>
                    <div className="p-4 rounded-xl bg-black/20 border border-primary/20 backdrop-blur-sm flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-white font-mono">$500</div>
                        <div className="text-xs text-primary/80 font-medium">Required Collateral</div>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Documentation */}
                <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">Protocol Documentation</div>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                          Learn more about circle mechanics and smart contract specifications.
                        </p>
                        <a
                          href="https://developers.stellar.org/docs/build/apps/savings-circle"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-3 text-primary text-xs hover:text-primary/80 transition-colors"
                        >
                          Read the docs →
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CreateCircle;
