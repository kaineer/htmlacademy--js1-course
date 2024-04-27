document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.querySelector("input[type='file']");
  const fileList = document.querySelector(".file-list");

  const redrawFileList = () => {
    fileList.innerHTML = "";
    let content = "";
    for (const file of fileInput.files) {
      const item = "<li>" + file.name + " <a href='' data-file='" + file.name + "'>x</a></li>";
      content += item;
    }
    fileList.innerHTML = content;
  }

  fileList.addEventListener("click", (e) => {
    e.preventDefault();
    const t = e.target;
    if (t.tagName.toLowerCase() === "a") {
      const dt = new DataTransfer();
      for (const file of fileInput.files) {
        if (file.name !== t.dataset.file) {
          dt.items.add(file);
        }
      }

      fileInput.files = dt.files;

      redrawFileList();
    }
  });

  fileInput.addEventListener("change", (e) => {
    redrawFileList();
  });
});
