const input = await Deno.readTextFile("./days/4/input");

const rows = input
  .split("\r\n")
  .filter(line => line)
  .map(line => line.split(""));

let valid = 0;
for (let x = 0; x < rows.length; x++) {
  const column  = rows[x];

  for (let y = 0; y < column.length; y++) {
    const isRollOfPaper = column[y] === "@";
    if (!isRollOfPaper) continue;

    const adjacentRollsOfPaper = countAdjacentRollsOfPaper(rows, x, y);
    if (adjacentRollsOfPaper < 4) valid++;
  }
}

console.log(valid);

function countAdjacentRollsOfPaper(grid: string[][], x: number, y: number) {
  let count = 0;

  for (let currentX = x - 1; currentX <= x + 1; currentX++) {
    for (let currentY = y - 1; currentY <= y + 1; currentY++) {
      if (grid[currentX]?.[currentY] === "@" && !(currentX === x && currentY === y)) count++;
    }
  }

  return count;
}
