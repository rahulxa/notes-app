let main = document.querySelector("#main");

const saveNote = () => {
    const textarea = document.querySelectorAll(".note textarea") //jitne divs bane h jinka class note h unke textarea ko access kara h
    const data = [];
    textarea.forEach((text) => {
        data.push(text.value);
    });
    if (data.length == 0) {
        localStorage.removeItem(textarea);
    }
    else {
        localStorage.setItem("textareatexts", JSON.stringify(data)); //method to save to local storage
    }
}

function addNote(text = "") {
    const noteBox = document.createElement("div");
    noteBox.classList.add("note");
    noteBox.innerHTML = `
        <div class="tool">
            <i class="save fas fa-save"></i>
            <i class="trash fas fa-trash"></i>
        </div>
        <textarea>${text}</textarea>`;

    main.appendChild(noteBox);
    saveNote();

    let trash = noteBox.querySelector(".trash");
    trash.addEventListener("click", () => {
        noteBox.remove();
        saveNote();
    })

    let save = noteBox.querySelector(".save");
    save.addEventListener("click", () => {
        saveNote();
    })
    noteBox.querySelector("note textarea").addEventListener("focusout", () => {
        saveNote();
    })
}

let btn = document.getElementById("addBtn");
btn.addEventListener("click", () => {
    addNote();
});

(function () {
    const lsnotes = JSON.parse(localStorage.getItem("textareatexts"));

    if (lsnotes === null) {
        addNote();
    } else {
        lsnotes.forEach((notes) => {
            addNote(notes);
        });
    }
})();