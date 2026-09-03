/**
 * INSERTION SORT ALGORITHM
 * 
 * Description: Insertion Sort builds the final sorted array one item at a time.
 * It picks elements from the unsorted part and inserts them at the correct position
 * in the sorted part.
 * 
 * Time Complexity: O(n²) worst case, O(n) best case (already sorted)
 * Space Complexity: O(1)
 * 
 * Best Use Case: Nearly sorted data, small datasets, online sorting (data arrives in real-time)
 */

async function insertionSort() {
    console.log('📌 Starting Insertion Sort');
    const n = state.array.length;
    
    // First element is already "sorted"
    highlightElement(0, 'sorted');
    await sleep(getDelay());
    
    // Start from second element
    for (let i = 1; i < n; i++) {
        if (state.stopRequested) break;
        
        const key = state.array[i];
        let j = i - 1;
        
        // Highlight the element to be inserted
        highlightElement(i, 'pivot');
        await sleep(getDelay());
        
        // Move elements greater than key one position ahead
        while (j >= 0) {
            if (state.stopRequested) break;
            
            // Highlight comparison
            highlightElements([j, i], 'comparing');
            await sleep(getDelay());
            
            // Increment counters
            state.statistics.comparisons++;
            state.statistics.arrayAccesses += 2;
            updateStatisticsDisplay();
            
            // Check if current element is greater than key
            if (state.array[j].value > key.value) {
                // Shift element to the right
                highlightElement(j, 'swapping');
                await sleep(getDelay());
                
                state.array[j + 1] = state.array[j];
                state.statistics.arrayAccesses += 2;
                state.statistics.swaps++;
                updateStatisticsDisplay();
                
                // Re-render to show shift
                renderVisualization();
                highlightElement(j + 1, 'swapping');
                await sleep(getDelay());
                
                j--;
            } else {
                break;
            }
            
            clearHighlights();
        }
        
        // Insert the key at its correct position
        state.array[j + 1] = key;
        state.statistics.arrayAccesses++;
        updateStatisticsDisplay();
        
        // Re-render
        renderVisualization();
        
        // Mark all elements up to i as sorted
        for (let k = 0; k <= i; k++) {
            highlightElement(k, 'sorted');
        }
        
        await sleep(getDelay() / 2);
    }
    
    console.log('✅ Insertion Sort completed');
}

/**
 * Helper function: Binary Insertion Sort
 * Uses binary search to find insertion position (reduces comparisons)
 */
async function binaryInsertionSort() {
    console.log('📌 Starting Binary Insertion Sort');
    const n = state.array.length;
    
    highlightElement(0, 'sorted');
    await sleep(getDelay());
    
    for (let i = 1; i < n; i++) {
        if (state.stopRequested) break;
        
        const key = state.array[i];
        highlightElement(i, 'pivot');
        await sleep(getDelay());
        
        // Find position using binary search
        let left = 0;
        let right = i - 1;
        let pos = i;
        
        while (left <= right) {
            if (state.stopRequested) break;
            
            const mid = Math.floor((left + right) / 2);
            
            highlightElements([mid, i], 'comparing');
            await sleep(getDelay());
            
            state.statistics.comparisons++;
            state.statistics.arrayAccesses += 2;
            updateStatisticsDisplay();
            
            if (state.array[mid].value > key.value) {
                right = mid - 1;
                pos = mid;
            } else {
                left = mid + 1;
            }
            
            clearHighlights();
        }
        
        // Shift elements
        for (let j = i - 1; j >= pos; j--) {
            if (state.stopRequested) break;
            
            highlightElement(j, 'swapping');
            await sleep(getDelay() / 2);
            
            state.array[j + 1] = state.array[j];
            state.statistics.arrayAccesses += 2;
            state.statistics.swaps++;
        }
        
        // Insert key
        state.array[pos] = key;
        state.statistics.arrayAccesses++;
        updateStatisticsDisplay();
        
        renderVisualization();
        
        for (let k = 0; k <= i; k++) {
            highlightElement(k, 'sorted');
        }
        
        await sleep(getDelay());
    }
    
    console.log('✅ Binary Insertion Sort completed');
}

/**
 * Helper function: Shell Sort (Advanced Insertion Sort variant)
 * Uses gap sequences for better performance
 */
async function shellSort() {
    console.log('📌 Starting Shell Sort (Gap-based Insertion Sort)');
    const n = state.array.length;
    
    // Start with a large gap, then reduce
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        if (state.stopRequested) break;
        
        // Perform gapped insertion sort
        for (let i = gap; i < n; i++) {
            if (state.stopRequested) break;
            
            const temp = state.array[i];
            let j = i;
            
            highlightElement(i, 'pivot');
            await sleep(getDelay());
            
            while (j >= gap) {
                if (state.stopRequested) break;
                
                highlightElements([j - gap, j], 'comparing');
                await sleep(getDelay());
                
                state.statistics.comparisons++;
                state.statistics.arrayAccesses += 2;
                updateStatisticsDisplay();
                
                if (state.array[j - gap].value > temp.value) {
                    highlightElement(j - gap, 'swapping');
                    await sleep(getDelay());
                    
                    state.array[j] = state.array[j - gap];
                    state.statistics.arrayAccesses += 2;
                    state.statistics.swaps++;
                    updateStatisticsDisplay();
                    
                    renderVisualization();
                    await sleep(getDelay());
                    
                    j -= gap;
                } else {
                    break;
                }
                
                clearHighlights();
            }
            
            state.array[j] = temp;
            state.statistics.arrayAccesses++;
            renderVisualization();
            clearHighlights();
        }
    }
    
    console.log('✅ Shell Sort completed');
}
