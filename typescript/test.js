function getRangesWithMinAndMaxProducts(items, minProd = 10, maxProd = 15) {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  const ranges = [];
  let i = 0;

  while (i < items.length) {
    let currentSum = 0;
    let startValue = items[i].value;
    let j = i;

    // Try to include as many as possible without exceeding maxProd
    while (
      j < items.length &&
      currentSum + items[j].numberOfProducts <= maxProd
    ) {
      currentSum += items[j].numberOfProducts;
      j++;
    }

    // Now, check if this group meets the min requirement
    if (currentSum >= minProd) {
      // Valid group
      ranges.push({
        min: startValue,
        max: items[j - 1].value,
      });
      i = j; // move to next unprocessed item
    } else {
      // Current group < minProd → can't form valid range
      // Two options:
      // 1. Force include if it's a single oversized item (> maxProd)
      // 2. Or skip (but then we'd hang). Better: take at least one item to avoid infinite loop.

      if (j === i) {
        // This means even one item > maxProd → take it alone
        ranges.push({
          min: items[i].value,
          max: items[i].value,
        });
        i++;
      } else {
        // We have a group < minProd AND ≤ maxProd → not valid
        // But to avoid dropping data, we can merge forward or backward
        // Simplest safe fallback: include it anyway (or skip — your choice)
        // Here, we'll **include it** to avoid data loss, but you can change this.
        ranges.push({
          min: startValue,
          max: items[j - 1].value,
        });
        i = j;
      }
    }
  }

  return ranges;
}

const data = [
  { value: 77, numberOfProducts: 16 },
  { value: 2, numberOfProducts: 14 },
  { value: 3, numberOfProducts: 5 }, // total so far = 12 → >=10 → range {1,3}
  { value: 4, numberOfProducts: 2 },
  { value: 5, numberOfProducts: 9 }, // total = 11 → range {4,5}
  { value: 6, numberOfProducts: 10 }, // total = 10 → range {6,6}
  { value: 7, numberOfProducts: 3 },
  { value: 8, numberOfProducts: 4 }, // total = 7 → <10 → not included (unless you uncomment the leftover block)
];

console.log(getRangesWithMinAndMaxProducts(data));
