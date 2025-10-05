// 通用工具函数
const CharityApp = {
    // API基础URL
    API_BASE_URL: 'http://localhost:3000/api',
    
    // 显示加载状态
    showLoading: function(element) {
        element.innerHTML = '<div class="loading">loading...</div>';
    },
    
    // 显示错误消息
    showError: function(element, message) {
        element.innerHTML = `<div class="error-message">${message}</div>`;
    },
    
    // 格式化日期
    formatDate: function(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('zh-CN', options);
    },
    
    // 格式化货币
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('zh-CN', {
            style: 'currency',
            currency: 'CNY'
        }).format(amount);
    }
};

// 通用DOM操作函数
function createElement(tag, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.innerHTML = content;
    return element;
}