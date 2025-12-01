const input = await Deno.readTextFile("./days/1/input");

const lines = input.split("\r\n");

const MIN = 0;
const MAX = 99;

let result = 0;
let position = 50;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line) continue;

  const direction = line[0];
  const steps = parseInt(line.slice(1));
  if (Number.isNaN(steps)) throw new Error(`Invalid step: ${line.slice(1)}`);

  const initialPosition = position;

  // Handles when the steps make more than 1 full rotation
  const rangedSteps = steps % (MAX + 1);
  const rotations = ((steps - rangedSteps) / (MAX + 1));

  switch (direction) {
    case "R":
      position += rangedSteps;
      break;
    case "L":
      position -= rangedSteps;
      break;
    default:
      throw new Error(`Invalid direction: ${direction}`);
  }

  if (position < MIN) { // Handle lower limit
    const difference = Math.abs(position);

    position = MAX - difference + 1;
    if (initialPosition !== 0 && position !== 0) result++;
  } else if (position > MAX) { // Handle upper limit
    const difference = position - MAX;

    position = difference - 1;
    if (initialPosition !== 0 && position !== 0) result++;
  }

  if (position === 0) result++;
  result += rotations;
}

console.log(result)
