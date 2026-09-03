/**
 * SELECTION SORT ALGORITHM
 * 
 * Description: Selection Sort divides the array into sorted and unsorted regions.
 * It repeatedly selects the minimum element from the unsorted region and moves it
 * to the end of the sorted region.
 * 
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * Best Use Case: Small datasets, when memory writes are costly (minimal swaps)
 */

async function selectionSort() {
    console.log('🎯 Starting Selection Sort');
    const n = state.array.length;
    
    // Outer loop: Moves boundary of unsorted subarray
    for (let i = 0; i < n - 1; i++) {
        if (state.stopRequested) break;
        
        // Find the minimum element in unsorted array
        let minIndex = i;
        
        // Highlight current position
        highlightElement(i, 'pivot');
        await sleep(getDelay());
        
        // Inner loop: Find minimum element
        for (let j = i + 1; j < n; j++) {
            if (state.stopRequested) break;
            
            // Highlight elements being compared
            highlightElements([minIndex, j], 'comparing');
            await sleep(getDelay());
            
            // Increment counters
            state.statistics.comparisons++;
            state.statistics.arrayAccesses += 2;
            updateStatisticsDisplay();
            
            // Update minimum index if smaller element found
            if (state.array[j].value < state.array[minIndex].value) {
                // Clear previous minimum highlight
                if (minIndex !== i) {
                    highlightElement(minIndex, null);
                }
                minIndex = j;
                highlightElement(minIndex, 'comparing');
                await sleep(getDelay() / 2);
            }
            
            // Clear comparing highlight
            if (j !== minIndex) {
                highlightElement(j, null);
            }
        }
        
        // Swap minimum element with first element of unsorted part
        if (minIndex !== i) {
            highlightElements([i, minIndex], 'swapping');
            await sleep(getDelay());
            
            // Perform swap
            [state.array[i], state.array[minIndex]] = [state.array[minIndex], state.array[i]];
            
            state.statistics.swaps++;
            state.statistics.arrayAccesses += 4;
            updateStatisticsDisplay();
            
            // Re-render to show swap
            renderVisualization();
            highlightElements([i, minIndex], 'swapping');
            await sleep(getDelay());
        }
        
        // Mark sorted element
        highlightElement(i, 'sorted');
        await sleep(getDelay() / 2);
    }
    
    // Mark last element as sorted
    if (!state.stopRequested) {
        highlightElement(n - 1, 'sorted');
    }
    
    console.log('✅ Selection Sort completed');
}

/**
 * Helper function: Stable Selection Sort
 * A variant that maintains relative order of equal elements
 */
async function selectionSortStable() {
    console.log('🎯 Starting Stable Selection Sort');
    const n = state.array.length;
    
    for (let i = 0; i < n - 1; i++) {
        if (state.stopRequested) break;
        
        let minIndex = i;
        highlightElement(i, 'pivot');
        await sleep(getDelay());
        
        // Find minimum
        for (let j = i + 1; j < n; j++) {
            if (state.stopRequested) break;
            
            highlightElements([minIndex, j], 'comparing');
            await sleep(getDelay());
            
            state.statistics.comparisons++;
            state.statistics.arrayAccesses += 2;
            updateStatisticsDisplay();
            
            if (state.array[j].value < state.array[minIndex].value) {
                if (minIndex !== i) {
                    highlightElement(minIndex, null);
                }
                minIndex = j;
                highlightElement(minIndex, 'comparing');
                await sleep(getDelay() / 2);
            }
            
            if (j !== minIndex) {
                highlightElement(j, null);
            }
        }
        
        // Instead of swapping, shift elements and insert
        if (minIndex !== i) {
            const minValue = state.array[minIndex];
            
            highlightElement(minIndex, 'swapping');
            await sleep(getDelay());
            
            // Shift elements
            for (let k = minIndex; k > i; k--) {
                state.array[k] = state.array[k - 1];
                state.statistics.arrayAccesses += 2;
            }
            
            state.array[i] = minValue;
            state.statistics.arrayAccesses += 2;
            updateStatisticsDisplay();
            
            renderVisualization();
            await sleep(getDelay());
        }
        
        highlightElement(i, 'sorted');
        await sleep(getDelay() / 2);
    }
    
    if (!state.stopRequested) {
        highlightElement(n - 1, 'sorted');
    }
    
    console.log('✅ Stable Selection Sort completed');
}
