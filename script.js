// Navigation
document.querySelectorAll('.nav-link').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all sections and buttons
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button and corresponding section
        button.classList.add('active');
        document.getElementById(`${button.dataset.section}-section`).classList.add('active');
    });
});

// Enhanced Chat Functionality
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-btn');

// Chat context and memory
let chatContext = {
    userName: null,
    lastTopic: null,
    financialGoals: [],
    riskProfile: null,
    investmentPreferences: []
};

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    // Add typing animation for bot messages
    if (!isUser) {
        messageDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        chatMessages.appendChild(messageDiv);
        setTimeout(() => {
            messageDiv.innerHTML = message;
        }, 1000);
    } else {
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
    }
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // First-time user greeting
    if (!chatContext.userName) {
        chatContext.userName = message.split(' ')[0];
        return `Nice to meet you, ${chatContext.userName}! I'm your financial advisor. I can help you with:
        - Investment planning
        - Budget management
        - Loan calculations
        - Market analysis
        - Financial health assessment
        
        What would you like to know about?`;
    }
    
    // Investment related queries
    if (lowerMessage.includes('invest') || lowerMessage.includes('investment')) {
        if (!chatContext.riskProfile) {
            chatContext.lastTopic = 'investment';
            return `Before I provide investment advice, I'd like to understand your risk tolerance:
            1. Conservative (low risk, stable returns)
            2. Moderate (balanced risk and returns)
            3. Aggressive (high risk, potential high returns)
            
            Which profile best describes you?`;
        }
        
        if (lowerMessage.includes('stock') || lowerMessage.includes('market')) {
            return `I can help you analyze stocks. Would you like to:
            1. View market trends
            2. Get stock recommendations based on your risk profile
            3. Learn about different investment strategies
            
            Just let me know what interests you!`;
        }
    }
    
    // Risk profile assessment
    if (chatContext.lastTopic === 'investment' && !chatContext.riskProfile) {
        if (lowerMessage.includes('1') || lowerMessage.includes('conservative')) {
            chatContext.riskProfile = 'conservative';
            return `Great! As a conservative investor, I recommend:
            - High-quality bonds
            - Dividend-paying stocks
            - Index funds
            - Money market accounts
            
            Would you like to know more about any of these options?`;
        } else if (lowerMessage.includes('2') || lowerMessage.includes('moderate')) {
            chatContext.riskProfile = 'moderate';
            return `Perfect! For moderate risk tolerance, consider:
            - Balanced mutual funds
            - Blue-chip stocks
            - Corporate bonds
            - Real estate investment trusts (REITs)
            
            Which of these interests you?`;
        } else if (lowerMessage.includes('3') || lowerMessage.includes('aggressive')) {
            chatContext.riskProfile = 'aggressive';
            return `Excellent! For aggressive investors, I suggest:
            - Growth stocks
            - Sector-specific ETFs
            - International markets
            - Alternative investments
            
            Would you like to explore any of these options?`;
        }
    }
    
    // Budget and savings queries
    if (lowerMessage.includes('budget') || lowerMessage.includes('save') || lowerMessage.includes('saving')) {
        if (!chatContext.financialGoals.length) {
            return `Let's set some financial goals! What are you saving for?
            1. Emergency fund
            2. Retirement
            3. Major purchase (house, car, etc.)
            4. Education
            5. Other
            
            You can choose multiple options.`;
        }
        
        return `Based on your goals, I recommend:
        1. Create a detailed budget using our Budget Planner
        2. Set up automatic savings
        3. Track your expenses
        4. Review and adjust monthly
        
        Would you like to use our Budget Planner tool now?`;
    }
    
    // Loan and mortgage queries
    if (lowerMessage.includes('loan') || lowerMessage.includes('mortgage')) {
        return `I can help you with loan calculations. Would you like to:
        1. Calculate monthly payments
        2. Compare different loan terms
        3. Understand interest rates
        4. Plan for early repayment
        
        Our Loan Calculator can help with all of these. Would you like to try it?`;
    }
    
    // Market analysis queries
    if (lowerMessage.includes('market') || lowerMessage.includes('stock') || lowerMessage.includes('price')) {
        return `I can help you analyze the market. You can:
        1. Search for specific stocks
        2. View market trends
        3. Get price alerts
        4. Analyze historical data
        
        Would you like to search for a specific stock? Just enter the symbol (e.g., AAPL, GOOGL) in the Market Analysis section.`;
    }
    
    // Financial health queries
    if (lowerMessage.includes('health') || lowerMessage.includes('score') || lowerMessage.includes('assessment')) {
        return `I can help you assess your financial health. Our Financial Health Score considers:
        1. Emergency fund adequacy
        2. Savings rate
        3. Debt-to-income ratio
        4. Investment diversification
        
        Would you like to calculate your Financial Health Score?`;
    }
    
    // General queries
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return `Hello ${chatContext.userName}! How can I help you with your finances today?`;
    }
    
    // Default response with context awareness
    return `I understand you're interested in ${chatContext.lastTopic || 'finances'}. I can help you with:
    - Investment planning (${chatContext.riskProfile ? 'tailored to your ' + chatContext.riskProfile + ' profile' : 'based on your risk tolerance'})
    - Budget management
    - Loan calculations
    - Market analysis
    - Financial health assessment
    
    What specific aspect would you like to explore?`;
}

// Add typing animation styles
const style = document.createElement('style');
style.textContent = `
    .typing-indicator {
        display: flex;
        align-items: center;
        gap: 4px;
    }
    
    .typing-indicator span {
        width: 8px;
        height: 8px;
        background: #3498db;
        border-radius: 50%;
        animation: typing 1s infinite ease-in-out;
    }
    
    .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typing {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
`;
document.head.appendChild(style);

sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        
        // Simulate bot thinking
        setTimeout(() => {
            const response = processUserMessage(message);
            addMessage(response);
        }, 1000);
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

// Loan Calculator
function calculateLoan() {
    const amount = parseFloat(document.getElementById('loan-amount').value);
    const rate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
    const term = parseFloat(document.getElementById('loan-term').value) * 12;
    
    if (amount && rate && term) {
        const monthlyPayment = (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
        const totalPayment = monthlyPayment * term;
        const totalInterest = totalPayment - amount;
        
        document.getElementById('loan-result').innerHTML = `
            <div class="alert alert-info mt-3">
                <p>Monthly Payment: $${monthlyPayment.toFixed(2)}</p>
                <p>Total Payment: $${totalPayment.toFixed(2)}</p>
                <p>Total Interest: $${totalInterest.toFixed(2)}</p>
            </div>
        `;
    }
}

// Investment Calculator
function calculateInvestment() {
    const initial = parseFloat(document.getElementById('initial-investment').value);
    const monthly = parseFloat(document.getElementById('monthly-contribution').value);
    const rate = parseFloat(document.getElementById('expected-return').value) / 100 / 12;
    const years = parseFloat(document.getElementById('time-period').value);
    
    if (initial && monthly && rate && years) {
        const months = years * 12;
        let futureValue = initial;
        
        for (let i = 0; i < months; i++) {
            futureValue = (futureValue + monthly) * (1 + rate);
        }
        
        const totalContributions = initial + (monthly * months);
        const totalInterest = futureValue - totalContributions;
        
        document.getElementById('investment-result').innerHTML = `
            <div class="alert alert-info mt-3">
                <p>Future Value: $${futureValue.toFixed(2)}</p>
                <p>Total Contributions: $${totalContributions.toFixed(2)}</p>
                <p>Total Interest Earned: $${totalInterest.toFixed(2)}</p>
            </div>
        `;
    }
}

// Stock Market Analysis
let stockChart = null;

async function searchStock() {
    const symbol = document.getElementById('stock-symbol').value.toUpperCase();
    if (!symbol) {
        document.getElementById('stock-info').innerHTML = `
            <div class="alert alert-warning mt-3">
                Please enter a stock symbol (e.g., AAPL, GOOGL, MSFT)
            </div>
        `;
        return;
    }
    
    try {
        // Using Alpha Vantage API (free tier)
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=YOUR_API_KEY`);
        const data = await response.json();
        
        if (data['Error Message']) {
            throw new Error(data['Error Message']);
        }
        
        if (!data['Time Series (Daily)']) {
            throw new Error('Invalid stock symbol or no data available');
        }
        
        const timeSeriesData = data['Time Series (Daily)'];
        const dates = Object.keys(timeSeriesData).slice(0, 30).reverse();
        const prices = dates.map(date => parseFloat(timeSeriesData[date]['4. close']));
        
        if (stockChart) {
            stockChart.destroy();
        }
        
        const ctx = document.getElementById('stock-chart').getContext('2d');
        stockChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: `${symbol} Stock Price`,
                    data: prices,
                    borderColor: '#3498db',
                    tension: 0.1,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '30-Day Stock Price History'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Price (USD)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    }
                }
            }
        });
        
        const currentPrice = prices[prices.length - 1];
        const priceChange = ((currentPrice - prices[0]) / prices[0] * 100).toFixed(2);
        const changeColor = priceChange >= 0 ? 'success' : 'danger';
        
        document.getElementById('stock-info').innerHTML = `
            <div class="alert alert-info mt-3">
                <h4>${symbol} Stock Information</h4>
                <p>Current Price: $${currentPrice.toFixed(2)}</p>
                <p class="text-${changeColor}">30-Day Change: ${priceChange}%</p>
                <p>Last Updated: ${dates[dates.length - 1]}</p>
                <small class="text-muted">Note: Data is delayed by 15 minutes</small>
            </div>
        `;
    } catch (error) {
        document.getElementById('stock-info').innerHTML = `
            <div class="alert alert-danger mt-3">
                <h4>Error</h4>
                <p>${error.message}</p>
                <small class="text-muted">
                    To use this feature, you'll need to:
                    <ol>
                        <li>Get a free API key from <a href="https://www.alphavantage.co/support/#api-key" target="_blank">Alpha Vantage</a></li>
                        <li>Replace 'YOUR_API_KEY' in the code with your actual API key</li>
                    </ol>
                </small>
            </div>
        `;
    }
}

// Budget Planner
function addExpense() {
    const expensesList = document.getElementById('expenses-list');
    const expenseDiv = document.createElement('div');
    expenseDiv.className = 'form-group';
    expenseDiv.innerHTML = `
        <div class="row">
            <div class="col">
                <input type="text" class="form-control" placeholder="Expense Name">
            </div>
            <div class="col">
                <input type="number" class="form-control" placeholder="Amount">
            </div>
            <div class="col-auto">
                <button class="btn btn-danger" onclick="this.parentElement.parentElement.parentElement.remove(); updateBudgetChart()">Remove</button>
            </div>
        </div>
    `;
    expensesList.appendChild(expenseDiv);
}

function updateBudgetChart() {
    const income = parseFloat(document.getElementById('monthly-income').value) || 0;
    const expenses = Array.from(document.querySelectorAll('#expenses-list input[type="number"]'))
        .map(input => parseFloat(input.value) || 0);
    
    const totalExpenses = expenses.reduce((a, b) => a + b, 0);
    const savings = income - totalExpenses;
    
    const ctx = document.getElementById('budget-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Expenses', 'Savings'],
            datasets: [{
                data: [totalExpenses, savings],
                backgroundColor: ['#e74c3c', '#2ecc71']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Financial Health Score
function calculateHealthScore() {
    const emergencyFund = parseFloat(document.getElementById('emergency-fund').value) || 0;
    const savingsRate = parseFloat(document.getElementById('savings-rate').value) || 0;
    const debtIncomeRatio = parseFloat(document.getElementById('debt-income-ratio').value) || 0;
    
    // Simple scoring algorithm
    let score = 0;
    
    // Emergency fund score (max 40 points)
    if (emergencyFund >= 6) score += 40;
    else if (emergencyFund >= 3) score += 30;
    else if (emergencyFund >= 1) score += 20;
    else score += emergencyFund * 10;
    
    // Savings rate score (max 30 points)
    if (savingsRate >= 20) score += 30;
    else if (savingsRate >= 15) score += 25;
    else if (savingsRate >= 10) score += 20;
    else score += savingsRate * 2;
    
    // Debt-to-income ratio score (max 30 points)
    if (debtIncomeRatio <= 20) score += 30;
    else if (debtIncomeRatio <= 30) score += 25;
    else if (debtIncomeRatio <= 40) score += 20;
    else score += Math.max(0, 30 - (debtIncomeRatio - 40));
    
    document.getElementById('health-score').textContent = Math.round(score);
    
    // Update score circle color based on score
    const scoreCircle = document.querySelector('.score-circle');
    if (score >= 80) {
        scoreCircle.style.backgroundColor = '#2ecc71';
    } else if (score >= 60) {
        scoreCircle.style.backgroundColor = '#f1c40f';
    } else {
        scoreCircle.style.backgroundColor = '#e74c3c';
    }
} 