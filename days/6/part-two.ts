const input = await Deno.readTextFile("./days/6/input");

const lines = input
  .split("\r\n")
  .filter(line => line)
  .map(line => line.split(""));

const maxRow = Math.max(...lines.map(line => line.length));
const maxColumn = lines.length;

let latestOperator = "";
let numbers: number[] = [];

let result = 0;

for (let row = 0; row < maxRow; row++) {
  let latestNumber = "";

  // Read the column
  for (let column = 0; column < maxColumn; column++) {
    const piece = lines[column][row];

    // Parse operators
    if (piece === "+" || piece === "*") {
      latestOperator = piece;
      continue;
    }

    // Parse numbers
    if (!Number.isNaN(parseInt(piece))) {
      latestNumber += piece;
    }
  }

  // If we have a number read, parse it and save it
  if (!Number.isNaN(parseInt(latestNumber))) numbers.push(parseInt(latestNumber));

  // If we didn't read any number, or we are on the latest column, do the calculations
  if (!latestNumber || (row + 1 === maxRow)) {
    if (!latestOperator) throw new Error("Operator missing");

    let columnResult = 0;
    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i];

      switch (latestOperator) {
        case "+":
          columnResult += number;
          break;
        case "*":
          if (!columnResult) columnResult = 1;

          columnResult *= number;
          break;
      }
    }

    result += columnResult;

    latestOperator = "";
    numbers = [];
  }
}

console.log(result);
