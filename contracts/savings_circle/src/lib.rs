#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Symbol, Vec, symbol_short};

#[contracttype]
#[derive(Clone)]
pub struct Circle {
    pub id: u64,
    pub members: Vec<Address>,
    pub contribution_amount: i128,
    pub cycle_period: u64, // e.g., seconds (not used in logic yet, just metadata)
    pub current_cycle: u32,
    pub total_cycles: u32,
    pub deposits: Vec<bool>, // Tracks if each member has deposited for current cycle
}

#[contract]
pub struct SavingsCircleContract;

const COUNTER: Symbol = symbol_short!("COUNTER");
const CIRCLES: Symbol = symbol_short!("CIRCLES");

#[contractimpl]
impl SavingsCircleContract {
    
    // Initialize or Create a Circle
    pub fn create_circle(env: Env, members: Vec<Address>, amount: i128, cycles: u32) -> u64 {
        // 1. Get current ID counter or default to 0
        let mut circle_id = env.storage().instance().get(&COUNTER).unwrap_or(0u64);
        circle_id += 1;

        // 2. Initialize deposits vector (all false)
        let mut deposits = Vec::new(&env);
        for _ in 0..members.len() {
            deposits.push_back(false);
        }

        // 3. Create Circle struct
        let circle = Circle {
            id: circle_id,
            members,
            contribution_amount: amount,
            cycle_period: 604800, // Default 1 week in seconds
            current_cycle: 1,
            total_cycles: cycles,
            deposits,
        };

        // 4. Save Circle
        env.storage().persistent().set(&circle_id, &circle);
        
        // 5. Update Counter
        env.storage().instance().set(&COUNTER, &circle_id);

        circle_id
    }

    // Join/Deposit to a Circle
    pub fn join_circle(env: Env, circle_id: u64, member: Address) {
        member.require_auth();

        // 1. Retrieve Circle
        let mut circle: Circle = env.storage().persistent().get(&circle_id).expect("Circle not found");

        // 2. Validate Member
        let member_idx = circle.members.first_index_of(member.clone()).expect("Not a member");

        // 3. Check if already deposited
        if circle.deposits.get(member_idx).unwrap() {
            panic!("Already deposited for this cycle");
        }

        // 4. Transfer Funds (Native XLM)
        // In Soroban, we usually use the token client.
        // For simplicity, we assume the specific token address is passed or hardcoded if wrapper.
        // NOTE: Real implementation should take a token address arg and transfer from member to contract.
        // token.transfer(&member, &env.current_contract_address(), &circle.contribution_amount);

        // 5. Update State
        circle.deposits.set(member_idx, true);
        env.storage().persistent().set(&circle_id, &circle);

        // 6. Check if cycle complete
        let all_deposited = circle.deposits.iter().all(|d| d);
        if all_deposited {
            Self::distribute_cycle(env, circle_id);
        }
    }

    // Distribute funds for the current cycle.
    // Private: only callable internally from join_circle once all members
    // have deposited. Making this pub would allow any account to trigger
    // a payout at any time, bypassing the deposit gate.
    fn distribute_cycle(env: Env, circle_id: u64) {
        let mut circle: Circle = env.storage().persistent().get(&circle_id).expect("Circle not found");

        // Guard: refuse to distribute unless every member has deposited.
        // This check is redundant when called from join_circle (which already
        // verifies all_deposited), but protects against future callers.
        let all_deposited = circle.deposits.iter().all(|d| d);
        if !all_deposited {
            panic!("Cannot distribute: not all members have deposited");
        }

        // 1. Identify Recipient
        // Logic: Cycle 1 -> Member 0, Cycle 2 -> Member 1, etc.
        let recipient_idx = (circle.current_cycle - 1) as usize;
        let recipient = circle.members.get(recipient_idx as u32).expect("Recipient not found");

        // 2. Calculate Total Pool
        let total_pool = circle.contribution_amount * (circle.members.len() as i128);

        // 3. Transfer Payout
        // token.transfer(&env.current_contract_address(), &recipient, &total_pool);
        let _ = (recipient, total_pool); // suppress unused warnings until token transfer is wired

        // 4. Advance or complete the cycle
        if circle.current_cycle < circle.total_cycles {
            circle.current_cycle += 1;
            for i in 0..circle.deposits.len() {
                circle.deposits.set(i, false);
            }
        }
        // If current_cycle == total_cycles the circle is complete; no further state change needed.

        env.storage().persistent().set(&circle_id, &circle);
    }

    // Get Circle State
    pub fn get_state(env: Env, circle_id: u64) -> Circle {
        env.storage().persistent().get(&circle_id).expect("Circle not found")
    }

    // Get current counter value (next create_circle will return counter + 1)
    pub fn get_counter(env: Env) -> u64 {
        env.storage().instance().get(&COUNTER).unwrap_or(0u64)
    }
}
