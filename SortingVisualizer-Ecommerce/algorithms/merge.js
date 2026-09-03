/**
 * MERGE SORT ALGORITHM
 * 
 * Description: Merge Sort is a divide-and-conquer algorithm that divides the array
 * into two halves, recursively sorts them, and then merges the sorted halves.
 * 
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(n)
 * 
 * Best Use Case: Large datasets, stable sorting required, linked lists, external sorting
 */

async function mergeSort() {
    console.log('🔀 Starting Merge Sort');
    await mergeSortHelper(0, state.array.length - 1);
    console.log('✅ Merge Sort completed');
}

/**
 * Recursive helper function for merge sort
 */
async function mergeSortHelper(left, right) {
    if (state.stopRequested || left >= right) {
        return;
    }
    
    // Find middle point
    const mid = Math.floor((left + right) / 2);
    
    // Highlight the range being sorted
    for (let i = left; i <= right; i++) {
        highlightElement(i, 'comparing');
    }
    await sleep(getDelay());
    clearHighlights();
    
    // Sort first half
    await mergeSortHelper(left, mid);
    
    // Sort second half
    await mergeSortHelper(mid + 1, right);
    
    // Merge the sorted halves
    await merge(left, mid, right);
}

/**
 * Merge two sorted subarrays
 */
async function merge(left, mid, right) {
    if (state.stopRequested) return;
    
    // Create temporary arrays
    const leftArray = [];
    const rightArray = [];
    
    // Copy data to temporary arrays
    for (let i = left; i <= mid; i++) {
        leftArray.push(state.array[i]);
        state.statistics.arrayAccesses++;
    }
    
    for (let i = mid + 1; i <= right; i++) {
        rightArray.push(state.array[i]);
        state.statistics.arrayAccesses++;
    }
    
    // Merge the temporary arrays back
    let i = 0; // Initial index of left subarray
    let j = 0; // Initial index of right subarray
    let k = left; // Initial index of merged subarray
    
    while (i < leftArray.length && j < rightArray.length) {
        if (state.stopRequested) break;
        
        // Highlight elements being compared
        highlightElements([left + i, mid + 1 + j], 'comparing');
        await sleep(getDelay());
        
        state.statistics.comparisons++;
        state.statistics.arrayAccesses += 2;
        updateStatisticsDisplay();
        
        if (leftArray[i].value <= rightArray[j].value) {
            state.array[k] = leftArray[i];
            highlightElement(k, 'swapping');
            i++;
        } else {
            state.array[k] = rightArray[j];
            highlightElement(k, 'swapping');
            j++;
        }
        
        state.statistics.arrayAccesses++;
        updateStatisticsDisplay();
        
        renderVisualization();
        await sleep(getDelay());
        
        k++;
    }
    
    // Copy remaining elements of leftArray, if any
    while (i < leftArray.length) {
        if (state.stopRequested) break;
        
        state.array[k] = leftArray[i];
        state.statistics.arrayAccesses++;
        
        highlightElement(k, 'swapping');
        renderVisualization();
        await sleep(getDelay() / 2);
        
        i++;
        k++;
    }
    
    // Copy remaining elements of rightArray, if any
    while (j < rightArray.length) {
        if (state.stopRequested) break;
        
        state.array[k] = rightArray[j];
        state.statistics.arrayAccesses++;
        
        highlightElement(k, 'swapping');
        renderVisualization();
        await sleep(getDelay() / 2);
        
        j++;
        k++;
    }
    
    updateStatisticsDisplay();
    
    // Mark merged section as sorted
    for (let i = left; i <= right; i++) {
        highlightElement(i, 'sorted');
    }
    await sleep(getDelay());
}

/**
 * Helper function: Iterative Merge Sort (Bottom-up approach)
 * Can be more efficient for certain datasets
 */
async function mergeSortIterative() {
    console.log('🔀 Starting Iterative Merge Sort');
    const n = state.array.length;
    
    // Start with merge subarrays of size 1, then 2, 4, 8, ...
    for (let currSize = 1; currSize < n; currSize *= 2) {
        if (state.stopRequested) break;
        
        // Pick starting index of left sub array to be merged
        for (let leftStart = 0; leftStart < n - 1; leftStart += 2 * currSize) {
            if (state.stopRequested) break;
            
            // Find ending point of left subarray
            const mid = Math.min(leftStart + currSize - 1, n - 1);
            
            // Find ending point of right subarray
            const rightEnd = Math.min(leftStart + 2 * currSize - 1, n - 1);
            
            // Merge subarrays
            await merge(leftStart, mid, rightEnd);
        }
    }
    
    console.log('✅ Iterative Merge Sort completed');
}

/**
 * Helper function: Natural Merge Sort
 * Takes advantage of existing runs in the data
 */
async function naturalMergeSort() {
    console.log('🔀 Starting Natural Merge Sort');
    const n = state.array.length;
    
    // Identify natural runs
    let runs = [];
    let start = 0;
    
    for (let i = 1; i < n; i++) {
        state.statistics.comparisons++;
        state.statistics.arrayAccesses += 2;
        
        if (state.array[i].value < state.array[i - 1].value) {
            runs.push({ start: start, end: i - 1 });
            start = i;
        }
    }
    runs.push({ start: start, end: n - 1 });
    
    updateStatisticsDisplay();
    
    // Merge runs until only one remains
    while (runs.length > 1) {
        if (state.stopRequested) break;
        
        let newRuns = [];
        
        for (let i = 0; i < runs.length; i += 2) {
            if (i + 1 < runs.length) {
                await merge(runs[i].start, runs[i].end, runs[i + 1].end);
                newRuns.push({ start: runs[i].start, end: runs[i + 1].end });
            } else {
                newRuns.push(runs[i]);
            }
        }
        
        runs = newRuns;
    }
    
    console.log('✅ Natural Merge Sort completed');
}
