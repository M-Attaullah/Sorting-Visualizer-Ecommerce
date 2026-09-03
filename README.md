# 🎯 Sorting Visualizer + E-Commerce Demo

An interactive web-based **sorting algorithm visualizer** developed as a university **Design & Analysis of Algorithms (DAA)** project. The application visualizes sorting algorithms in real time while allowing the algorithms to operate on e-commerce product data using different sorting criteria.

## 📋 Features

### 🔢 Sorting Algorithms

The project implements the following sorting algorithms with additional variants:

* **Bubble Sort**

  * Standard Bubble Sort
  * Cocktail Shaker Sort
* **Selection Sort**

  * Standard Selection Sort
  * Stable Selection Sort
* **Insertion Sort**

  * Standard Insertion Sort
  * Binary Insertion Sort
  * Shell Sort
* **Merge Sort**

  * Standard Merge Sort
  * Iterative Merge Sort
  * Natural Merge Sort
* **Quick Sort**

  * Standard Quick Sort
  * Hoare Partition
  * Median-of-Three
  * 3-Way Partition
* **Heap Sort**

  * Standard Heap Sort
  * Min Heap variant
  * K-ary Heap variant
* **Counting Sort**

  * Standard Counting Sort
  * Rating-optimized variant
* **Radix Sort**

  * LSD Radix Sort
  * MSD Radix Sort
  * Product ID Radix Sort
  * Base-256 Radix Sort

### 🎨 Visualization

* Real-time animated sorting process
* **Bars View** for visualizing array values
* **Products View** for visualizing e-commerce products
* Color-coded sorting states:

  * Default
  * Comparing
  * Swapping
  * Sorted
  * Pivot
* Visual legend explaining sorting states
* Smooth sorting animations
* Start and stop controls

### 📊 Sorting Statistics

The application tracks sorting activity in real time:

* Comparisons
* Swaps
* Array accesses
* Elapsed time

### ⚙️ Sorting Controls

* Select the sorting algorithm
* Select sorting criteria:

  * Price
  * Rating
  * Product ID
  * Random values
* Adjust array size from **5 to 50 elements**
* Adjust visualization speed across **5 levels**
* Generate a new random array
* Stop an ongoing sorting process

### 🛒 E-Commerce Data

The project integrates sample product data containing:

* Product names
* Product IDs
* Prices
* Ratings
* Product images

Products can be sorted using their available numeric attributes and displayed as product cards during visualization.

### 📚 Algorithm Information

The interface provides information for the selected algorithm, including:

* Time complexity
* Space complexity
* Best use cases

## 🚀 Getting Started

### Prerequisites

* Modern web browser such as Chrome, Firefox, Edge, or Safari
* Python 3.x *(only required if using the optional local server)*

No external JavaScript framework or package installation is required.

### Installation

1. Clone or download the repository.
2. Open the project folder.
3. Open `index.html` directly in a browser.

Alternatively, run a local server:

```bash
cd SortingVisualizer-Ecommerce
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
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

## 🛠️ Technologies Used

* **HTML5** — Application structure
* **CSS3** — Styling, layouts, gradients, animations, and responsive design
* **Vanilla JavaScript** — Sorting logic, visualization, state management, and event handling
* **JSON** — E-commerce product data
* **Python HTTP Server** — Optional local development server

## 🧠 DAA Concepts Demonstrated

* Comparison-based sorting
* Non-comparison sorting
* Divide-and-conquer algorithms
* Heap-based sorting
* Stable sorting
* Sorting algorithm variants
* Time and space complexity
* Algorithm visualization
* Performance statistics
* Real-world data sorting

## 🎓 Project Purpose

This project was developed as a **Design & Analysis of Algorithms (DAA)** university project to provide an interactive way to understand how different sorting algorithms work, compare their behavior, and observe their operations through real-time visualization.

The integration of e-commerce product data demonstrates how sorting algorithms can be applied to practical datasets using attributes such as price, rating, and product ID.

## 👨‍💻 Author

**M Attaullah**

Bachelor of Science in Software Engineering
Air University Multan Campus

---

*Built as an academic project to explore and visualize sorting algorithms through interactive web development.*
