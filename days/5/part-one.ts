const input = await Deno.readTextFile("./days/5/input");

const lines = input.split("\r\n");

const ranges: {
  min: number;
  max: number;
}[] = [];

let freshIDS = 0;
let status: "RANGES" | "IDS" = "RANGES";

for (let i = 0; i < lines.length; i++) {
  const currentLine = lines[i];
  if (currentLine === "") {
    status = "IDS";
    continue;
  }

  if (status === "RANGES") {
    const [min, max] = currentLine.split("-").map(number => {
      const parsed = parseInt(number);
      if (Number.isNaN(parsed)) throw new Error(`Invalid number ${number}`);

      return parsed;
    });

    ranges.push({ min, max });

    continue;
  }

  if (status == "IDS") {
    const currentID = parseInt(currentLine);
    if (Number.isNaN(currentID)) throw new Error(`Invalid number ${currentID}`);

    for (let j = 0; j < ranges.length; j++) {
      const { min, max } = ranges[j];

      if (currentID >= min && currentID <= max) {
        freshIDS++;
        break;
      }
    }
  }
}

console.log(freshIDS);
