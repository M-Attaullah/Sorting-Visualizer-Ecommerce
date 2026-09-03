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

## 🎮 How to Use

1. Select a sorting algorithm.
2. Select the sorting criterion.
3. Choose **Bars** or **Products** view.
4. Adjust the array size if required.
5. Set the visualization speed.
6. Generate a new array.
7. Click **Start Sorting** to begin the visualization.
8. Use **Stop** to interrupt an ongoing sorting process.
9. Monitor comparisons, swaps, array accesses, and elapsed time during execution.


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

## 📁 Project Structure

```text
SortingVisualizer-Ecommerce/
│
├── index.html
├── style.css
├── script.js
│
├── algorithms/
│   ├── bubble.js
│   ├── selection.js
│   ├── insertion.js
│   ├── merge.js
│   ├── quick.js
│   ├── heap.js
│   ├── counting.js
│   └── radix.js
│
├── data/
│   └── products.json
│
├── PROJECT-SUMMARY.md
└── QUICKSTART.md
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

## 🎓 Project Purpose

This project was developed as a **Design & Analysis of Algorithms (DAA)** university project to provide an interactive way to understand how different sorting algorithms work, compare their behavior, and observe their operations through real-time visualization.

The integration of e-commerce product data demonstrates how sorting algorithms can be applied to practical datasets using attributes such as price, rating, and product ID.

## 👨‍💻 Author

**M Attaullah**

Bachelor of Science in Software Engineering
Air University Multan Campus

---

*Built as an academic project to explore and visualize sorting algorithms through interactive web development.*

*Insha Allah, this project will help you understand sorting algorithms better! 🚀*
