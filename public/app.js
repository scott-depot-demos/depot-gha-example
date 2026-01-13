// State management
let records = [];
let currentRecordId = null;

// DOM elements
const recordsGrid = document.getElementById('records-grid');
const emptyState = document.getElementById('empty-state');
const recordCount = document.getElementById('record-count');
const addRecordBtn = document.getElementById('add-record-btn');
const recordModal = document.getElementById('record-modal');
const deleteModal = document.getElementById('delete-modal');
const recordForm = document.getElementById('record-form');
const modalClose = document.getElementById('modal-close');
const deleteModalClose = document.getElementById('delete-modal-close');
const cancelBtn = document.getElementById('cancel-btn');
const deleteCancelBtn = document.getElementById('delete-cancel-btn');
const deleteConfirmBtn = document.getElementById('delete-confirm-btn');
const modalTitle = document.getElementById('modal-title');

// Load records on page load
document.addEventListener('DOMContentLoaded', () => {
    loadRecords();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    addRecordBtn.addEventListener('click', () => openAddModal());
    modalClose.addEventListener('click', closeModal);
    deleteModalClose.addEventListener('click', closeDeleteModal);
    cancelBtn.addEventListener('click', closeModal);
    deleteCancelBtn.addEventListener('click', closeDeleteModal);
    deleteConfirmBtn.addEventListener('click', confirmDelete);
    recordForm.addEventListener('submit', handleFormSubmit);
    
    // Close modals when clicking outside
    recordModal.addEventListener('click', (e) => {
        if (e.target === recordModal) closeModal();
    });
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) closeDeleteModal();
    });
}

// Load all records
async function loadRecords() {
    try {
        const response = await fetch('/api/records');
        records = await response.json();
        renderRecords();
        updateRecordCount();
    } catch (error) {
        console.error('Error loading records:', error);
        recordsGrid.innerHTML = '<div class="loading">Error loading records. Please refresh the page.</div>';
    }
}

// Render records
function renderRecords() {
    if (records.length === 0) {
        recordsGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    recordsGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    
    recordsGrid.innerHTML = records.map(record => `
        <div class="record-card">
            <div class="record-header">
                <div class="record-title">
                    <div class="record-artist">${escapeHtml(record.artist)}</div>
                    <div class="record-album">${escapeHtml(record.album)}</div>
                </div>
                <div class="record-actions">
                    <button class="btn-icon edit" onclick="openEditModal('${record.id}')" title="Edit">
                        ✏️
                    </button>
                    <button class="btn-icon delete" onclick="openDeleteModal('${record.id}')" title="Delete">
                        🗑️
                    </button>
                </div>
            </div>
            <div class="record-details">
                ${record.year ? `<div class="record-detail"><strong>Year:</strong> ${record.year}</div>` : ''}
                ${record.genre ? `<div class="record-detail"><strong>Genre:</strong> ${escapeHtml(record.genre)}</div>` : ''}
                <div class="record-detail"><strong>Condition:</strong> ${escapeHtml(record.condition)}</div>
            </div>
            ${record.notes ? `<div class="record-notes">${escapeHtml(record.notes)}</div>` : ''}
        </div>
    `).join('');
}

// Update record count
function updateRecordCount() {
    recordCount.textContent = records.length;
}

// Open add modal
function openAddModal() {
    currentRecordId = null;
    modalTitle.textContent = 'Add Record';
    recordForm.reset();
    document.getElementById('record-id').value = '';
    document.getElementById('condition').value = 'Good';
    recordModal.classList.add('show');
}

// Open edit modal
async function openEditModal(id) {
    currentRecordId = id;
    const record = records.find(r => r.id === id);
    if (!record) return;
    
    modalTitle.textContent = 'Edit Record';
    document.getElementById('record-id').value = record.id;
    document.getElementById('artist').value = record.artist;
    document.getElementById('album').value = record.album;
    document.getElementById('year').value = record.year || '';
    document.getElementById('genre').value = record.genre || '';
    document.getElementById('condition').value = record.condition || 'Good';
    document.getElementById('notes').value = record.notes || '';
    
    recordModal.classList.add('show');
}

// Close modal
function closeModal() {
    recordModal.classList.remove('show');
    currentRecordId = null;
    recordForm.reset();
}

// Handle form submit
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        artist: document.getElementById('artist').value,
        album: document.getElementById('album').value,
        year: document.getElementById('year').value,
        genre: document.getElementById('genre').value,
        condition: document.getElementById('condition').value,
        notes: document.getElementById('notes').value
    };
    
    try {
        let response;
        if (currentRecordId) {
            // Update existing record
            response = await fetch(`/api/records/${currentRecordId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        } else {
            // Create new record
            response = await fetch('/api/records', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        }
        
        if (!response.ok) {
            const error = await response.json();
            alert(error.error || 'Error saving record');
            return;
        }
        
        closeModal();
        loadRecords();
    } catch (error) {
        console.error('Error saving record:', error);
        alert('Error saving record. Please try again.');
    }
}

// Open delete modal
function openDeleteModal(id) {
    currentRecordId = id;
    const record = records.find(r => r.id === id);
    if (!record) return;
    
    document.getElementById('delete-record-info').textContent = 
        `${record.artist} - ${record.album}`;
    deleteModal.classList.add('show');
}

// Close delete modal
function closeDeleteModal() {
    deleteModal.classList.remove('show');
    currentRecordId = null;
}

// Confirm delete
async function confirmDelete() {
    if (!currentRecordId) return;
    
    try {
        const response = await fetch(`/api/records/${currentRecordId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            alert('Error deleting record');
            return;
        }
        
        closeDeleteModal();
        loadRecords();
    } catch (error) {
        console.error('Error deleting record:', error);
        alert('Error deleting record. Please try again.');
    }
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions available globally for onclick handlers
window.openEditModal = openEditModal;
window.openDeleteModal = openDeleteModal;
