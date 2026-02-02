import { ChevronRight, Lock, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { circleDetails } from "@/data/mockData";

const CircleDetails = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <main className="flex-1 p-4 md:p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 sm:gap-4 text-sm text-muted-foreground mb-6">
            <SidebarTrigger className="md:hidden" />
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/dashboard" className="hover:text-foreground transition-colors hidden sm:inline">Savings Circles</Link>
            <ChevronRight className="h-4 w-4 hidden sm:block" />
            <span className="text-foreground truncate">{circleDetails.name}</span>
          </div>

          <div className="max-w-6xl">
            {/* Circle Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <StatusBadge status={circleDetails.status} />
                <span className="text-xs sm:text-sm text-muted-foreground font-mono break-all">
                  {circleDetails.smartContractId}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{circleDetails.name}</h1>
              <p className="text-muted-foreground mt-2">
                Target Payout: <span className="text-primary font-semibold">{circleDetails.targetPayout}</span>
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Circle Info */}
                <Card className="bg-card border-border">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                      <div>
                        <div className="text-sm text-muted-foreground">Contribution</div>
                        <div className="text-xl font-bold text-foreground mt-1">{circleDetails.contribution}</div>
                        <div className="text-xs text-muted-foreground">per cycle</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Cycle Length</div>
                        <div className="text-xl font-bold text-foreground mt-1">{circleDetails.cycleLength}</div>
                        <div className="text-xs text-muted-foreground">duration</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Quorum</div>
                        <div className="text-xl font-bold text-foreground mt-1">{circleDetails.quorum}</div>
                        <div className="text-xs text-muted-foreground">required</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Protocol Timeline */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Protocol Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {circleDetails.phases.map((phase, index) => (
                        <div key={index} className="flex items-center gap-3 sm:gap-4">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                            phase.status === "completed" 
                              ? "bg-primary/20" 
                              : phase.status === "active" 
                              ? "bg-primary" 
                              : "bg-secondary"
                          }`}>
                            {phase.status === "completed" ? (
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                            ) : phase.status === "active" ? (
                              <Clock className="h-5 w-5 text-primary-foreground" />
                            ) : (
                              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-foreground truncate">{phase.name}</div>
                            <div className="text-sm text-muted-foreground">{phase.date}</div>
                          </div>
                          <StatusBadge status={phase.status} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Verified Participants */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Verified Participants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      {circleDetails.participants.map((participant) => (
                        <div key={participant.id} className="flex items-center gap-2 p-2 rounded-lg bg-secondary">
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={participant.avatar} />
                              <AvatarFallback>{participant.name[0]}</AvatarFallback>
                            </Avatar>
                            {participant.verified && (
                              <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-primary flex items-center justify-center">
                                <CheckCircle2 className="h-2.5 w-2.5 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-medium text-foreground">{participant.name}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 p-2 rounded-lg border border-dashed border-border">
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">+5</span>
                        </div>
                        <span className="text-sm text-muted-foreground">spots available</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Commitment Protocol Sidebar */}
              <div className="space-y-6">
                {/* Monthly Contribution */}
                <Card className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Monthly Contribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">{circleDetails.contribution}</div>
                    <div className="text-sm text-muted-foreground mt-1">per month</div>
                  </CardContent>
                </Card>

                {/* Required Collateral */}
                <Card className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Required Collateral</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{circleDetails.collateralRequired}</div>
                    <div className="text-sm text-muted-foreground mt-1">to be locked</div>
                  </CardContent>
                </Card>

                {/* Collateral Status */}
                <Card className="bg-secondary/50 border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Collateral Status</div>
                        <div className="text-sm text-muted-foreground">Not yet locked</div>
                      </div>
                    </div>
                    <Link to="/dashboard">
                      <Button className="w-full" size="lg">
                        <Lock className="mr-2 h-4 w-4" />
                        Lock Collateral & Join Circle
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Info Box */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-xs text-muted-foreground">
                    Your collateral will be automatically released when you complete all cycle payments or when the circle concludes successfully.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CircleDetails;
