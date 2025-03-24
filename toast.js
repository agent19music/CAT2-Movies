class Toast {
    constructor() {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  
    show(message, type = 'success') {
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `
        <div class="toast-content">
          <span>${message}</span>
        </div>
      `;
      
      this.container.appendChild(toast);
      
      setTimeout(() => {
        toast.classList.add('toast-fade-in');
      }, 100);
  
      setTimeout(() => {
        toast.classList.add('toast-fade-out');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }
  }
  