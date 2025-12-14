const input = await Deno.readTextFile("./days/6/input");

const lines = input.split("\r\n");

const numbers: number[][] = [];
const operators: string[] = [];

for (let i = 0; i < lines.length; i++) {
  const pieces = lines[i].split(" ").filter(p => p !== "");

    for (let j = 0; j < pieces.length; j++) {
      const piece = pieces[j];

      // Parse operators
      if (piece === "+" || piece === "*") {
        operators.push(piece);
        continue;
      }

      // Parse numbers
      const parsedNumber = parseInt(piece);
      if (Number.isNaN(parsedNumber)) throw new Error(`Invalid number or operator: ${piece}`);

      if (!numbers[j]) numbers.push([]);
      numbers[j].push(parsedNumber);
    }
}

if (numbers.length !== operators.length) throw new Error(`Length mismatch: ${numbers.length} vs ${operators.length}`);

// Do the operations
let result = 0;
for (let i = 0; i < numbers.length; i++) {
  const rowNumber = numbers[i];
  const operator = operators[i];

  let rowResult = 0;
  for (let j = 0; j < rowNumber.length; j++) {
    const number = rowNumber[j];

    switch (operator) {
      case "+":
        rowResult += number;
        break;
      case "*":
        if (!rowResult) rowResult = 1;

        rowResult *= number;
        break;
    }
  }

  result += rowResult;
}

console.log(result);
