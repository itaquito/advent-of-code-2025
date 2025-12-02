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
    const maxChunkSize = Math.floor(currentID.length / 2);

    // Divide the ID into all the possible ways
    for (let k = 0; k <= maxChunkSize; k++) {
      // Invalid chunk size, all chunk sizes must be the same
      if (currentID.length % k !== 0) continue;

      const chunks = arrayToChunks(currentID.split(""), k);

      // If all the chunks are the same
      if (areArrayElementsEqual(chunks)) {
        result += j;
        break;
      }
    }
  }
}

console.log(result);

// Divide an array into chunks of chunkSize
function arrayToChunks<T>(array: T[], chunkSize: number) {
  const chunks: T[][] = [];

  const chunkAmount = array.length / chunkSize;

  for (let i = 0; i < (chunkAmount * chunkSize); i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
}

// Check if all the elements in an array of arrays are equal
function areArrayElementsEqual(array: unknown[][]) {
  const set = new Set(array.map((a) => a.join("-")));

  return set.size === 1;
}

