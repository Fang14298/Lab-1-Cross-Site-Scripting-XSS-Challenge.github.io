const API_URL = 'http://localhost:3000/comments';

// ฟังก์ชันแสดงคอมเมนต์ (ปลอดภัย)
function displayComments(comments) {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';

    comments.forEach(comment => {
        const commentElement = document.createElement('div');

        // ✅ ใช้ textContent และ createTextNode เพื่อป้องกัน XSS
        const nameNode = document.createElement('strong');
        nameNode.textContent = comment.name;

        const textNode = document.createTextNode(': ' + comment.text);

        commentElement.appendChild(nameNode);
        commentElement.appendChild(textNode);

        commentsContainer.appendChild(commentElement);
    });
}

// โหลดคอมเมนต์จากเซิร์ฟเวอร์
function fetchComments() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => displayComments(data))
        .catch(error => console.error('โหลดคอมเมนต์ล้มเหลว:', error));
}

// ส่งคอมเมนต์ใหม่ไปยังเซิร์ฟเวอร์
function postComment(name, text) {
    const commentData = {
        name: name,
        text: text
    };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
    })
    .then(response => response.json())
    .then(() => fetchComments()) // โหลดใหม่หลังโพสต์
    .catch(error => console.error('โพสต์ล้มเหลว:', error));
}

// ตั้งค่าฟอร์ม
document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name-input').value;
    const comment = document.getElementById('comment-input').value;

    postComment(name, comment);
    this.reset(); // ล้างฟอร์ม
});

// โหลดคอมเมนต์เมื่อหน้าเว็บพร้อม
document.addEventListener('DOMContentLoaded', fetchComments);
