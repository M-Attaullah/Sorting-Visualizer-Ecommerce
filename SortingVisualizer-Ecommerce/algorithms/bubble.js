/**
 * BUBBLE SORT ALGORITHM
 * 
 * Description: Bubble Sort repeatedly steps through the list, compares adjacent elements
 * and swaps them if they are in the wrong order. The pass through the list is repeated
 * until the list is sorted.
 * 
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * Best Use Case: Small datasets, educational purposes, nearly sorted data
 */

async function bubbleSort() {
    console.log('🫧 Starting Bubble Sort');
    const n = state.array.length;
    
    // Outer loop: Controls the number of passes
    for (let i = 0; i < n - 1; i++) {
        if (state.stopRequested) break;
        
        let swapped = false; // Optimization: track if any swap occurred
        
        // Inner loop: Compare adjacent elements
        for (let j = 0; j < n - i - 1; j++) {
            if (state.stopRequested) break;
            
            // Highlight elements being compared
            highlightElements([j, j + 1], 'comparing');
            await sleep(getDelay());
            
            // Increment comparison counter
            state.statistics.comparisons++;
            state.statistics.arrayAccesses += 2;
            updateStatisticsDisplay();
            
            // Compare and swap if needed
            if (state.array[j].value > state.array[j + 1].value) {
                // Perform swap with animation
                highlightElements([j, j + 1], 'swapping');
                await sleep(getDelay());
                
                // Swap in array
                [state.array[j], state.array[j + 1]] = [state.array[j + 1], state.array[j]];
                
                state.statistics.swaps++;
                state.statistics.arrayAccesses += 4;
                updateStatisticsDisplay();
                
                // Re-render to show swap
                renderVisualization();
                highlightElements([j, j + 1], 'swapping');
                await sleep(getDelay());
                
                swapped = true;
            }
            
            // Clear highlights
            clearHighlights();
        }
        
        // Mark the last element of this pass as sorted
        highlightElement(n - i - 1, 'sorted');
        
        // Optimization: If no swap occurred, array is already sorted
        if (!swapped) {
            console.log('✅ Array already sorted, exiting early');
            break;
        }
    }
    
    // Mark first element as sorted
    if (!state.stopRequested) {
        highlightElement(0, 'sorted');
    }
    
    console.log('✅ Bubble Sort completed');
}

/**
 * Helper function: Optimized Bubble Sort (Cocktail Shaker Sort variant)
 * This can be used for better performance on certain datasets
 */
async function bubbleSortOptimized() {
    console.log('🫧 Starting Optimized Bubble Sort (Cocktail Shaker)');
    const n = state.array.length;
    let start = 0;
    let end = n - 1;
    let swapped = true;
    
    while (swapped && start < end) {
        if (state.stopRequested) break;
        swapped = false;
        
        // Forward pass
        for (let i = start; i < end; i++) {
            if (state.stopRequested) break;
            
            highlightElements([i, i + 1], 'comparing');
            await sleep(getDelay());
            
            state.statistics.comparisons++;
            state.statistics.arrayAccesses += 2;
            updateStatisticsDisplay();
            
            if (state.array[i].value > state.array[i + 1].value) {
                highlightElements([i, i + 1], 'swapping');
                await sleep(getDelay());
                
                [state.array[i], state.array[i + 1]] = [state.array[i + 1], state.array[i]];
                
                state.statistics.swaps++;
                state.statistics.arrayAccesses += 4;
                updateStatisticsDisplay();
                
                renderVisualization();
                highlightElements([i, i + 1], 'swapping');
                await sleep(getDelay());
                
                swapped = true;
            }
            
            clearHighlights();
        }
        
        highlightElement(end, 'sorted');
        end--;
        
        if (!swapped) break;
        swapped = false;
        
        // Backward pass
        for (let i = end; i > start; i--) {
            if (state.stopRequested) break;
            
            highlightElements([i - 1, i], 'comparing');
            await sleep(getDelay());
            
            state.statistics.comparisons++;
            state.statistics.arrayAccesses += 2;
            updateStatisticsDisplay();
            
            if (state.array[i - 1].value > state.array[i].value) {
                highlightElements([i - 1, i], 'swapping');
                await sleep(getDelay());
                
                [state.array[i - 1], state.array[i]] = [state.array[i], state.array[i - 1]];
                
                state.statistics.swaps++;
                state.statistics.arrayAccesses += 4;
                updateStatisticsDisplay();
                
                renderVisualization();
                highlightElements([i - 1, i], 'swapping');
                await sleep(getDelay());
                
                swapped = true;
            }
            
            clearHighlights();
        }
        
        highlightElement(start, 'sorted');
        start++;
    }
    
    console.log('✅ Optimized Bubble Sort completed');
}
