/**
 * COUNTING SORT ALGORITHM
 * 
 * Description: Counting Sort counts the occurrences of each unique element
 * and uses arithmetic to determine their positions in the sorted output.
 * 
 * Time Complexity: O(n + k) where k is the range of input
 * Space Complexity: O(k)
 * 
 * Best Use Case: Integer data with limited range (e.g., ratings 1-5, ages 0-100)
 */

async function countingSort() {
    console.log('🔢 Starting Counting Sort');
    const n = state.array.length;
    
    // Find minimum and maximum values
    let min = state.array[0].value;
    let max = state.array[0].value;
    
    for (let i = 1; i < n; i++) {
        highlightElement(i, 'comparing');
        await sleep(getDelay() / 4);
        
        state.statistics.arrayAccesses++;
        
        if (state.array[i].value < min) {
            min = state.array[i].value;
        }
        if (state.array[i].value > max) {
            max = state.array[i].value;
        }
        
        clearHighlights();
    }
    
    updateStatisticsDisplay();
    
    // Handle decimal values by scaling
    const scale = Math.pow(10, 2); // For 2 decimal places
    min = Math.floor(min * scale);
    max = Math.floor(max * scale);
    
    const range = max - min + 1;
    
    console.log(`Range: ${range} (min: ${min / scale}, max: ${max / scale})`);
    
    // Check if range is too large (memory optimization)
    if (range > 10000) {
        console.warn('⚠️ Range too large, falling back to Quick Sort');
        await quickSort();
        return;
    }
    
    // Create count array
    const count = new Array(range).fill(0);
    
    // Count occurrences
    for (let i = 0; i < n; i++) {
        if (state.stopRequested) break;
        
        highlightElement(i, 'comparing');
        await sleep(getDelay());
        
        const scaledValue = Math.floor(state.array[i].value * scale);
        const index = scaledValue - min;
        count[index]++;
        
        state.statistics.arrayAccesses++;
        updateStatisticsDisplay();
        
        clearHighlights();
    }
    
    console.log('Counting complete, building output...');
    
    // Modify count array to contain actual positions
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    const output = new Array(n);
    
    // Place elements in sorted order
    for (let i = n - 1; i >= 0; i--) {
        if (state.stopRequested) break;
        
        highlightElement(i, 'swapping');
        await sleep(getDelay());
        
        const scaledValue = Math.floor(state.array[i].value * scale);
        const index = scaledValue - min;
        const position = count[index] - 1;
        
        output[position] = state.array[i];
        count[index]--;
        
        state.statistics.arrayAccesses += 2;
        updateStatisticsDisplay();
        
        clearHighlights();
    }
    
    // Copy output array back to original array
    for (let i = 0; i < n; i++) {
        if (state.stopRequested) break;
        
        state.array[i] = output[i];
        
        highlightElement(i, 'sorted');
        renderVisualization();
        await sleep(getDelay() / 2);
        
        state.statistics.arrayAccesses++;
    }
    
    updateStatisticsDisplay();
    
    console.log('✅ Counting Sort completed');
}

/**
 * Helper function: Simple Counting Sort (for integers only)
 */
async function countingSortSimple() {
    console.log('🔢 Starting Simple Counting Sort');
    const n = state.array.length;
    
    // Convert to integers
    const intArray = state.array.map(item => ({
        ...item,
        value: Math.round(item.value)
    }));
    
    const min = Math.min(...intArray.map(item => item.value));
    const max = Math.max(...intArray.map(item => item.value));
    const range = max - min + 1;
    
    if (range > 1000) {
        console.warn('⚠️ Range too large');
        await quickSort();
        return;
    }
    
    // Create count array
    const count = new Array(range).fill(0);
    
    // Count occurrences
    for (let i = 0; i < n; i++) {
        if (state.stopRequested) break;
        
        highlightElement(i, 'comparing');
        await sleep(getDelay());
        
        count[intArray[i].value - min]++;
        state.statistics.arrayAccesses++;
        updateStatisticsDisplay();
        
        clearHighlights();
    }
    
    // Reconstruct sorted array
    let index = 0;
    for (let i = 0; i < range; i++) {
        if (state.stopRequested) break;
        
        while (count[i] > 0) {
            if (state.stopRequested) break;
            
            // Find an element with this value
            for (let j = 0; j < n; j++) {
                if (intArray[j].value === i + min && intArray[j].used !== true) {
                    state.array[index] = intArray[j];
                    intArray[j].used = true;
                    
                    highlightElement(index, 'sorted');
                    renderVisualization();
                    await sleep(getDelay() / 2);
                    
                    index++;
                    count[i]--;
                    state.statistics.arrayAccesses++;
                    break;
                }
            }
        }
    }
    
    updateStatisticsDisplay();
    console.log('✅ Simple Counting Sort completed');
}

/**
 * Helper function: Counting Sort for specific digit (used by Radix Sort)
 */
async function countingSortByDigit(exp, isRadix = false) {
    const n = state.array.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    
    // Count occurrences
    for (let i = 0; i < n; i++) {
        if (state.stopRequested) break;
        
        if (!isRadix) {
            highlightElement(i, 'comparing');
            await sleep(getDelay() / 4);
        }
        
        const digit = Math.floor((state.array[i].value / exp) % 10);
        count[digit]++;
        
        state.statistics.arrayAccesses++;
        
        if (!isRadix) {
            clearHighlights();
        }
    }
    
    // Modify count
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output
    for (let i = n - 1; i >= 0; i--) {
        if (state.stopRequested) break;
        
        if (!isRadix) {
            highlightElement(i, 'swapping');
            await sleep(getDelay() / 4);
        }
        
        const digit = Math.floor((state.array[i].value / exp) % 10);
        output[count[digit] - 1] = state.array[i];
        count[digit]--;
        
        state.statistics.arrayAccesses += 2;
        
        if (!isRadix) {
            clearHighlights();
        }
    }
    
    // Copy back
    for (let i = 0; i < n; i++) {
        if (state.stopRequested) break;
        
        state.array[i] = output[i];
        state.statistics.arrayAccesses++;
        
        if (!isRadix) {
            highlightElement(i, 'sorted');
            renderVisualization();
            await sleep(getDelay() / 4);
        }
    }
    
    updateStatisticsDisplay();
}

/**
 * Helper function: Counting Sort for ratings (optimized for 0-5 range)
 */
async function countingSortRating() {
    console.log('🔢 Starting Rating-Optimized Counting Sort');
    const n = state.array.length;
    
    // Scale ratings to 0-50 range (multiply by 10 for one decimal)
    const count = new Array(51).fill(0);
    
    // Count occurrences
    for (let i = 0; i < n; i++) {
        if (state.stopRequested) break;
        
        highlightElement(i, 'comparing');
        await sleep(getDelay());
        
        const rating = Math.round(state.array[i].value * 10);
        count[rating]++;
        
        state.statistics.arrayAccesses++;
        updateStatisticsDisplay();
        
        clearHighlights();
    }
    
    // Create buckets for each rating
    const buckets = Array.from({ length: 51 }, () => []);
    
    for (let i = 0; i < n; i++) {
        if (state.stopRequested) break;
        
        const rating = Math.round(state.array[i].value * 10);
        buckets[rating].push(state.array[i]);
        state.statistics.arrayAccesses++;
    }
    
    // Reconstruct array
    let index = 0;
    for (let i = 0; i < 51; i++) {
        if (state.stopRequested) break;
        
        for (let j = 0; j < buckets[i].length; j++) {
            if (state.stopRequested) break;
            
            state.array[index] = buckets[i][j];
            
            highlightElement(index, 'sorted');
            renderVisualization();
            await sleep(getDelay() / 2);
            
            index++;
            state.statistics.arrayAccesses++;
        }
    }
    
    updateStatisticsDisplay();
    console.log('✅ Rating-Optimized Counting Sort completed');
}
