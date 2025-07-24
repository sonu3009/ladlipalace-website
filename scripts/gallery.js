// Gallery and Photo Upload functionality for Laldli Palace Guest House

document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery script loaded');
    
    // Check if all required elements exist
    const requiredElements = {
        uploadArea: document.getElementById('uploadArea'),
        photoInput: document.getElementById('photoInput'),
        uploadPreview: document.getElementById('uploadPreview'),
        uploadBtn: document.getElementById('uploadBtn'),
        galleryGrid: document.getElementById('galleryGrid')
    };
    
    console.log('Required elements:', requiredElements);
    
    initializeGallery();
    initializePhotoUpload();
    initializeGalleryModal();
    
    console.log('Gallery initialization complete');
});

// Gallery initialization
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openGalleryModal(index);
        });
    });
}

// Photo upload functionality
function initializePhotoUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const photoInput = document.getElementById('photoInput');
    const uploadPreview = document.getElementById('uploadPreview');
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadLink = document.querySelector('.upload-link');
    
    // Check if all elements exist
    if (!uploadArea || !photoInput || !uploadPreview || !uploadBtn) {
        console.error('Upload elements not found');
        return;
    }
    
    let selectedFiles = [];
    
    // Click to browse files
    if (uploadLink) {
        uploadLink.addEventListener('click', function(e) {
            e.preventDefault();
            photoInput.click();
        });
    }
    
    uploadArea.addEventListener('click', function(e) {
        if (e.target === uploadArea || e.target.classList.contains('upload-content') || e.target.closest('.upload-content')) {
            photoInput.click();
        }
    });
    
    // File input change
    photoInput.addEventListener('change', function(e) {
        handleFileSelection(e.target.files);
    });
    
    // Drag and drop functionality
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFileSelection(e.dataTransfer.files);
    });
    
    // Upload button click
    uploadBtn.addEventListener('click', function() {
        if (selectedFiles.length > 0) {
            uploadPhotos(selectedFiles);
        }
    });
    
    function handleFileSelection(files) {
        console.log('Files selected:', files.length);
        
        const validFiles = Array.from(files).filter(file => {
            // Check file type
            if (!file.type.startsWith('image/')) {
                showUploadMessage('Please select only image files.', 'error');
                return false;
            }
            
            // Check file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                showUploadMessage('Please select images smaller than 5MB.', 'error');
                return false;
            }
            
            return true;
        });
        
        console.log('Valid files:', validFiles.length);
        
        if (validFiles.length > 0) {
            selectedFiles = [...selectedFiles, ...validFiles];
            displayPreview();
            uploadBtn.style.display = selectedFiles.length > 0 ? 'inline-block' : 'none';
            console.log('Total selected files:', selectedFiles.length);
        }
    }
    
    function displayPreview() {
        console.log('Displaying preview for', selectedFiles.length, 'files');
        uploadPreview.innerHTML = '';
        
        selectedFiles.forEach((file, index) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            
            const img = document.createElement('img');
            const reader = new FileReader();
            
            reader.onload = function(e) {
                img.src = e.target.result;
                console.log('Image loaded for preview:', file.name);
            };
            
            reader.onerror = function() {
                console.error('Error reading file:', file.name);
            };
            
            reader.readAsDataURL(file);
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'preview-remove';
            removeBtn.innerHTML = '×';
            removeBtn.addEventListener('click', function() {
                removeFile(index);
            });
            
            const info = document.createElement('div');
            info.className = 'preview-info';
            info.textContent = `${file.name} (${formatFileSize(file.size)})`;
            
            previewItem.appendChild(img);
            previewItem.appendChild(removeBtn);
            previewItem.appendChild(info);
            uploadPreview.appendChild(previewItem);
        });
    }
    
    function removeFile(index) {
        selectedFiles.splice(index, 1);
        displayPreview();
        uploadBtn.style.display = selectedFiles.length > 0 ? 'inline-block' : 'none';
    }
    
    function uploadPhotos(files) {
        showUploadLoading(true);
        uploadBtn.disabled = true;
        
        // Simulate upload process
        setTimeout(() => {
            // In a real application, you would upload files to your server here
            addPhotosToGallery(files);
            
            // Reset upload state
            selectedFiles = [];
            uploadPreview.innerHTML = '';
            photoInput.value = '';
            uploadBtn.style.display = 'none';
            uploadBtn.disabled = false;
            
            showUploadLoading(false);
            showUploadMessage(`Successfully uploaded ${files.length} photo(s)!`, 'success');
        }, 2000);
    }
    
    function addPhotosToGallery(files) {
        const galleryGrid = document.getElementById('galleryGrid');
        
        if (!galleryGrid) {
            console.error('Gallery grid not found');
            return;
        }
        
        console.log('Adding', files.length, 'photos to gallery');
        
        files.forEach((file, fileIndex) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item user-uploaded';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'User uploaded photo';
                
                const overlay = document.createElement('div');
                overlay.className = 'gallery-overlay';
                overlay.innerHTML = '<i class="fas fa-expand"></i>';
                
                galleryItem.appendChild(img);
                galleryItem.appendChild(overlay);
                
                // Add click event for modal
                galleryItem.addEventListener('click', function() {
                    const allItems = document.querySelectorAll('.gallery-item');
                    const index = Array.from(allItems).indexOf(galleryItem);
                    openGalleryModal(index);
                });
                
                galleryGrid.appendChild(galleryItem);
                console.log('Added photo to gallery:', file.name);
                
                // Add animation
                setTimeout(() => {
                    galleryItem.style.animation = 'fadeInUp 0.5s ease forwards';
                }, 100 * fileIndex);
            };
            
            reader.onerror = function() {
                console.error('Error reading file for gallery:', file.name);
            };
            
            reader.readAsDataURL(file);
        });
    }
}

// Gallery modal functionality
function initializeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.gallery-close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentImageIndex = 0;
    let galleryImages = [];
    
    function updateGalleryImages() {
        galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
    }
    
    window.openGalleryModal = function(index) {
        updateGalleryImages();
        currentImageIndex = index;
        showModalImage();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    function showModalImage() {
        if (galleryImages[currentImageIndex]) {
            modalImage.src = galleryImages[currentImageIndex].src;
            modalImage.alt = galleryImages[currentImageIndex].alt;
        }
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function showPrevImage() {
        updateGalleryImages();
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
        showModalImage();
    }
    
    function showNextImage() {
        updateGalleryImages();
        currentImageIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
        showModalImage();
    }
    
    // Event listeners
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Close modal when clicking outside image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
}

// Utility functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function showUploadMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.upload-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `upload-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message
    const uploadSection = document.querySelector('.upload-section');
    const uploadArea = document.getElementById('uploadArea');
    uploadSection.insertBefore(messageDiv, uploadArea);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv) {
            messageDiv.remove();
        }
    }, 5000);
}

function showUploadLoading(show) {
    let loadingDiv = document.querySelector('.upload-loading');
    
    if (show) {
        if (!loadingDiv) {
            loadingDiv = document.createElement('div');
            loadingDiv.className = 'upload-loading';
            loadingDiv.innerHTML = `
                <div class="spinner"></div>
                <p>Uploading photos...</p>
            `;
            
            const uploadSection = document.querySelector('.upload-section');
            const uploadBtn = document.getElementById('uploadBtn');
            uploadSection.insertBefore(loadingDiv, uploadBtn);
        }
        loadingDiv.style.display = 'block';
    } else {
        if (loadingDiv) {
            loadingDiv.style.display = 'none';
        }
    }
}

// Gallery filtering functionality
function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Initialize gallery filters if filter buttons exist
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        initializeGalleryFilters();
    }
});

// Image compression before upload
function compressImage(file, maxWidth = 1920, quality = 0.8) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = function() {
            // Calculate new dimensions
            let { width, height } = img;
            
            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);
            
            canvas.toBlob(resolve, 'image/jpeg', quality);
        };
        
        img.src = URL.createObjectURL(file);
    });
}

// Enhanced file handling with compression
async function handleFileSelectionWithCompression(files) {
    const compressedFiles = [];
    
    for (const file of files) {
        if (file.type.startsWith('image/') && file.size > 1024 * 1024) { // Compress files larger than 1MB
            try {
                const compressedFile = await compressImage(file);
                compressedFiles.push(new File([compressedFile], file.name, { type: 'image/jpeg' }));
            } catch (error) {
                console.error('Error compressing image:', error);
                compressedFiles.push(file);
            }
        } else {
            compressedFiles.push(file);
        }
    }
    
    return compressedFiles;
}

// Progressive image loading
function addProgressiveLoading() {
    const images = document.querySelectorAll('.gallery-item img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
}

// Initialize progressive loading
document.addEventListener('DOMContentLoaded', addProgressiveLoading);

// Add CSS for progressive loading
const progressiveCSS = `
    .gallery-item img {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .gallery-item img.loaded {
        opacity: 1;
    }
`;

// Inject progressive loading CSS
const style = document.createElement('style');
style.textContent = progressiveCSS;
document.head.appendChild(style);

// Gallery search functionality
function initializeGallerySearch() {
    const searchInput = document.getElementById('gallerySearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                const img = item.querySelector('img');
                const alt = img.alt.toLowerCase();
                
                if (alt.includes(searchTerm) || searchTerm === '') {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Initialize search if search input exists
document.addEventListener('DOMContentLoaded', initializeGallerySearch);
