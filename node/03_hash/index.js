
const crypto = require("crypto");
const fetch = require("node-fetch");
const fs = require("fs");
const filePath = process.argv[2];
const isWeb = filePath.startsWith('http');

if (!isWeb) {
  fileCase();
} else {
  webCase();
};

function fileCase() {
  console.log(isWeb)
  fs.readFile(filePath, (error, data) => {
    if (error) {
      console.error("Reading issues");
      process.exit(100);
    } else {
      fs.readFile(filePath + ".sha256", "utf-8", (error, hash_data) => {
        if (error) {
          console.error("Hash file reading issues");
          process.exit(101);
        } else {
          const hash = crypto.createHash("sha256").update(data);
          const ffHash = hash.digest("hex");
          const sfHash = hash_data.trim();
          if (ffHash === sfHash) {
            console.log("identical");
            process.exit(0);
          } else {
            console.error("the problem of identity");
            process.exit(102);
          };
        };
      });
    };
  });
};
async function webCase() {
  const response = await fetch(filePath);
  if (!response.ok && response.status !== 404) {
    console.error('Error');
    process.exit(response.status);
  };
  if (response.status === 404) {
    console.error("Reading issues");
    process.exit(100);
  };
  const data = await response.buffer();
  const responseSha = await fetch(filePath + '.sha256');
  if (!responseSha.ok && responseSha.status !== 404) {
    console.error('Error');
    process.exit(responseSha.status);
  };
  if (responseSha.status === 404) {
    console.error("Hash file reading issues");
    process.exit(101);
  };
  const data_sha = await responseSha.text();
  const hash = crypto.createHash("sha256").update(data);
  const ffHash = hash.digest("hex");
  const sfHash = data_sha.trim();
  if (ffHash === sfHash) {
    console.log("identical");
    process.exit(0);
  } else {
    console.error("the problem of identity");
    process.exit(102);
  };
};
