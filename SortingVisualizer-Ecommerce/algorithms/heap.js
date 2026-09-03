/**
 * HEAP SORT ALGORITHM
 * 
 * Description: Heap Sort builds a max heap from the array, then repeatedly extracts
 * the maximum element and rebuilds the heap until all elements are sorted.
 * 
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(1)
 * 
 * Best Use Case: Finding top K elements, priority queues, guaranteed O(n log n) performance
 */

async function heapSort() {
    console.log('🏔️ Starting Heap Sort');
    const n = state.array.length;
    
    // Build max heap (rearrange array)
    console.log('Building max heap...');
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (state.stopRequested) break;
        await heapify(n, i);
    }
    
    // Extract elements from heap one by one
    console.log('Extracting elements...');
    for (let i = n - 1; i > 0; i--) {
        if (state.stopRequested) break;
        
        // Move current root to end
        highlightElements([0, i], 'swapping');
        await sleep(getDelay());
        
        [state.array[0], state.array[i]] = [state.array[i], state.array[0]];
        
        state.statistics.swaps++;
        state.statistics.arrayAccesses += 4;
        updateStatisticsDisplay();
        
        renderVisualization();
        highlightElements([0, i], 'swapping');
        await sleep(getDelay());
        
        // Mark sorted element
        highlightElement(i, 'sorted');
        clearHighlights();
        
        // Heapify the reduced heap
        await heapify(i, 0);
    }
    
    // Mark first element as sorted
    if (!state.stopRequested) {
        highlightElement(0, 'sorted');
    }
    
    console.log('✅ Heap Sort completed');
}

/**
 * Heapify a subtree rooted at index i
 * n is the size of the heap
 */
async function heapify(n, i) {
    if (state.stopRequested) return;
    
    let largest = i;        // Initialize largest as root
    const left = 2 * i + 1; // Left child
    const right = 2 * i + 2; // Right child
    
    // Highlight current node
    highlightElement(i, 'pivot');
    await sleep(getDelay() / 2);
    
    // If left child exists and is larger than root
    if (left < n) {
        highlightElements([largest, left], 'comparing');
        await sleep(getDelay());
        
        state.statistics.comparisons++;
        state.statistics.arrayAccesses += 2;
        updateStatisticsDisplay();
        
        if (state.array[left].value > state.array[largest].value) {
            largest = left;
        }
        
        clearHighlights();
        highlightElement(i, 'pivot');
    }
    
    // If right child exists and is larger than largest so far
    if (right < n) {
        highlightElements([largest, right], 'comparing');
        await sleep(getDelay());
        
        state.statistics.comparisons++;
        state.statistics.arrayAccesses += 2;
        updateStatisticsDisplay();
        
        if (state.array[right].value > state.array[largest].value) {
            largest = right;
        }
        
        clearHighlights();
        highlightElement(i, 'pivot');
    }
    
    // If largest is not root, swap and continue heapifying
    if (largest !== i) {
        highlightElements([i, largest], 'swapping');
        await sleep(getDelay());
        
        [state.array[i], state.array[largest]] = [state.array[largest], state.array[i]];
        
        state.statistics.swaps++;
        state.statistics.arrayAccesses += 4;
        updateStatisticsDisplay();
        
        renderVisualization();
        highlightElements([i, largest], 'swapping');
        await sleep(getDelay());
        
        clearHighlights();
        
        // Recursively heapify the affected subtree
        await heapify(n, largest);
    } else {
        clearHighlights();
    }
}

/**
 * Helper function: Min Heap Sort (sorts in descending order)
 */
async function heapSortMin() {
    console.log('🏔️ Starting Min Heap Sort');
    const n = state.array.length;
    
    // Build min heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (state.stopRequested) break;
        await heapifyMin(n, i);
    }
    
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        if (state.stopRequested) break;
        
        highlightElements([0, i], 'swapping');
        await sleep(getDelay());
        
        [state.array[0], state.array[i]] = [state.array[i], state.array[0]];
        
        state.statistics.swaps++;
        state.statistics.arrayAccesses += 4;
        updateStatisticsDisplay();
        
        renderVisualization();
        await sleep(getDelay());
        
        highlightElement(i, 'sorted');
        clearHighlights();
        
        await heapifyMin(i, 0);
    }
    
    if (!state.stopRequested) {
        highlightElement(0, 'sorted');
    }
    
    console.log('✅ Min Heap Sort completed');
}

async function heapifyMin(n, i) {
    if (state.stopRequested) return;
    
    let smallest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    highlightElement(i, 'pivot');
    await sleep(getDelay() / 2);
    
    if (left < n) {
        highlightElements([smallest, left], 'comparing');
        await sleep(getDelay());
        
        state.statistics.comparisons++;
        state.statistics.arrayAccesses += 2;
        updateStatisticsDisplay();
        
        if (state.array[left].value < state.array[smallest].value) {
            smallest = left;
        }
        
        clearHighlights();
        highlightElement(i, 'pivot');
    }
    
    if (right < n) {
        highlightElements([smallest, right], 'comparing');
        await sleep(getDelay());
        
        state.statistics.comparisons++;
        state.statistics.arrayAccesses += 2;
        updateStatisticsDisplay();
        
        if (state.array[right].value < state.array[smallest].value) {
            smallest = right;
        }
        
        clearHighlights();
        highlightElement(i, 'pivot');
    }
    
    if (smallest !== i) {
        highlightElements([i, smallest], 'swapping');
        await sleep(getDelay());
        
        [state.array[i], state.array[smallest]] = [state.array[smallest], state.array[i]];
        
        state.statistics.swaps++;
        state.statistics.arrayAccesses += 4;
        updateStatisticsDisplay();
        
        renderVisualization();
        await sleep(getDelay());
        
        clearHighlights();
        
        await heapifyMin(n, smallest);
    } else {
        clearHighlights();
    }
}

/**
 * Helper function: K-way Heap Sort
 * Uses a k-ary heap instead of binary heap
 */
async function heapSortKAry(k = 3) {
    console.log(`🏔️ Starting ${k}-ary Heap Sort`);
    const n = state.array.length;
    
    // Build k-ary max heap
    for (let i = Math.floor((n - 2) / k); i >= 0; i--) {
        if (state.stopRequested) break;
        await heapifyKAry(n, i, k);
    }
    
    // Extract elements
    for (let i = n - 1; i > 0; i--) {
        if (state.stopRequested) break;
        
        highlightElements([0, i], 'swapping');
        await sleep(getDelay());
        
        [state.array[0], state.array[i]] = [state.array[i], state.array[0]];
        
        state.statistics.swaps++;
        state.statistics.arrayAccesses += 4;
        updateStatisticsDisplay();
        
        renderVisualization();
        await sleep(getDelay());
        
        highlightElement(i, 'sorted');
        clearHighlights();
        
        await heapifyKAry(i, 0, k);
    }
    
    if (!state.stopRequested) {
        highlightElement(0, 'sorted');
    }
    
    console.log(`✅ ${k}-ary Heap Sort completed`);
}

async function heapifyKAry(n, i, k) {
    if (state.stopRequested) return;
    
    let largest = i;
    
    highlightElement(i, 'pivot');
    await sleep(getDelay() / 2);
    
    // Check all k children
    for (let j = 1; j <= k; j++) {
        const child = k * i + j;
        
        if (child < n) {
            highlightElements([largest, child], 'comparing');
            await sleep(getDelay());
            
            state.statistics.comparisons++;
            state.statistics.arrayAccesses += 2;
            updateStatisticsDisplay();
            
            if (state.array[child].value > state.array[largest].value) {
                largest = child;
            }
            
            clearHighlights();
            highlightElement(i, 'pivot');
        }
    }
    
    if (largest !== i) {
        highlightElements([i, largest], 'swapping');
        await sleep(getDelay());
        
        [state.array[i], state.array[largest]] = [state.array[largest], state.array[i]];
        
        state.statistics.swaps++;
        state.statistics.arrayAccesses += 4;
        updateStatisticsDisplay();
        
        renderVisualization();
        await sleep(getDelay());
        
        clearHighlights();
        
        await heapifyKAry(n, largest, k);
    } else {
        clearHighlights();
    }
}
