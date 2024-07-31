
function handleAction(requestId, action) {
    fetch(`/handle_request/${requestId}/${action}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            let row = document.querySelector(`tr[data-id="${requestId}"]`);
            let statusCell = row.querySelector('.status');
            if (action === 'accept') {
                statusCell.textContent = 'Accepted';
            } else if (action === 'deny') {
                statusCell.textContent = 'Denied';
            } else if (action === 'message') {
                statusCell.textContent = 'Being Reviewed';
            }
        } else {
            alert('Error handling request');
        }
    });
}
