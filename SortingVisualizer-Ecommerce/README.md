# 🎯 Sorting Visualizer + E-Commerce Demo

A comprehensive sorting algorithm visualizer with e-commerce product data integration, built for university DAA (Design and Analysis of Algorithms) project.

## 📋 Features

### ✨ Sorting Algorithms Implemented
1. **Bubble Sort** - Simple comparison-based algorithm
2. **Selection Sort** - Minimal swap operations
3. **Insertion Sort** - Efficient for nearly sorted data
4. **Merge Sort** - Divide and conquer approach
5. **Quick Sort** - Fast average-case performance
6. **Heap Sort** - Guaranteed O(n log n) performance
7. **Counting Sort** - Linear time for limited range data
8. **Radix Sort** - Digit-by-digit sorting for integers

### 🎨 Visualization Features
- **Dual View Mode**:
  - 📊 **Bars View**: Visual representation with colored bars
  - 🛒 **Products View**: Real product cards with images, prices, and ratings
  
- **Color-Coded States**:
  - 🟣 Default (Purple gradient)
  - 🟡 Comparing (Yellow)
  - 🔴 Swapping (Red)
  - 🟢 Sorted (Green)
  - 🟣 Pivot (Purple)

- **Real-Time Statistics**:
  - Comparisons count
  - Swaps count
  - Array accesses
  - Time elapsed

### ⚙️ Customization Options
- **Array Size**: 5 to 50 elements
- **Speed Control**: 5 levels (Very Slow to Very Fast)
- **Sort Criteria**:
  - Price
  - Rating
  - Product ID
  - Random values

### 📊 Algorithm Information Display
- Time Complexity
- Space Complexity
- Best Use Cases

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- No additional dependencies required!

### Installation
1. Download or clone the project
2. Open `index.html` in your web browser
3. Start visualizing!

```bash
# If you want to use a local server
cd SortingVisualizer-Ecommerce
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```

## 📁 Project Structure

```
SortingVisualizer-Ecommerce/
│
├── index.html              # Main HTML file with UI structure
├── style.css               # Complete styling and animations
├── script.js               # Core application logic and event handling
│
├── algorithms/             # Sorting algorithm implementations
│   ├── bubble.js          # Bubble Sort + Optimized variant
│   ├── selection.js       # Selection Sort + Stable variant
│   ├── insertion.js       # Insertion Sort + Binary/Shell variants
│   ├── merge.js           # Merge Sort + Iterative/Natural variants
│   ├── quick.js           # Quick Sort + Hoare/Median-of-Three/3-Way variants
│   ├── heap.js            # Heap Sort + Min Heap/K-ary variants
│   ├── counting.js        # Counting Sort + Rating-optimized variant
│   └── radix.js           # Radix Sort + LSD/MSD/Base-256 variants
│
└── data/
    └── products.json      # Sample e-commerce product data (20 items)
```

## 🎮 How to Use

1. **Select Algorithm**: Choose from 8 different sorting algorithms
2. **Choose Sort Criteria**: Price, Rating, Product ID, or Random values
3. **Select View Mode**: Toggle between Bars and Products view
4. **Adjust Array Size**: Use slider to change number of elements (5-50)
5. **Set Speed**: Control animation speed (1-5)
6. **Generate Array**: Click to create a new random array
7. **Start Sorting**: Watch the algorithm visualize in real-time!
8. **Stop Anytime**: Pause the sorting process if needed

## 🔬 Algorithm Complexity Reference

| Algorithm | Time Complexity (Best) | Time Complexity (Average) | Time Complexity (Worst) | Space Complexity |
|-----------|----------------------|-------------------------|------------------------|------------------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |
| Counting Sort | O(n + k) | O(n + k) | O(n + k) | O(k) |
| Radix Sort | O(d × n) | O(d × n) | O(d × n) | O(n + k) |

*Note: k = range of input, d = number of digits*

## 💡 Use Cases for Each Algorithm

- **Bubble Sort**: Educational purposes, very small datasets
- **Selection Sort**: Small datasets, memory writes are costly
- **Insertion Sort**: Nearly sorted data, small datasets, online sorting
- **Merge Sort**: Large datasets, stable sorting required, external sorting
- **Quick Sort**: Large datasets, average-case performance critical
- **Heap Sort**: Finding top K elements, priority queues
- **Counting Sort**: Integer data with limited range (ratings 0-5)
- **Radix Sort**: Fixed-digit integers (product IDs, zip codes)

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients, animations, and flexbox/grid
- **Vanilla JavaScript**: Pure JS with async/await for animations
- **JSON**: Data storage for products

### Key Features in Code
- **Modular Architecture**: Each algorithm in separate file
- **Async/Await**: Smooth animations without blocking
- **State Management**: Centralized state object
- **Event-Driven**: Responsive UI interactions
- **Responsive Design**: Works on desktop and mobile

### Code Highlights
```javascript
// Global state management
const state = {
    array: [],
    products: [],
    arraySize: 15,
    speed: 3,
    algorithm: 'bubble',
    sortCriteria: 'price',
    viewMode: 'bars',
    isSorting: false,
    statistics: { ... }
};

// Async visualization with sleep
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Highlight elements during sorting
function highlightElement(index, className) {
    const element = state.viewMode === 'bars' 
        ? document.getElementById(`bar-${index}`)
        : document.getElementById(`product-${index}`);
    
    if (element) {
        element.className = state.viewMode === 'bars' ? 'bar' : 'product-card';
        if (className) element.classList.add(className);
    }
}
```

## 🎓 Educational Value

This project demonstrates:
- Algorithm implementation and optimization
- Time and space complexity analysis
- Visual learning and comprehension
- Real-world data structure applications
- Modern web development practices
- Asynchronous programming
- Event-driven architecture

## 🤝 Contributing

Feel free to fork this project and add:
- New sorting algorithms (Tim Sort, Shell Sort, etc.)
- Additional visualization modes
- Performance benchmarking
- Sound effects
- Export/Import data features
- Algorithm comparison mode

## 📝 License

This project is created for educational purposes as part of a university DAA project.

## 👨‍💻 Author

Created for DAA University Project - 2025

## 🙏 Acknowledgments

- Reference implementation inspired by: [Sorting Visualizer by Kethan Tummala](https://github.com/Kethantummala/Sorting_Visualizer)
- Product images from Unsplash
- Modern UI design patterns from contemporary web applications

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure JavaScript is enabled
3. Try a different browser
4. Clear browser cache and reload

---

**Made with ❤️ for learning and visualizing algorithms!**

*Insha Allah, this project will help you understand sorting algorithms better! 🚀*
