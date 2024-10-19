const fs = require("fs");

function decodeValue(base, value) {
  return parseInt(value, base);
}

function lagrangeInterpolation(points, k) {
  let constant = 0;

  for (let i = 0; i < k; i++) {
    const [xi, yi] = points[i];
    let li = 1;

    for (let j = 0; j < k; j++) {
      if (i !== j) {
        const [xj] = points[j];
        li *= (0 - xj) / (xi - xj);
      }
    }

    constant += yi * li;
  }

  return Math.round(constant);
}

function findSecretConstant(inputJson) {
  const { n, k } = inputJson.keys;

  const points = Object.keys(inputJson)
    .filter((key) => key !== "keys")
    .map((key) => {
      const x = parseInt(key);
      const base = parseInt(inputJson[key].base);
      const value = inputJson[key].value;

      const y = decodeValue(base, value);
      return [x, y];
    });

  points.sort((a, b) => a[0] - b[0]);

  return lagrangeInterpolation(points, k);
}

function processTestCase(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    const inputJson = JSON.parse(data);
    const secretConstant = findSecretConstant(inputJson);

    console.log(The secret constant (c) for ${filePath} is:, secretConstant);
  });
}

processTestCase("testCase1.json");
processTestCase("testCase2.json");
