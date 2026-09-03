// ===== Global State Management =====
const state = {
    array: [],
    products: [],
    arraySize: 15,
    speed: 3,
    algorithm: 'bubble',
    sortCriteria: 'price',
    viewMode: 'bars', // 'bars' or 'products'
    isSorting: false,
    stopRequested: false,
    statistics: {
        comparisons: 0,
        swaps: 0,
        arrayAccesses: 0,
        startTime: 0
    }
};

// Speed mapping (ms delay) - Optimized for Presentations
const speedMap = {
    1: 1500,  // Very Slow - Perfect for presentations (1.5 seconds!)
    2: 800,   // Slow
    3: 400,   // Medium
    4: 150,   // Fast
    5: 50     // Very Fast
};

const speedLabels = {
    1: 'Very Slow',
    2: 'Slow',
    3: 'Medium',
    4: 'Fast',
    5: 'Very Fast'
};

// Algorithm information
const algorithmInfo = {
    bubble: {
        timeComplexity: 'Best: O(n) | Avg: O(n²) | Worst: O(n²)',
        spaceComplexity: 'O(1)',
        useCase: 'Small datasets, educational purposes'
    },
    selection: {
        timeComplexity: 'Best: O(n²) | Avg: O(n²) | Worst: O(n²)',
        spaceComplexity: 'O(1)',
        useCase: 'Small datasets, minimal swaps needed'
    },
    insertion: {
        timeComplexity: 'Best: O(n) | Avg: O(n²) | Worst: O(n²)',
        spaceComplexity: 'O(1)',
        useCase: 'Nearly sorted data, small datasets'
    },
    merge: {
        timeComplexity: 'Best: O(n log n) | Avg: O(n log n) | Worst: O(n log n)',
        spaceComplexity: 'O(n)',
        useCase: 'Large datasets, stable sorting required'
    },
    quick: {
        timeComplexity: 'Best: O(n log n) | Avg: O(n log n) | Worst: O(n²)',
        spaceComplexity: 'O(log n)',
        useCase: 'Large datasets, average case performance'
    },
    heap: {
        timeComplexity: 'Best: O(n log n) | Avg: O(n log n) | Worst: O(n log n)',
        spaceComplexity: 'O(1)',
        useCase: 'Finding top K elements, priority queues'
    },
    counting: {
        timeComplexity: 'Best: O(n+k) | Avg: O(n+k) | Worst: O(n+k)',
        spaceComplexity: 'O(k) where k is range of input',
        useCase: 'Integer data with limited range (e.g., ratings)'
    },
    radix: {
        timeComplexity: 'Best: O(d×n) | Avg: O(d×n) | Worst: O(d×n)',
        spaceComplexity: 'O(n+k) where k is base',
        useCase: 'Integer data with fixed digits (e.g., IDs)'
    }
};

// ===== Initialize Application =====
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Initializing Sorting Visualizer + E-Commerce Demo');
    
    // Load products data
    await loadProducts();
    
    // Setup event listeners
    setupEventListeners();
    
    // Generate initial array
    generateNewArray();
    
    // Update UI
    updateAlgorithmInfo();
    updateSpeedLabel();
});

// ===== Load Products from JSON =====
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        state.products = await response.json();
        console.log(`✅ Loaded ${state.products.length} products`);
    } catch (error) {
        console.error('❌ Error loading products:', error);
        // Fallback: Generate dummy products
        state.products = generateDummyProducts(20);
    }
}

// ===== Generate Dummy Products (Fallback) =====
function generateDummyProducts(count) {
    const products = [];
    const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Toys'];
    
    for (let i = 1; i <= count; i++) {
        products.push({
            id: 1000 + i,
            name: `Product ${i}`,
            price: Math.floor(Math.random() * 500) + 10,
            rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
            image: `https://via.placeholder.com/200x150/667eea/ffffff?text=Product+${i}`,
            category: categories[Math.floor(Math.random() * categories.length)]
        });
    }
    
    return products;
}

// ===== Setup Event Listeners =====
function setupEventListeners() {
    // Algorithm selection
    document.getElementById('algorithmSelect').addEventListener('change', (e) => {
        state.algorithm = e.target.value;
        updateAlgorithmInfo();
    });
    
    // Sort criteria
    document.getElementById('sortCriteria').addEventListener('change', (e) => {
        state.sortCriteria = e.target.value;
        generateNewArray();
    });
    
    // View mode toggle
    document.getElementById('barsView').addEventListener('click', () => {
        setViewMode('bars');
    });
    
    document.getElementById('productsView').addEventListener('click', () => {
        setViewMode('products');
    });
    
    // Array size slider
    document.getElementById('arraySize').addEventListener('input', (e) => {
        state.arraySize = parseInt(e.target.value);
        document.getElementById('arraySizeValue').textContent = state.arraySize;
        if (!state.isSorting) {
            generateNewArray();
        }
    });
    
    // Speed slider
    document.getElementById('speed').addEventListener('input', (e) => {
        state.speed = parseInt(e.target.value);
        updateSpeedLabel();
    });
    
    // Control buttons
    document.getElementById('generateArray').addEventListener('click', () => {
        if (!state.isSorting) {
            generateNewArray();
        }
    });
    
    document.getElementById('startSort').addEventListener('click', () => {
        startSorting();
    });
    
    document.getElementById('stopSort').addEventListener('click', () => {
        stopSorting();
    });
}

// ===== Set View Mode =====
function setViewMode(mode) {
    state.viewMode = mode;
    
    // Update button states
    document.getElementById('barsView').classList.toggle('active', mode === 'bars');
    document.getElementById('productsView').classList.toggle('active', mode === 'products');
    
    // Update container visibility
    document.getElementById('barsContainer').classList.toggle('active', mode === 'bars');
    document.getElementById('productsContainer').classList.toggle('active', mode === 'products');
    
    // Render current array in new mode
    renderVisualization();
}

// ===== Generate New Array =====
function generateNewArray() {
    resetStatistics();
    
    // Shuffle products and create array with repetition if needed
    const shuffled = [...state.products].sort(() => Math.random() - 0.5);
    
    // If array size is larger than available products, repeat products
    const subset = [];
    for (let i = 0; i < state.arraySize; i++) {
        subset.push(shuffled[i % shuffled.length]);
    }
    
    // Extract values based on sort criteria
    if (state.sortCriteria === 'price') {
        state.array = subset.map(p => ({ value: p.price, product: p }));
    } else if (state.sortCriteria === 'rating') {
        state.array = subset.map(p => ({ value: parseFloat(p.rating), product: p }));
    } else if (state.sortCriteria === 'id') {
        state.array = subset.map(p => ({ value: p.id, product: p }));
    }
    
    renderVisualization();
}

// ===== Render Visualization =====
function renderVisualization() {
    if (state.viewMode === 'bars') {
        renderBars();
    } else {
        renderProducts();
    }
}

// ===== Render Bars =====
function renderBars() {
    const container = document.getElementById('barsDisplay');
    container.innerHTML = '';
    
    const maxValue = Math.max(...state.array.map(item => item.value));
    const containerHeight = container.clientHeight || 500;
    
    state.array.forEach((item, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.id = `bar-${index}`;
        
        const heightPercent = (item.value / maxValue) * 90; // 90% max height
        bar.style.height = `${heightPercent}%`;
        
        // Add value label
        const label = document.createElement('div');
        label.className = 'bar-value';
        
        // Show decimal values for ratings, whole numbers for others
        if (state.sortCriteria === 'rating') {
            label.textContent = item.value.toFixed(1); // Show one decimal place (e.g., 4.5)
        } else {
            label.textContent = Math.round(item.value); // Show whole numbers
        }
        
        bar.appendChild(label);
        
        container.appendChild(bar);
    });
}

// ===== Render Products =====
function renderProducts() {
    const container = document.getElementById('productsDisplay');
    container.innerHTML = '';
    
    state.array.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.id = `product-${index}`;
        
        const product = item.product;
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" />
            <div class="product-name">${product.name}</div>
            <div class="product-price">Rs ${product.price.toLocaleString('en-PK')}</div>
            <div class="product-rating">⭐ ${product.rating}</div>
            <div class="product-id">ID: ${product.id}</div>
        `;
        
        container.appendChild(card);
    });
}

// ===== Update Algorithm Info =====
function updateAlgorithmInfo() {
    const info = algorithmInfo[state.algorithm];
    document.getElementById('timeComplexity').textContent = info.timeComplexity;
    document.getElementById('spaceComplexity').textContent = info.spaceComplexity;
    document.getElementById('useCase').textContent = info.useCase;
}

// ===== Update Speed Label =====
function updateSpeedLabel() {
    document.getElementById('speedValue').textContent = speedLabels[state.speed];
}

// ===== Reset Statistics =====
function resetStatistics() {
    state.statistics = {
        comparisons: 0,
        swaps: 0,
        arrayAccesses: 0,
        startTime: 0
    };
    updateStatisticsDisplay();
}

// ===== Update Statistics Display =====
function updateStatisticsDisplay() {
    document.getElementById('comparisons').textContent = state.statistics.comparisons;
    document.getElementById('swaps').textContent = state.statistics.swaps;
    document.getElementById('arrayAccesses').textContent = state.statistics.arrayAccesses;
    
    if (state.statistics.startTime > 0) {
        const elapsed = Date.now() - state.statistics.startTime;
        document.getElementById('timeElapsed').textContent = elapsed;
    } else {
        document.getElementById('timeElapsed').textContent = '0';
    }
}

// ===== Start Sorting =====
async function startSorting() {
    if (state.isSorting) return;
    
    state.isSorting = true;
    state.stopRequested = false;
    state.statistics.startTime = Date.now();
    
    // Disable controls
    document.getElementById('startSort').disabled = true;
    document.getElementById('generateArray').disabled = true;
    document.getElementById('algorithmSelect').disabled = true;
    document.getElementById('sortCriteria').disabled = true;
    document.getElementById('arraySize').disabled = true;
    document.getElementById('speed').disabled = true;
    document.getElementById('barsView').disabled = true;
    document.getElementById('productsView').disabled = true;
    document.getElementById('stopSort').disabled = false;
    
    // Call appropriate sorting algorithm
    try {
        switch (state.algorithm) {
            case 'bubble':
                await bubbleSort();
                break;
            case 'selection':
                await selectionSort();
                break;
            case 'insertion':
                await insertionSort();
                break;
            case 'merge':
                await mergeSort();
                break;
            case 'quick':
                await quickSort();
                break;
            case 'heap':
                await heapSort();
                break;
            case 'counting':
                await countingSort();
                break;
            case 'radix':
                await radixSort();
                break;
        }
        
        // Mark all as sorted if completed
        if (!state.stopRequested) {
            await markAllSorted();
        }
    } catch (error) {
        console.error('Sorting error:', error);
    }
    
    // Re-enable controls
    state.isSorting = false;
    document.getElementById('startSort').disabled = false;
    document.getElementById('generateArray').disabled = false;
    document.getElementById('algorithmSelect').disabled = false;
    document.getElementById('sortCriteria').disabled = false;
    document.getElementById('arraySize').disabled = false;
    document.getElementById('speed').disabled = false;
    document.getElementById('barsView').disabled = false;
    document.getElementById('productsView').disabled = false;
    document.getElementById('stopSort').disabled = true;
}

// ===== Stop Sorting =====
function stopSorting() {
    state.stopRequested = true;
}

// ===== Mark All Sorted =====
async function markAllSorted() {
    for (let i = 0; i < state.array.length; i++) {
        if (state.stopRequested) break;
        highlightElement(i, 'sorted');
        await sleep(speedMap[state.speed] / 2);
    }
}

// ===== Utility Functions =====

// Sleep function for animation delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Highlight element
function highlightElement(index, className) {
    const element = state.viewMode === 'bars' 
        ? document.getElementById(`bar-${index}`)
        : document.getElementById(`product-${index}`);
    
    if (element) {
        element.className = state.viewMode === 'bars' ? 'bar' : 'product-card';
        if (className) {
            element.classList.add(className);
        }
    }
}

// Highlight multiple elements
function highlightElements(indices, className) {
    indices.forEach(index => highlightElement(index, className));
}

// Clear highlights
function clearHighlights() {
    for (let i = 0; i < state.array.length; i++) {
        highlightElement(i, null);
    }
}

// Swap array elements
async function swap(i, j) {
    state.statistics.swaps++;
    state.statistics.arrayAccesses += 4;
    updateStatisticsDisplay();
    
    // Visual swap
    highlightElements([i, j], 'swapping');
    await sleep(speedMap[state.speed]);
    
    // Actual swap
    [state.array[i], state.array[j]] = [state.array[j], state.array[i]];
    
    // Re-render
    renderVisualization();
    highlightElements([i, j], 'swapping');
    await sleep(speedMap[state.speed]);
    
    clearHighlights();
}

// Compare elements
async function compare(i, j) {
    state.statistics.comparisons++;
    state.statistics.arrayAccesses += 2;
    updateStatisticsDisplay();
    
    highlightElements([i, j], 'comparing');
    await sleep(speedMap[state.speed]);
    
    return state.array[i].value > state.array[j].value;
}

// Get delay based on current speed
function getDelay() {
    return speedMap[state.speed];
}

console.log('✅ Main script loaded successfully');
