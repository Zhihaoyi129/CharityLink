// 搜索页面JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const clearBtn = document.getElementById('clear-btn');
    const resultsContainer = document.getElementById('search-results');
    const categorySelect = document.getElementById('category');
    const errorMessage = document.getElementById('error-message');

    // 加载类别选项
    loadCategories();

    // 表单提交事件
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch();
    });

    // 清除按钮事件
    clearBtn.addEventListener('click', function() {
        searchForm.reset();
        resultsContainer.innerHTML = '';
        errorMessage.style.display = 'none';
    });

    function loadCategories() {
        fetch(`${CharityApp.API_BASE_URL}/categories`)
            .then(response => response.json())
            .then(categories => {
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.name;
                    option.textContent = category.name;
                    categorySelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Failed to load category:', error);
            });
    }

    function performSearch() {
        const formData = new FormData(searchForm);
        const params = new URLSearchParams();
        
        // 添加非空参数
        for (const [key, value] of formData.entries()) {
            if (value.trim() !== '') {
                params.append(key, value);
            }
        }

        CharityApp.showLoading(resultsContainer);
        errorMessage.style.display = 'none';

        fetch(`${CharityApp.API_BASE_URL}/events/search?${params}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Search failed');
                }
                return response.json();
            })
            .then(events => {
                displaySearchResults(events);
            })
            .catch(error => {
                console.error('Search error:', error);
                CharityApp.showError(resultsContainer, 'Search failed. Please check your network connection.');
            });
    }

    function displaySearchResults(events) {
        if (events.length === 0) {
            resultsContainer.innerHTML = '<p>No matching activities were found.</p>';
            return;
        }

        resultsContainer.innerHTML = events.map(event => `
            <div class="event-card">
                <h3><a href="event-details.html?id=${event.id}">${event.name}</a></h3>
                <p><strong>category:</strong> ${event.category_name}</p>
                <p><strong>date:</strong> ${CharityApp.formatDate(event.event_date)}</p>
                <p><strong>address:</strong> ${event.location}</p>
                <p><strong>ticket rates:</strong> ${CharityApp.formatCurrency(event.ticket_price)}</p>
                <a href="event-details.html?id=${event.id}" class="btn-primary">view details</a>
            </div>
        `).join('');
    }
});