const input = await Deno.readTextFile("./days/2/input");

const idRanges = input.replace("\r\n", "").split(",");

let result = 0;

for (let i = 0; i < idRanges.length; i++) {
  const currentIDRage = idRanges[i];
  const [startRaw, endRaw] = currentIDRage.split("-");

  const start = parseInt(startRaw);
  const end = parseInt(endRaw);
  if (Number.isNaN(start) || Number.isNaN(end)) throw new Error(`Invalid number: ${startRaw} ${endRaw}`);

  for (let j = start; j <= end; j++) {
    const currentID = j.toString();

    // Only IDs with even length can have a duplicate
    if ((currentID.length % 2) !== 0) continue;

    // Get the first and second half
    const firstHalf = currentID.slice(0, currentID.length / 2);
    const secondHalf = currentID.slice(currentID.length / 2);

    // The ID is duplicated twice
    if (firstHalf === secondHalf) result += j;
  }
}

console.log(result);
