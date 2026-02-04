class BankAccount {
    constructor(accountNumber, holderName, balance = 0) {
        this.accountNumber = accountNumber;
        this.holderName = holderName;
        this.balance = balance;
    }

    deposit(amount) {
        if (amount <= 0) return "❌ Deposit amount must be positive.";
        this.balance += amount;
        return `✅ Deposited $${amount}. Current Balance: $${this.balance}`;
    }

    withdraw(amount) {
        if (amount <= 0) return "❌ Withdrawal amount must be positive.";
        if (amount > this.balance) return "❌ Insufficient balance.";
        this.balance -= amount;
        return `✅ Withdrawn $${amount}. Current Balance: $${this.balance}`;
    }

    getBalance() {
        return this.balance;
    }
}

// DOM Elements
const createBtn = document.getElementById("createAccount");
const depositBtn = document.getElementById("deposit");
const withdrawBtn = document.getElementById("withdraw");
const accountFormContainer = document.getElementById("accountFormContainer");
const accountActions = document.getElementById("accountActions");
const accountInfoSpan = document.getElementById("accountInfo");
const balanceSpan = document.getElementById("balance");
const amountInput = document.getElementById("amount");
const messages = document.getElementById("messages");

let account;

// Event Listeners
createBtn.addEventListener("click", () => {
    const accountNumber = document.getElementById("accountNumber").value.trim();
    const holderName = document.getElementById("holderName").value.trim();

    if (!accountNumber || !holderName) {
        messages.textContent = "❌ Please enter all fields.";
        return;
    }

    account = new BankAccount(accountNumber, holderName);
    messages.textContent = `✅ Account created for ${holderName}.`;
    accountInfoSpan.textContent = `${holderName} (${accountNumber})`;
    balanceSpan.textContent = account.getBalance();
    accountFormContainer.classList.add("hidden");
    accountActions.classList.remove("hidden");
});

depositBtn.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount)) {
        messages.textContent = "❌ Enter a valid amount.";
        return;
    }
    messages.textContent = account.deposit(amount);
    balanceSpan.textContent = account.getBalance();
    amountInput.value = "";
});

withdrawBtn.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount)) {
        messages.textContent = "❌ Enter a valid amount.";
        return;
    }
    messages.textContent = account.withdraw(amount);
    balanceSpan.textContent = account.getBalance();
    amountInput.value = "";
});
