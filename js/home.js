// 首页JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const eventsContainer = document.getElementById('events-container');
    
    // 从API获取活动数据
    fetch(`${CharityApp.API_BASE_URL}/events`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response is abnormal.');
            }
            return response.json();
        })
        .then(events => {
            console.log('Activity Data:', events);
            displayEvents(events);
        })
        .catch(error => {
            console.error('Failed to obtain activity data:', error);
            CharityApp.showError(eventsContainer, 'Failed to load activity data. Please try again later.');
        });

    function displayEvents(events) {
        if (events.length === 0) {
            eventsContainer.innerHTML = '<p class="no-events">There are no activities at the moment.</p>';
            return;
        }

        eventsContainer.innerHTML = events.map(event => {
            // 安全地处理金额数据
            const currentAmount = parseFloat(event.current_amount) || 0;
            const targetAmount = parseFloat(event.target_amount) || 1;
            let progressPercentage = 0;
            
            if (targetAmount > 0) {
                progressPercentage = Math.min((currentAmount / targetAmount * 100), 100);
            }
            
            const progressDisplay = progressPercentage.toFixed(1);
            
            return `
                <div class="event-card">
                    <h3><a href="event-details.html?id=${event.id}">${event.name}</a></h3>
                    <div class="event-meta">
                        <span class="category-tag">${event.category_name}</span>
                        <span class="event-date">${CharityApp.formatDate(event.event_date)}</span>
                    </div>
                    <p class="location">${event.location}</p>
                    <div class="price-target">
                        <div class="price">
                            <strong>${CharityApp.formatCurrency(event.ticket_price)}</strong>
                            <span>ticket rates</span>
                        </div>
                        <div class="target">
                            <strong>${CharityApp.formatCurrency(targetAmount)}</strong>
                            <span>aim</span>
                        </div>
                    </div>
                    <div class="progress-section">
                        <div class="progress-header">
                            <span>Fundraising progress</span>
                            <span>${progressDisplay}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressDisplay}%"></div>
                        </div>
                        <div class="progress-text">
                            Have raised ${CharityApp.formatCurrency(currentAmount)}
                        </div>
                    </div>
                    <a href="event-details.html?id=${event.id}" class="btn-view-details">view details</a>
                </div>
            `;
        }).join('');
    }
});