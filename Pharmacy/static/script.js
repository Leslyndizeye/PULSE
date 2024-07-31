document.getElementById('add-product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let quantity = document.getElementById('quantity').value;

    fetch('/add_product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({name: name, quantity: quantity}),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload(); // Reload the page to reflect the changes
        } else {
            alert('Error adding product.');
        }
    });
});

function deleteProduct(productId) {
    fetch(`/delete_product/${productId}`, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.querySelector(`tr[data-id="${productId}"]`).remove(); // Remove the row from the table
        } else {
            alert('Error deleting product.');
        }
    });
}
