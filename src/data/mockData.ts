// Mock data for Action Wave application

export const protocolStats = {
  totalValueLocked: "$2.4M",
  activeCircles: "156",
  totalPayouts: "$1.2M",
  settlementTime: "~5 sec",
};

export const liquidityPools = [
  {
    id: "1",
    name: "Monthly Savings Pool",
    status: "active" as const,
    contribution: "$500",
    frequency: "Monthly",
    members: 8,
    maxMembers: 10,
    targetPayout: "$5,000",
  },
  {
    id: "2",
    name: "Weekly Micro-Savings",
    status: "enrolling" as const,
    contribution: "$50",
    frequency: "Weekly",
    members: 12,
    maxMembers: 15,
    targetPayout: "$750",
  },
  {
    id: "3",
    name: "Quarterly Investment Circle",
    status: "active" as const,
    contribution: "$1,000",
    frequency: "Quarterly",
    members: 6,
    maxMembers: 8,
    targetPayout: "$8,000",
  },
];

export const onChainOperations = [
  {
    id: "1",
    entity: "0x7a3d...8f2e",
    action: "Contribution Deposited",
    timestamp: "2 min ago",
    volume: "$500.00",
    status: "confirmed" as const,
  },
  {
    id: "2",
    entity: "0x9b4c...1d3a",
    action: "Circle Joined",
    timestamp: "5 min ago",
    volume: "$250.00",
    status: "validated" as const,
  },
  {
    id: "3",
    entity: "0x2e8f...6c4b",
    action: "Payout Released",
    timestamp: "12 min ago",
    volume: "$5,000.00",
    status: "processed" as const,
  },
  {
    id: "4",
    entity: "0x5d1a...9e7f",
    action: "Collateral Locked",
    timestamp: "18 min ago",
    volume: "$1,000.00",
    status: "confirmed" as const,
  },
];

export const circleDetails = {
  id: "1",
  name: "Monthly Savings Pool",
  status: "enrolling" as const,
  smartContractId: "0x7a3d8f2e...9b4c1d3a",
  contribution: "$500",
  cycleLength: "30 days",
  quorum: "8/10 members",
  targetPayout: "$5,000",
  collateralRequired: "$500",
  phases: [
    { name: "Enrollment Open", date: "Jan 1 - Jan 15", status: "completed" as const },
    { name: "Circle Formation", date: "Jan 16 - Jan 20", status: "active" as const },
    { name: "First Cycle Begins", date: "Jan 21", status: "pending" as const },
  ],
  participants: [
    { id: "1", name: "Alice", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice", verified: true },
    { id: "2", name: "Bob", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob", verified: true },
    { id: "3", name: "Carol", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol", verified: true },
    { id: "4", name: "David", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david", verified: true },
    { id: "5", name: "Eve", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eve", verified: false },
  ],
};

export const dashboardData = {
  poolName: "Monthly Savings Pool",
  smartContractId: "0x7a3d8f2e...9b4c1d3a",
  status: {
    contributed: "$2,500",
    nextPayment: "Jan 25, 2024",
    coverageProgress: 50,
    currentCycle: 5,
    totalCycles: 10,
  },
  timeline: [
    { month: "Jan", member: "Alice", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice", status: "completed" as const },
    { month: "Feb", member: "Bob", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob", status: "completed" as const },
    { month: "Mar", member: "Carol", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol", status: "completed" as const },
    { month: "Apr", member: "David", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david", status: "completed" as const },
    { month: "May", member: "You", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1", status: "active" as const },
    { month: "Jun", member: "Eve", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eve", status: "pending" as const },
  ],
  transactions: [
    {
      id: "1",
      entity: "0x7a3d...8f2e",
      action: "Monthly Contribution",
      timestamp: "Jan 21, 2024 14:32",
      volume: "$500.00",
      status: "confirmed" as const,
    },
    {
      id: "2",
      entity: "0x9b4c...1d3a",
      action: "Monthly Contribution",
      timestamp: "Jan 21, 2024 14:28",
      volume: "$500.00",
      status: "confirmed" as const,
    },
    {
      id: "3",
      entity: "0x2e8f...6c4b",
      action: "Payout Received",
      timestamp: "Jan 20, 2024 09:15",
      volume: "$5,000.00",
      status: "processed" as const,
    },
  ],
};

export const payoutData = {
  totalPayout: "$5,000.00",
  initialPayout: "$4,500.00",
  remainingBalance: "$500.00",
  collateralReleased: "$500.00",
  transactionHash: "0x7a3d8f2e9b4c1d3a5e6f7890abcdef1234567890",
};

export const profileData = {
  name: "Alex Thompson",
  walletAddress: "0x7a3d...8f2e",
  memberSince: "January 2023",
  tier: "Gold Member",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
  trustScore: 850,
  stats: {
    onTimeRate: "98%",
    circleCycles: 24,
    totalVolume: "$48,000",
  },
  history: [
    {
      id: "1",
      type: "Contribution",
      circle: "Monthly Savings Pool",
      date: "Jan 21, 2024",
      amount: "$500.00",
      status: "confirmed" as const,
    },
    {
      id: "2",
      type: "Payout Received",
      circle: "Weekly Micro-Savings",
      date: "Jan 18, 2024",
      amount: "$750.00",
      status: "processed" as const,
    },
    {
      id: "3",
      type: "Circle Joined",
      circle: "Quarterly Investment",
      date: "Jan 15, 2024",
      amount: "$1,000.00",
      status: "confirmed" as const,
    },
  ],
  badges: [
    { id: "1", name: "Early Payer", description: "Always pays before deadline", icon: "⚡" },
    { id: "2", name: "Circle Leader", description: "Created 3+ successful circles", icon: "👑" },
    { id: "3", name: "3-Year Node", description: "Active member for 3 years", icon: "🏆" },
    { id: "4", name: "Identity Verified", description: "KYC verification complete", icon: "✓" },
  ],
};
