const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

// 1. Sửa lại sự kiện cho nút Generate
generateBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("copy-btn")) {
        const hexValue = e.target.previousElementSibling.textContent;

        navigator.clipboard
            .writeText(hexValue) // Sửa hexVlaue -> hexValue, clearboard -> clipboard
            .then(() => showCopySuccess(e.target))
            .catch((err) => console.log(err));
            
    } else if (e.target.classList.contains("color")) { // Thêm .contains
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent; // Sửa nextElenmentSibling
        
        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
            .catch((err) => console.log(err));
    }
});

function showCopySuccess(element) {
    element.classList.remove("far", "fa-copy");
    element.classList.add("fas", "fa-check"); // Nên dùng fas cho tích xanh đậm nét hơn
    element.style.color = "#48bb78";

    setTimeout(() => {
        element.classList.remove("fas", "fa-check");
        element.classList.add("far", "fa-copy"); // Trả lại icon copy cũ
        element.style.color = "";
    }, 1500);
}

function generatePalette() {
    const colors = []; // Đổi tên cho đồng bộ

    for (let i = 0; i < 5; i++) { // Sửa dấu phẩy thành dấu chấm phẩy
        colors.push(generateRandomColor()); // Sửa tên hàm
    }

    updatePaletteDisplay(colors);
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF"; // Thêm số 0 và thêm chữ s (letters)
    let color = "#";

    for (let i = 0; i < 6; i++) { // Sửa dấu phẩy thành dấu chấm phẩy
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box, index) => {
        const color = colors[index]; // Lấy đúng mảng colors truyền vào
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}

// Gọi hàm chạy lần đầu khi vừa mở trang
generatePalette();
