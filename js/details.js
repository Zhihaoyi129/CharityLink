// 详情页面JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const eventDetailsContainer = document.getElementById('event-details');
    const registerModal = document.getElementById('register-modal');
    const closeModal = document.querySelector('.close');
    const confirmBtn = document.getElementById('confirm-btn');

    // 从URL获取活动ID
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    if (!eventId) {
        CharityApp.showError(eventDetailsContainer, 'Invalid activity ID.');
        return;
    }

    // 获取活动详情
    fetch(`${CharityApp.API_BASE_URL}/events/${eventId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('The activity does not exist.');
            }
            return response.json();
        })
        .then(event => {
            displayEventDetails(event);
        })
        .catch(error => {
            console.error('Failed to obtain event details.:', error);
            CharityApp.showError(eventDetailsContainer, 'Failed to load the activity details.');
        });

    function displayEventDetails(event) {
        const progressPercentage = (event.current_amount / event.target_amount * 100).toFixed(1);
        
        eventDetailsContainer.innerHTML = `
            <article class="event-detail-card">
                <header class="event-header">
                    <h1>${event.name}</h1>
                    <span class="event-category">${event.category_name}</span>
                </header>
                
                <div class="event-meta">
                    <div class="meta-item">
                        <strong>📅 date:</strong> ${CharityApp.formatDate(event.event_date)}
                    </div>
                    <div class="meta-item">
                        <strong>📍 address:</strong> ${event.location}
                    </div>
                    <div class="meta-item">
                        <strong>🎫 ticket rates:</strong> ${CharityApp.formatCurrency(event.ticket_price)}
                    </div>
                </div>
                
                <div class="event-description">
                    <h3>activity description</h3>
                    <p>${event.description}</p>
                </div>
                
                <div class="fundraising-progress">
                    <h3>Fundraising progress</h3>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                    </div>
                    <div class="progress-text">
                        ${CharityApp.formatCurrency(event.current_amount)} / ${CharityApp.formatCurrency(event.target_amount)} (${progressPercentage}%)
                    </div>
                </div>
                
                <div class="event-actions">
                    <button id="register-btn" class="btn-primary">Register immediately to participate</button>
                </div>
            </article>
        `;

        // 添加注册按钮事件
        document.getElementById('register-btn').addEventListener('click', function() {
            registerModal.style.display = 'block';
        });
    }

    // 模态框关闭事件
    closeModal.addEventListener('click', function() {
        registerModal.style.display = 'none';
    });

    confirmBtn.addEventListener('click', function() {
        registerModal.style.display = 'none';
    });

    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });
});