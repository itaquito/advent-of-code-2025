const input = await Deno.readTextFile("./days/5/input");

const lines = input.split("\r\n");

type Range = {
  min: number;
  max: number;
}

// Parse the ranges from the file
let ranges: Range[] = [];
for (let i = 0; i < lines.length; i++) {
  const currentLine = lines[i];
  if (currentLine === "") break;

  const [min, max] = currentLine.split("-").map(number => {
    const parsed = parseInt(number);
    if (Number.isNaN(parsed)) throw new Error(`Invalid number ${number}`);

    return parsed;
  });

  ranges.push({ min, max })
}

// Merge all the ranges that can be merged
for (let i = 0; i < ranges.length; i++) {
  for (let j = i + 1; j < ranges.length; j++) {
    const mergedRanges = mergeRanges(ranges[i], ranges[j]);
    // No optimization made, can continue;
    if (!mergedRanges) continue;

    ranges = [
      // Removed optimized ranges
      ...ranges.filter((_, index) => index !== i && index !== j),
      mergedRanges
    ]

    // Restart from the beginning
    i = 0;
    j = 0;
  }
}

// Count the freshIDS of each range
let freshIDS = 0;
for (let i = 0; i < ranges.length; i++) {
  const { min, max } = ranges[i];

  const difference = max - min + 1;

  freshIDS += difference;
}

console.log(freshIDS);

function mergeRanges(rangeOne: Range, rangeTwo: Range): Range | null {
  // Check if the ranges are overlapping
  if (
    !(
      rangeOne.min >= rangeTwo.min && rangeOne.min <= rangeTwo.max // rangeOne.min is between rangeTwo
      ||
      rangeOne.max >= rangeTwo.min && rangeOne.max <= rangeTwo.max // rangeOne.max is between rangeTwo
      ||
      rangeTwo.min >= rangeOne.min && rangeTwo.min <= rangeOne.max // rangeTwo.min is between rangeOne
      ||
      rangeTwo.max >= rangeOne.min && rangeTwo.max <= rangeOne.max // rangeTwo.max is between rangeOne
    )
  ) return null; // If there are not overlapping, there is no merge we can do.

  const min = Math.min(rangeOne.min, rangeTwo.min);
  const max = Math.max(rangeOne.max, rangeTwo.max);

  return { min, max };
}


