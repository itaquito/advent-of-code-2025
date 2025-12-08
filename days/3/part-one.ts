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

  let largest = -Infinity;

  for (let a = 0; a < digits.length; a++) {
    for (let b = a + 1; b < digits.length; b++) {
      const joltage = (digits[a] * 10) + digits[b];

      if (joltage > largest) largest = joltage;
    }
  }

  result += largest;
}

console.log(result);
