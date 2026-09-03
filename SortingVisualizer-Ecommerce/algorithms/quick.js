/**
 * QUICK SORT ALGORITHM
 * 
 * Description: Quick Sort is a divide-and-conquer algorithm that picks a pivot element
 * and partitions the array around it, then recursively sorts the partitions.
 * 
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) for recursion stack
 * 
 * Best Use Case: Large datasets, in-place sorting, average-case performance critical
 */

async function quickSort() {
    console.log('⚡ Starting Quick Sort');
    await quickSortHelper(0, state.array.length - 1);
    console.log('✅ Quick Sort completed');
}

/**
 * Recursive helper function for quick sort
 */
async function quickSortHelper(low, high) {
    if (state.stopRequested || low >= high) {
        return;
    }
    
    // Partition the array and get pivot index
    const pivotIndex = await partition(low, high);
    
    // Mark pivot as sorted
    if (pivotIndex !== -1) {
        highlightElement(pivotIndex, 'sorted');
        await sleep(getDelay());
    }
    
    // Recursively sort elements before and after partition
    await quickSortHelper(low, pivotIndex - 1);
    await quickSortHelper(pivotIndex + 1, high);
}

/**
 * Partition function using Lomuto partition scheme
 * Places pivot at correct position and partitions array
 */
async function partition(low, high) {
    if (state.stopRequested) return -1;
    
    // Choose rightmost element as pivot
    const pivot = state.array[high].value;
    
    // Highlight pivot
    highlightElement(high, 'pivot');
    await sleep(getDelay());
    
    // Index of smaller element
    let i = low - 1;
    
    // Traverse through all elements
    for (let j = low; j < high; j++) {
        if (state.stopRequested) break;
        
        // Highlight elements being compared with pivot
        highlightElements([j, high], 'comparing');
        await sleep(getDelay());
        
        state.statistics.comparisons++;
        state.statistics.arrayAccesses += 2;
        updateStatisticsDisplay();
        
        // If current element is smaller than or equal to pivot
        if (state.array[j].value <= pivot) {
            i++;
            
            // Swap elements
            if (i !== j) {
                highlightElements([i, j], 'swapping');
                await sleep(getDelay());
                
                [state.array[i], state.array[j]] = [state.array[j], state.array[i]];
                
                state.statistics.swaps++;
                state.statistics.arrayAccesses += 4;
                updateStatisticsDisplay();
                
                renderVisualization();
                highlightElement(high, 'pivot'); // Re-highlight pivot
                highlightElements([i, j], 'swapping');
                await sleep(getDelay());
            }
        }
        
        clearHighlights();
        highlightElement(high, 'pivot'); // Keep pivot highlighted
    }
    
    // Place pivot in correct position
    const pivotIndex = i + 1;
    
    if (pivotIndex !== high) {
        highlightElements([pivotIndex, high], 'swapping');
        await sleep(getDelay());
        
        [state.array[pivotIndex], state.array[high]] = [state.array[high], state.array[pivotIndex]];
        
        state.statistics.swaps++;
        state.statistics.arrayAccesses += 4;
        updateStatisticsDisplay();
        
        renderVisualization();
        await sleep(getDelay());
    }
    
    clearHighlights();
    return pivotIndex;
}

/**
 * Helper function: Quick Sort with Hoare partition scheme
 * More efficient partition scheme
 */
async function quickSortHoare() {
    console.log('⚡ Starting Quick Sort (Hoare Partition)');
    await quickSortHoareHelper(0, state.array.length - 1);
    console.log('✅ Quick Sort (Hoare) completed');
}

async function quickSortHoareHelper(low, high) {
    if (state.stopRequested || low >= high) {
        return;
    }
    
    const pivotIndex = await partitionHoare(low, high);
    
    await quickSortHoareHelper(low, pivotIndex);
    await quickSortHoareHelper(pivotIndex + 1, high);
}

async function partitionHoare(low, high) {
    if (state.stopRequested) return low;
    
    // Choose middle element as pivot
    const mid = Math.floor((low + high) / 2);
    const pivot = state.array[mid].value;
    
    highlightElement(mid, 'pivot');
    await sleep(getDelay());
    
    let i = low - 1;
    let j = high + 1;
    
    while (true) {
        if (state.stopRequested) break;
        
        // Find element from left that should be on right
        do {
            i++;
            state.statistics.comparisons++;
            state.statistics.arrayAccesses++;
        } while (state.array[i].value < pivot);
        
        // Find element from right that should be on left
        do {
            j--;
            state.statistics.comparisons++;
            state.statistics.arrayAccesses++;
        } while (state.array[j].value > pivot);
        
        updateStatisticsDisplay();
        
        if (i >= j) {
            clearHighlights();
            return j;
        }
        
        // Swap elements
        highlightElements([i, j], 'swapping');
        await sleep(getDelay());
        
        [state.array[i], state.array[j]] = [state.array[j], state.array[i]];
        
        state.statistics.swaps++;
        state.statistics.arrayAccesses += 4;
        updateStatisticsDisplay();
        
        renderVisualization();
        highlightElement(mid, 'pivot');
        highlightElements([i, j], 'swapping');
        await sleep(getDelay());
        
        clearHighlights();
        highlightElement(mid, 'pivot');
    }
    
    return j;
}

/**
 * Helper function: Quick Sort with median-of-three pivot selection
 * Improves performance on partially sorted data
 */
async function quickSortMedianOfThree() {
    console.log('⚡ Starting Quick Sort (Median-of-Three)');
    await quickSortMedianHelper(0, state.array.length - 1);
    console.log('✅ Quick Sort (Median-of-Three) completed');
}

async function quickSortMedianHelper(low, high) {
    if (state.stopRequested || low >= high) {
        return;
    }
    
    // Choose median of three as pivot
    const mid = Math.floor((low + high) / 2);
    
    // Sort low, mid, high
    highlightElements([low, mid, high], 'comparing');
    await sleep(getDelay());
    
    if (state.array[low].value > state.array[mid].value) {
        [state.array[low], state.array[mid]] = [state.array[mid], state.array[low]];
        state.statistics.swaps++;
    }
    if (state.array[low].value > state.array[high].value) {
        [state.array[low], state.array[high]] = [state.array[high], state.array[low]];
        state.statistics.swaps++;
    }
    if (state.array[mid].value > state.array[high].value) {
        [state.array[mid], state.array[high]] = [state.array[high], state.array[mid]];
        state.statistics.swaps++;
    }
    
    state.statistics.comparisons += 3;
    state.statistics.arrayAccesses += 12;
    updateStatisticsDisplay();
    
    renderVisualization();
    clearHighlights();
    
    // Median is now at mid, swap with high-1 for partitioning
    [state.array[mid], state.array[high - 1]] = [state.array[high - 1], state.array[mid]];
    
    const pivotIndex = await partition(low, high - 1);
    
    if (pivotIndex !== -1) {
        highlightElement(pivotIndex, 'sorted');
        await sleep(getDelay());
    }
    
    await quickSortMedianHelper(low, pivotIndex - 1);
    await quickSortMedianHelper(pivotIndex + 1, high);
}

/**
 * Helper function: Three-way Quick Sort (Dutch National Flag)
 * Efficient for arrays with many duplicate elements
 */
async function quickSort3Way() {
    console.log('⚡ Starting 3-Way Quick Sort');
    await quickSort3WayHelper(0, state.array.length - 1);
    console.log('✅ 3-Way Quick Sort completed');
}

async function quickSort3WayHelper(low, high) {
    if (state.stopRequested || low >= high) {
        return;
    }
    
    const [lt, gt] = await partition3Way(low, high);
    
    await quickSort3WayHelper(low, lt - 1);
    await quickSort3WayHelper(gt + 1, high);
}

async function partition3Way(low, high) {
    if (state.stopRequested) return [low, high];
    
    const pivot = state.array[low].value;
    let lt = low;      // Elements less than pivot
    let i = low + 1;   // Current element
    let gt = high;     // Elements greater than pivot
    
    highlightElement(low, 'pivot');
    await sleep(getDelay());
    
    while (i <= gt) {
        if (state.stopRequested) break;
        
        highlightElements([i, low], 'comparing');
        await sleep(getDelay());
        
        state.statistics.comparisons++;
        state.statistics.arrayAccesses += 2;
        updateStatisticsDisplay();
        
        if (state.array[i].value < pivot) {
            [state.array[i], state.array[lt]] = [state.array[lt], state.array[i]];
            state.statistics.swaps++;
            state.statistics.arrayAccesses += 4;
            lt++;
            i++;
        } else if (state.array[i].value > pivot) {
            [state.array[i], state.array[gt]] = [state.array[gt], state.array[i]];
            state.statistics.swaps++;
            state.statistics.arrayAccesses += 4;
            gt--;
        } else {
            i++;
        }
        
        updateStatisticsDisplay();
        renderVisualization();
        highlightElement(low, 'pivot');
        await sleep(getDelay());
        clearHighlights();
    }
    
    for (let k = lt; k <= gt; k++) {
        highlightElement(k, 'sorted');
    }
    await sleep(getDelay());
    
    return [lt, gt];
}
