const table = document.querySelector("#studentTable");
const form = document.querySelector("#studentForm");
const formTitle = document.querySelector("#formTitle");
const formMessage = document.querySelector("#formMessage");
const saveButton = document.querySelector("#saveButton");
const resetButton = document.querySelector("#resetButton");
const majorSearch = document.querySelector("#majorSearch");
const studentCount = document.querySelector("#studentCount");
const healthStatus = document.querySelector("#healthStatus");
const confirmDeleteModal = document.querySelector("#confirmDeleteModal");
const confirmDeleteButton = document.querySelector("#confirmDeleteButton");
const cancelDeleteButton = document.querySelector("#cancelDeleteButton");

const fields = {
    id: document.querySelector("#studentId"),
    fullName: document.querySelector("#fullName"),
    email: document.querySelector("#email"),
    major: document.querySelector("#major"),
    gpa: document.querySelector("#gpa")
};

let deletingStudentId = null;

async function request(url, options = {}) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        },
        ...options
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw error;
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

function studentPayload() {
    return {
        fullName: fields.fullName.value.trim(),
        email: fields.email.value.trim(),
        major: fields.major.value.trim(),
        gpa: Number(fields.gpa.value)
    };
}

function fillForm(student) {
    fields.id.value = student.id;
    fields.fullName.value = student.fullName;
    fields.email.value = student.email;
    fields.major.value = student.major;
    fields.gpa.value = student.gpa;
    formTitle.textContent = `Sửa sinh viên #${student.id}`;
    saveButton.textContent = "Cập nhật";
    formMessage.textContent = "";
}

function resetForm() {
    form.reset();
    fields.id.value = "";
    formTitle.textContent = "Thêm sinh viên";
    saveButton.textContent = "Lưu";
    formMessage.textContent = "";
}

function renderStudents(students) {
    studentCount.textContent = `${students.length} sinh viên`;

    if (students.length === 0) {
        table.innerHTML = `<tr><td class="empty" colspan="6">Chưa có sinh viên nào</td></tr>`;
        return;
    }

    table.innerHTML = students.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.fullName}</td>
            <td>${student.email}</td>
            <td>${student.major}</td>
            <td>${student.gpa.toFixed(1)}</td>
            <td>
                <span class="row-actions">
                    <button type="button" data-edit="${student.id}">Sửa</button>
                    <button type="button" class="danger" data-delete="${student.id}">Xóa</button>
                </span>
            </td>
        </tr>
    `).join("");
}

async function loadStudents() {
    const keyword = majorSearch.value.trim();
    const query = keyword ? `?major=${encodeURIComponent(keyword)}` : "";
    const students = await request(`/api/students${query}`);
    renderStudents(students);
}

async function checkHealth() {
    try {
        const health = await request("/api/health");
        healthStatus.textContent = `API ${health.status}`;
        healthStatus.classList.remove("error");
    } catch {
        healthStatus.textContent = "API lỗi";
        healthStatus.classList.add("error");
    }
}

function formatError(error) {
    if (error.fields) {
        return Object.values(error.fields).join(". ");
    }

    return error.error || "Có lỗi xảy ra";
}

function openDeleteModal(studentId) {
    deletingStudentId = studentId;
    confirmDeleteModal.removeAttribute("hidden");
    confirmDeleteModal.classList.remove("hidden");
}

function closeDeleteModal() {
    deletingStudentId = null;
    confirmDeleteModal.classList.add("hidden");
    confirmDeleteModal.setAttribute("hidden", "");
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = fields.id.value;
    const method = id ? "PUT" : "POST";
    const url = id ? `/api/students/${id}` : "/api/students";

    try {
        await request(url, {
            method,
            body: JSON.stringify(studentPayload())
        });
        resetForm();
        await loadStudents();
    } catch (error) {
        formMessage.textContent = formatError(error);
    }
});

resetButton.addEventListener("click", resetForm);

majorSearch.addEventListener("input", () => {
    loadStudents().catch(error => {
        formMessage.textContent = formatError(error);
    });
});

table.addEventListener("click", async (event) => {
    const editId = event.target.dataset.edit;
    const deleteId = event.target.dataset.delete;

    if (editId) {
        const student = await request(`/api/students/${editId}`);
        fillForm(student);
    }

    if (deleteId) {
        openDeleteModal(deleteId);
    }
});

confirmDeleteButton.addEventListener("click", async () => {
    if (!deletingStudentId) {
        closeDeleteModal();
        return;
    }

    try {
        await request(`/api/students/${deletingStudentId}`, { method: "DELETE" });
        closeDeleteModal();
        resetForm();
        await loadStudents();
    } catch (error) {
        closeDeleteModal();
        formMessage.textContent = formatError(error);
    }
});

cancelDeleteButton.addEventListener("click", closeDeleteModal);

confirmDeleteModal.addEventListener("click", (event) => {
    if (event.target === confirmDeleteModal) {
        closeDeleteModal();
    }
});

closeDeleteModal();
checkHealth();
loadStudents();
