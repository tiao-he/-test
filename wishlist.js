class Wishlist {
    constructor() {
        this.items = [];
        this.init();
    }

    init() {
        // 初始化事件监听
        this.bindEvents();
        this.updateCartCount();
    }

    bindEvents() {
        // 加入心愿单按钮
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-wishlist-btn')) {
                this.addItem(e.target.closest('.add-to-wishlist-btn'));
            }
            
            if (e.target.closest('.remove-from-wishlist')) {
                this.removeItem(e.target.closest('.remove-from-wishlist').dataset.id);
            }
        });

        // 购物车悬停效果
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('mouseenter', () => this.showCartPreview());
            cartBtn.addEventListener('mouseleave', () => this.hideCartPreview());
        }
    }

    addItem(btn) {
        const id = btn.dataset.id;
        const existingItem = this.items.find(item => item.id === id);
        
        if (existingItem) {
            this.showToast(`${btn.dataset.name} 已在心愿单中`);
            return;
        }

        this.items.push({
            id: id,
            name: btn.dataset.name,
            price: btn.dataset.price,
            img: btn.dataset.img
        });

        // 更新按钮状态
        btn.classList.add('added');
        btn.innerHTML = '<i class="fa fa-heart mr-1"></i> 已加入';

        this.updateCartCount();
        this.showToast(`${btn.dataset.name} 已加入心愿单`);
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateCartCount();
        this.updateCartPreview();
        
        // 重置对应按钮状态
        const btn = document.querySelector(`.add-to-wishlist-btn[data-id="${id}"]`);
        if (btn) {
            btn.classList.remove('added');
            btn.innerHTML = '<i class="fa fa-heart-o mr-1"></i> 加入心愿单';
        }
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.items.length;
        }
    }

    showCartPreview() {
        let preview = document.getElementById('cartPreview');
        if (!preview) {
            preview = document.createElement('div');
            preview.id = 'cartPreview';
            preview.className = 'cart-preview';
            document.body.appendChild(preview);
        }
        
        preview.innerHTML = this.generatePreviewContent();
        preview.style.display = 'block';
    }

    hideCartPreview() {
        const preview = document.getElementById('cartPreview');
        if (preview) {
            preview.style.display = 'none';
        }
    }

    generatePreviewContent() {
        if (this.items.length === 0) {
            return '<div class="empty-preview">心愿单是空的</div>';
        }

        return `
            <div class="preview-items">
                ${this.items.map(item => `
                    <div class="preview-item">
                        <img src="${item.img}" alt="${item.name}">
                        <div class="preview-info">
                            <span>${item.name}</span>
                            <span>¥${item.price}</span>
                        </div>
                        <button class="remove-from-wishlist" data-id="${item.id}">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.remove();
            }, 2000);
        }, 10);
    }
}

// 初始化心愿单
document.addEventListener('DOMContentLoaded', () => {
    new Wishlist();
});