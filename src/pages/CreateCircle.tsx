import { useState } from "react";
import { ChevronRight, Info, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

const CreateCircle = () => {
  const [memberThreshold, setMemberThreshold] = useState([8]);
  const [distributionAlgorithm, setDistributionAlgorithm] = useState("randomized");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <main className="flex-1 p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Create Circle</span>
          </div>

          <div className="max-w-6xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Create Savings Circle</h1>
              <p className="text-muted-foreground mt-2">Configure your new decentralized savings circle</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="configuration" className="space-y-6">
                  <TabsList className="bg-secondary border border-border">
                    <TabsTrigger value="configuration" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Configuration
                    </TabsTrigger>
                    <TabsTrigger value="governance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Governance
                    </TabsTrigger>
                    <TabsTrigger value="deploy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Deploy
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="configuration" className="space-y-6">
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-lg">Circle Configuration</CardTitle>
                        <CardDescription>Set the basic parameters for your savings circle</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Circle Identifier */}
                        <div className="space-y-2">
                          <Label htmlFor="identifier">Circle Identifier</Label>
                          <Input 
                            id="identifier" 
                            placeholder="e.g., monthly-savings-q1-2024"
                            className="bg-secondary border-border"
                          />
                          <p className="text-xs text-muted-foreground">
                            Unique identifier for your circle on-chain
                          </p>
                        </div>

                        {/* Periodic Contribution */}
                        <div className="space-y-2">
                          <Label htmlFor="contribution">Periodic Contribution Amount</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <Input 
                              id="contribution" 
                              type="number"
                              placeholder="500"
                              className="bg-secondary border-border pl-7"
                            />
                          </div>
                        </div>

                        {/* Cycle Epoch */}
                        <div className="space-y-2">
                          <Label>Cycle Epoch</Label>
                          <Select defaultValue="monthly">
                            <SelectTrigger className="bg-secondary border-border">
                              <SelectValue placeholder="Select cycle duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="weekly">Weekly (7 days)</SelectItem>
                              <SelectItem value="biweekly">Bi-weekly (14 days)</SelectItem>
                              <SelectItem value="monthly">Monthly (30 days)</SelectItem>
                              <SelectItem value="quarterly">Quarterly (90 days)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Member Threshold */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label>Member Threshold</Label>
                            <span className="text-sm font-medium text-primary">{memberThreshold[0]} members</span>
                          </div>
                          <Slider
                            value={memberThreshold}
                            onValueChange={setMemberThreshold}
                            min={4}
                            max={20}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>4 min</span>
                            <span>20 max</span>
                          </div>
                        </div>

                        {/* Distribution Algorithm */}
                        <div className="space-y-3">
                          <Label>Distribution Algorithm</Label>
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              onClick={() => setDistributionAlgorithm("randomized")}
                              className={`p-4 rounded-lg border text-left transition-colors ${
                                distributionAlgorithm === "randomized"
                                  ? "border-primary bg-primary/10"
                                  : "border-border bg-secondary hover:border-muted-foreground"
                              }`}
                            >
                              <div className="font-medium text-foreground">Randomized</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Fair lottery-based selection each cycle
                              </div>
                            </button>
                            <button
                              onClick={() => setDistributionAlgorithm("sequential")}
                              className={`p-4 rounded-lg border text-left transition-colors ${
                                distributionAlgorithm === "sequential"
                                  ? "border-primary bg-primary/10"
                                  : "border-border bg-secondary hover:border-muted-foreground"
                              }`}
                            >
                              <div className="font-medium text-foreground">Sequential</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                First-come, first-served order
                              </div>
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-end">
                      <Button>
                        Continue to Governance
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="governance">
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-lg">Governance Settings</CardTitle>
                        <CardDescription>Define voting and decision-making rules</CardDescription>
                      </CardHeader>
                      <CardContent className="py-12 text-center text-muted-foreground">
                        Governance configuration coming in next phase...
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="deploy">
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-lg">Deploy Circle</CardTitle>
                        <CardDescription>Review and deploy your savings circle</CardDescription>
                      </CardHeader>
                      <CardContent className="py-12 text-center text-muted-foreground">
                        Deployment review coming in next phase...
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar Panels */}
              <div className="space-y-6">
                {/* Protocol Summary */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Protocol Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Contribution</span>
                      <span className="font-medium text-foreground">$500/month</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Members</span>
                      <span className="font-medium text-foreground">{memberThreshold[0]}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Target Payout</span>
                      <span className="font-medium text-primary">${500 * memberThreshold[0]}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Algorithm</span>
                      <span className="font-medium text-foreground capitalize">{distributionAlgorithm}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Collateral Requirement */}
                <Card className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      <CardTitle className="text-base">Collateral Requirement</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Each member must lock collateral equal to one contribution period to join the circle.
                    </p>
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="text-2xl font-bold text-primary">$500</div>
                      <div className="text-xs text-muted-foreground">Required collateral per member</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Documentation */}
                <Card className="bg-card border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">Protocol Documentation</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Learn more about circle mechanics and smart contract specifications.
                        </p>
                        <Button variant="link" className="h-auto p-0 mt-2 text-primary text-xs">
                          Read the docs →
                        </Button>
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
