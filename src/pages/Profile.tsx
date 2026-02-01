import { Copy, ExternalLink, Calendar, Award, Zap, Crown, Trophy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { profileData } from "@/data/mockData";

const Profile = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Map badge icons
  const badgeIcons: Record<string, React.ReactNode> = {
    "⚡": <Zap className="h-5 w-5" />,
    "👑": <Crown className="h-5 w-5" />,
    "🏆": <Trophy className="h-5 w-5" />,
    "✓": <CheckCircle2 className="h-5 w-5" />,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="bg-card border-border mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src={profileData.avatar} />
                  <AvatarFallback className="text-2xl">{profileData.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-foreground">{profileData.name}</h1>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {profileData.tier}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-mono text-muted-foreground">{profileData.walletAddress}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(profileData.walletAddress)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Member since {profileData.memberSince}
                    </div>
                  </div>
                </div>

                <Button variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on Explorer
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Performance Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-card border-border">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-foreground">{profileData.stats.onTimeRate}</div>
                    <div className="text-sm text-muted-foreground mt-1">On-Time Rate</div>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-foreground">{profileData.stats.circleCycles}</div>
                    <div className="text-sm text-muted-foreground mt-1">Circle Cycles</div>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-foreground">{profileData.stats.totalVolume}</div>
                    <div className="text-sm text-muted-foreground mt-1">Total Volume</div>
                  </CardContent>
                </Card>
              </div>

              {/* On-Chain History */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">On-Chain History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Type</TableHead>
                        <TableHead className="text-muted-foreground">Circle</TableHead>
                        <TableHead className="text-muted-foreground">Date</TableHead>
                        <TableHead className="text-muted-foreground text-right">Amount</TableHead>
                        <TableHead className="text-muted-foreground text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profileData.history.map((item) => (
                        <TableRow key={item.id} className="border-border">
                          <TableCell className="text-foreground">{item.type}</TableCell>
                          <TableCell className="text-foreground">{item.circle}</TableCell>
                          <TableCell className="text-muted-foreground">{item.date}</TableCell>
                          <TableCell className="text-right font-medium text-foreground">{item.amount}</TableCell>
                          <TableCell className="text-right">
                            <StatusBadge status={item.status} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Protocol Badges */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Protocol Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {profileData.badges.map((badge) => (
                      <div 
                        key={badge.id} 
                        className="p-4 rounded-lg bg-secondary border border-border text-center"
                      >
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">
                          {badgeIcons[badge.icon] || <Award className="h-5 w-5" />}
                        </div>
                        <div className="font-medium text-foreground text-sm">{badge.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{badge.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trust Score Sidebar */}
            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-base">Trust Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative flex items-center justify-center">
                    {/* Circular progress */}
                    <div className="relative h-40 w-40">
                      <svg className="h-40 w-40 -rotate-90" viewBox="0 0 160 160">
                        {/* Background circle */}
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="none"
                          stroke="hsl(var(--secondary))"
                          strokeWidth="12"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="12"
                          strokeLinecap="round"
                          strokeDasharray={`${(profileData.trustScore / 1000) * 440} 440`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold text-foreground">{profileData.trustScore}</div>
                        <div className="text-xs text-muted-foreground">out of 1000</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Payment History</span>
                      <span className="text-primary">Excellent</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Circle Participation</span>
                      <span className="text-primary">High</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Identity Verified</span>
                      <span className="text-primary">Yes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="text-sm font-medium text-foreground mb-1">Improve Your Score</div>
                <p className="text-xs text-muted-foreground">
                  Complete more circles on time and maintain consistent participation to increase your trust score.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
