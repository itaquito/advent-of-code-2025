const input = await Deno.readTextFile("./days/3/input");

const lines = input.split("\r\n").filter(line => line);

let result = 0;

for (let i = 0; i < lines.length; i++) {
  const currentLine = lines[i];
  
  const digits = currentLine.split("").map(digit => {
    const parsed = parseInt(digit);
    if (Number.isNaN(parsed)) throw new Error(`Invalid digit ${digit}`);

    return parsed;
  });

  const startOffset = digits.length - 12;
  const joltages = digits.slice(digits.length - 12, digits.length).map((digit, index) => ({ digit, index: index + startOffset }));

  for (let j = 0; j < joltages.length; j++) {
    // Search a new largest number from left to right
    const endIndex = (joltages[j - 1]?.index + 1) || 0;
    const startIndex = joltages[j].index - 1;

    for (let k = startIndex; k >= endIndex; k--) {
      const currentDigit = digits[k];

      // New largest number
      if (currentDigit >= joltages[j].digit) joltages[j] = {
        digit: currentDigit,
        index: k
      }
    }
  }

  // Convert to number
  result += parseInt(joltages.map(joltage => joltage.digit).join(""))
}

console.log(result);
