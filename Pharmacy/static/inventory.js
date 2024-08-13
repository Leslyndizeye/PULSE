function calculateNewQuantity(index) {
    const dailyUpdateInput = document.getElementById(`dailyUpdate-${index}`);
    const newQuantityCell = document.getElementById(`newQuantity-${index}`);
    const currentQuantity = parseInt(newQuantityCell.textContent, 10);
    const dailyUpdate = parseInt(dailyUpdateInput.value, 10);

    if (!isNaN(dailyUpdate)) {
        newQuantityCell.textContent = currentQuantity + dailyUpdate;
    }
}

function updateProduct(index) {
    const dailyUpdate = document.getElementById(`dailyUpdate-${index}`).value;

    fetch('/update_inventory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `index=${index}&dailyUpdate=${dailyUpdate}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Product updated successfully!');
            // Optionally, you can refresh the page or update the table data here.
        } else {
            alert('Failed to update product.');
        }
    });
}

function deleteProduct(index) {
    fetch('/delete_product/' + index, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('inventoryTable').deleteRow(index);
            alert('Product deleted successfully!');
        } else {
            alert('Failed to delete product.');
        }
    });
}

function searchProducts() {
    const input = document.getElementById('search-bar');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('inventoryTable');
    const tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td')[0];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}
