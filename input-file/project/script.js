const createFileList = (input, container) => {
  const data = {
    files: [],
  };

  const pullFiles = (dt, source, cond = (x) => true) => {
    for (const file of source) {
      if (cond(file)) {
        dt.items.add(file);
      }
    }
  }

  const commitDT = (dt) => {
    input.files = dt.files;
    data.files = [...dt.files];
  }

  const itemTemplate = (file) => {
    return (
      "<li>" + file.name + " <a href='' data-file='" +
      file.name + "'>x</a></li>"
    );
  }

  return {
    add(files) {
      const dt = new DataTransfer();
      pullFiles(dt, data.files);
      pullFiles(dt, files);
      commitDT(dt);
    },
    remove(fileName) {
      const dt = new DataTransfer();
      pullFiles(dt, data.files, (f) => f.name !== fileName);
      commitDT(dt);
    },
    render() {
      let content = "";
      for (const file of data.files) {
        content += itemTemplate(file);
      }
      container.innerHTML = content;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.querySelector("input[type='file']");
  const fileListEl = document.querySelector(".file-list");
  const fl = createFileList(fileInput, fileListEl);

  fileListEl.addEventListener("click", (e) => {
    e.preventDefault();

    const t = e.target;
    if (t.tagName.toLowerCase() === "a") {
      fl.remove(t.dataset.file);
      fl.render();
    }
  });

  fileInput.addEventListener("change", function (e) {
    fl.add(this.files);
    fl.render();
  });
});
