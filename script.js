const fileInput = document.querySelector("input");
const downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault(); // preventing form from submit
  downloadBtn.innerText = 'Downloading file...';
  fetchFile(fileInput.value);
});

function fetchFile(url) {
  // fetching file and returning response as blob
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      // URL.createObjectURL creates a URL of passed object
      let tempUrl = URL.createObjectURL(file);
      let aTag = document.createElement("a");
      aTag.href = tempUrl; // passing tempUrl as href value of <a> tag
      aTag.download = url.replace(/^.*[\\\/]/, ""); // passing file last name & extension as download value of <a> tag
      document.body.appendChild(aTag);

      aTag.click(); // clicking <a> tag so the file download
      aTag.remove(); // remove <a> tag once the file downloads
      URL.revokeObjectURL(tempUrl);
      downloadBtn.innerText = 'Downloading File';
    }).catch(() => {
        downloadBtn.innerText = 'Downloading File';
        alert('Failed to download file');
    })
}
