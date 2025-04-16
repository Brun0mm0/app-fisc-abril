document.addEventListener('DOMContentLoaded', () => {
    const toastElement = document.getElementById('toastError');
    const toastMessage = document.getElementById('toastErrorMessage');
    const toast = new bootstrap.Toast(toastElement, { delay: 5000 });

    window.addEventListener('api-error', (e) => {
        const {mensaje } = e.detail;

        toast.hide();
        toastMessage.textContent = mensaje;
        setTimeout(() => toast.show(), 100);
    });
});