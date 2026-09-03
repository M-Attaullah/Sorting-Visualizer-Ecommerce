/**
 * RADIX SORT ALGORITHM
 * 
 * Description: Radix Sort processes individual digits of numbers, sorting from
 * least significant digit to most significant digit using a stable sorting algorithm
 * (typically counting sort) as a subroutine.
 * 
 * Time Complexity: O(d × n) where d is number of digits
 * Space Complexity: O(n + k)
 * 
 * Best Use Case: Integer data with fixed number of digits (e.g., product IDs, zip codes)
 */

async function radixSort() {
    console.log('🎰 Starting Radix Sort');
    const n = state.array.length;
    
    // Check if sorting criteria is rating (decimal values)
    const isRating = state.sortCriteria === 'rating';
    
    // Convert all values to integers
    // For ratings, multiply by 10 to preserve one decimal place (4.6 → 46)
    const intArray = state.array.map(item => ({
        ...item,
        originalValue: item.value,  // Save original value
        value: isRating ? Math.round(item.value * 10) : Math.round(Math.abs(item.value))
    }));
    
    state.array = intArray;
    renderVisualization();
    await sleep(getDelay());
    
    // Find maximum number to determine number of digits
    let max = state.array[0].value;
    for (let i = 1; i < n; i++) {
        highlightElement(i, 'comparing');
        await sleep(getDelay() / 4);
        
        state.statistics.arrayAccesses++;
        
        if (state.array[i].value > max) {
            max = state.array[i].value;
        }
        
        clearHighlights();
    }
    
    updateStatisticsDisplay();
    
    console.log(`Max value: ${max}`);
    
    // Perform counting sort for every digit
    // exp is 10^i where i is current digit number
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        if (state.stopRequested) break;
        
        console.log(`Sorting by digit at position ${Math.log10(exp) + 1}`);
        await radixCountingSortByDigit(exp);
        
        // Show intermediate result
        renderVisualization();
        await sleep(getDelay() * 2);
    }
    
    // Restore original values if rating sort
    if (isRating) {
        state.array = state.array.map(item => ({
            ...item,
            value: item.originalValue  // Restore decimal values (4.6, 4.2, etc.)
        }));
        renderVisualization();
    }
    
    console.log('✅ Radix Sort completed');
}

/**
 * Counting sort for a specific digit (stable sort)
 */
async function radixCountingSortByDigit(exp) {
    const n = state.array.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    
    // Store count of occurrences
    for (let i = 0; i < n; i++) {
        if (state.stopRequested) break;
        
        highlightElement(i, 'comparing');
        await sleep(getDelay());
        
        const digit = Math.floor((state.array[i].value / exp) % 10);
        count[digit]++;
        
        state.statistics.arrayAccesses++;
        updateStatisticsDisplay();
        
        clearHighlights();
    }
    
    // Change count[i] to contain actual position
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array (traverse from right to maintain stability)
    for (let i = n - 1; i >= 0; i--) {
        if (state.stopRequested) break;
        
        highlightElement(i, 'swapping');
        await sleep(getDelay());
        
        const digit = Math.floor((state.array[i].value / exp) % 10);
        output[count[digit] - 1] = state.array[i];
        count[digit]--;
        
        state.statistics.arrayAccesses += 2;
        updateStatisticsDisplay();
        
        clearHighlights();
    }
    
    // Copy output array to state.array
    for (let i = 0; i < n; i++) {
        if (state.stopRequested) break;
        
        state.array[i] = output[i];
        
        highlightElement(i, 'sorted');
        renderVisualization();
        await sleep(getDelay() / 2);
        
        state.statistics.arrayAccesses++;
    }
    
    updateStatisticsDisplay();
    
    // Clear sorted highlighting for next pass
    await sleep(getDelay());
    clearHighlights();
}

/**
 * Helper function: LSD (Least Significant Digit) Radix Sort
 * Sorts from rightmost digit to leftmost
 */
async function radixSortLSD() {
    console.log('🎰 Starting LSD Radix Sort');
    const n = state.array.length;
    
    // Convert to integers
    const intArray = state.array.map(item => ({
        ...item,
        value: Math.round(Math.abs(item.value))
    }));
    state.array = intArray;
    renderVisualization();
    
    // Find max to determine number of digits
    const max = Math.max(...state.array.map(item => item.value));
    const maxDigits = Math.floor(Math.log10(max)) + 1;
    
    console.log(`Max digits: ${maxDigits}`);
    
    // Process each digit from right to left
    for (let digit = 0; digit < maxDigits; digit++) {
        if (state.stopRequested) break;
        
        const exp = Math.pow(10, digit);
        console.log(`Processing digit ${digit + 1} (exp: ${exp})`);
        
        await radixCountingSortByDigit(exp);
        
        // Highlight progress
        for (let i = 0; i < n; i++) {
            highlightElement(i, 'comparing');
        }
        await sleep(getDelay());
        clearHighlights();
    }
    
    // Final highlight
    await markAllSorted();
    
    console.log('✅ LSD Radix Sort completed');
}

/**
 * Helper function: MSD (Most Significant Digit) Radix Sort
 * Sorts from leftmost digit to rightmost (recursive)
 */
async function radixSortMSD() {
    console.log('🎰 Starting MSD Radix Sort');
    const n = state.array.length;
    
    // Convert to integers
    const intArray = state.array.map(item => ({
        ...item,
        value: Math.round(Math.abs(item.value))
    }));
    state.array = intArray;
    renderVisualization();
    
    // Find max to determine number of digits
    const max = Math.max(...state.array.map(item => item.value));
    const maxDigits = Math.floor(Math.log10(max)) + 1;
    const exp = Math.pow(10, maxDigits - 1);
    
    await radixSortMSDHelper(0, n - 1, exp);
    
    console.log('✅ MSD Radix Sort completed');
}

async function radixSortMSDHelper(low, high, exp) {
    if (state.stopRequested || low >= high || exp < 1) {
        return;
    }
    
    const n = high - low + 1;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    
    // Count occurrences
    for (let i = low; i <= high; i++) {
        if (state.stopRequested) break;
        
        highlightElement(i, 'comparing');
        await sleep(getDelay() / 4);
        
        const digit = Math.floor((state.array[i].value / exp) % 10);
        count[digit]++;
        
        state.statistics.arrayAccesses++;
        clearHighlights();
    }
    
    updateStatisticsDisplay();
    
    // Calculate positions
    const positions = [0];
    for (let i = 0; i < 9; i++) {
        positions.push(positions[i] + count[i]);
    }
    
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output
    for (let i = high; i >= low; i--) {
        if (state.stopRequested) break;
        
        highlightElement(i, 'swapping');
        await sleep(getDelay() / 4);
        
        const digit = Math.floor((state.array[i].value / exp) % 10);
        output[count[digit] - 1] = state.array[i];
        count[digit]--;
        
        state.statistics.arrayAccesses += 2;
        clearHighlights();
    }
    
    // Copy back
    for (let i = 0; i < n; i++) {
        if (state.stopRequested) break;
        
        state.array[low + i] = output[i];
        highlightElement(low + i, 'sorted');
        state.statistics.arrayAccesses++;
    }
    
    renderVisualization();
    await sleep(getDelay());
    clearHighlights();
    updateStatisticsDisplay();
    
    // Recursively sort each bucket
    for (let i = 0; i < 10; i++) {
        if (state.stopRequested) break;
        
        const bucketStart = low + positions[i];
        const bucketEnd = (i < 9) ? low + positions[i + 1] - 1 : high;
        
        if (bucketEnd > bucketStart) {
            await radixSortMSDHelper(bucketStart, bucketEnd, Math.floor(exp / 10));
        }
    }
}

/**
 * Helper function: Radix Sort for Product IDs
 * Optimized for sorting product IDs (typically 4-5 digits)
 */
async function radixSortProductIDs() {
    console.log('🎰 Starting Product ID Radix Sort');
    const n = state.array.length;
    
    // Ensure we're working with product IDs
    const idArray = state.array.map(item => ({
        ...item,
        value: Math.round(Math.abs(item.value))
    }));
    
    state.array = idArray;
    renderVisualization();
    await sleep(getDelay());
    
    // Product IDs typically have fixed digits (e.g., 1001-9999)
    const maxDigits = 4; // Assuming 4-digit IDs
    
    for (let digit = 0; digit < maxDigits; digit++) {
        if (state.stopRequested) break;
        
        const exp = Math.pow(10, digit);
        console.log(`Sorting digit ${digit + 1}`);
        
        await radixCountingSortByDigit(exp);
        
        // Show intermediate result with animation
        for (let i = 0; i < n; i++) {
            highlightElement(i, 'comparing');
        }
        await sleep(getDelay() * 1.5);
        clearHighlights();
    }
    
    await markAllSorted();
    
    console.log('✅ Product ID Radix Sort completed');
}

/**
 * Helper function: Base-256 Radix Sort (for very large numbers)
 * Uses bytes instead of decimal digits for efficiency
 */
async function radixSortBase256() {
    console.log('🎰 Starting Base-256 Radix Sort');
    const n = state.array.length;
    
    // Convert to integers
    const intArray = state.array.map(item => ({
        ...item,
        value: Math.round(Math.abs(item.value))
    }));
    state.array = intArray;
    
    const max = Math.max(...state.array.map(item => item.value));
    const maxBytes = Math.ceil(Math.log(max + 1) / Math.log(256));
    
    console.log(`Processing ${maxBytes} bytes`);
    
    for (let byte = 0; byte < maxBytes; byte++) {
        if (state.stopRequested) break;
        
        const shift = byte * 8;
        await radixCountingSortByByte(shift);
        
        renderVisualization();
        await sleep(getDelay() * 2);
    }
    
    console.log('✅ Base-256 Radix Sort completed');
}

async function radixCountingSortByByte(shift) {
    const n = state.array.length;
    const output = new Array(n);
    const count = new Array(256).fill(0);
    
    // Count occurrences
    for (let i = 0; i < n; i++) {
        if (state.stopRequested) break;
        
        const byte = (state.array[i].value >> shift) & 0xFF;
        count[byte]++;
        state.statistics.arrayAccesses++;
    }
    
    // Calculate positions
    for (let i = 1; i < 256; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output
    for (let i = n - 1; i >= 0; i--) {
        if (state.stopRequested) break;
        
        const byte = (state.array[i].value >> shift) & 0xFF;
        output[count[byte] - 1] = state.array[i];
        count[byte]--;
        state.statistics.arrayAccesses += 2;
    }
    
    // Copy back
    for (let i = 0; i < n; i++) {
        if (state.stopRequested) break;
        
        state.array[i] = output[i];
        state.statistics.arrayAccesses++;
    }
    
    updateStatisticsDisplay();
}
