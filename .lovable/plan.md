

# Action Wave - Implementation Plan

## Overview
A frontend web application for a decentralized savings protocol (ROSCA) built on Stellar blockchain. Dark theme with emerald green (#10B981) accents throughout.

---

## Phase 1: Foundation & Design System

### Global Setup
- Dark theme color palette (near-black backgrounds, gray cards, green accents)
- Typography system matching the designs
- Reusable card components with subtle borders
- Button variants (primary green, outline, ghost)
- Status badges (CONFIRMED, VALIDATED, PROCESSED, etc.)

### Layout Components
- **Header/Navigation** - Logo, nav links, search, network status badge, user avatar
- **Sidebar** (for dashboard views) - Dashboard, Savings Circles, Wallet, Transactions
- **Footer** - Protocol links, network info, legal links

---

## Phase 2: Landing Page

- Hero section with "DECENTRALIZED SAVINGS PROTOCOL" headline
- "Powered by Stellar Mainnet" badge
- Call-to-action buttons (Join Network, Explore Protocol)
- Protocol statistics bar (Total Value Locked, Active Circles, Total Payouts, Settlement Time)
- Active Liquidity Pools section with pool cards showing:
  - Pool name, status badge, contribution amounts, member capacity
  - "Join Circle" buttons
- On-Chain Transparency section with live operations feed
- Footer with protocol/network/community links

---

## Phase 3: Create Circle Page

- Sidebar navigation layout
- Multi-step wizard tabs (Configuration, Governance, Deploy)
- Configuration form:
  - Circle identifier input
  - Periodic contribution amount
  - Cycle epoch dropdown
  - Member threshold slider
  - Distribution algorithm selection (Randomized/Sequential)
- Protocol Summary sidebar panel
- Collateral Requirement info card
- Documentation section with link to protocol specs

---

## Phase 4: Circle Details Page

- Breadcrumb navigation
- Circle header with status badge, name, target payout
- Circle info (contribution, cycle length, quorum)
- Protocol Timeline with enrollment phases
- Commitment Protocol sidebar:
  - Monthly contribution card
  - Required collateral card
  - Collateral locked status
  - "Lock Collateral & Join Circle" CTA button
- Verified Participants section with avatars

---

## Phase 5: Dashboard (Monthly Savings Pool)

- Pool header with smart contract ID
- Your Status card (contributed amount, next payment, coverage progress)
- Payout Protocol sidebar with logic description
- Distribution Timeline with monthly phases and member avatars
- Transaction Ledger table (entity, action, timestamp, volume, verification status)

---

## Phase 6: Payout Success Page

- Success checkmark icon
- "Payout Successful" heading
- Total Payout Amount card with released badge
- Initial payout vs remaining balance breakdown with progress bars
- Collateral Released card
- Transaction Hash with copy/external link buttons
- Action buttons (View Ledger Details, Return to Home)

---

## Phase 7: My Profile Page

- Full navigation header with search
- User profile header (avatar, name, wallet address, membership date, tier)
- Trust Score circular visualization (850 score)
- Performance stats cards (On-Time Rate, Circle Cycles, Volume)
- On-Chain History table with transaction records
- Protocol Badges section (Early Payer, Circle Leader, 3-Year Node, Identity Verified)

---

## Routing Structure
```
/ → Landing Page
/create-circle → Create Circle Wizard
/circle/:id → Circle Details
/dashboard → Monthly Savings Pool Dashboard
/payout-success → Payout Confirmation
/profile → My Profile
```

---

## Mock Data
All screens will use realistic mock data matching the designs:
- User profiles with avatars
- Transaction histories with timestamps
- Pool/circle statistics
- Wallet addresses (truncated format)

