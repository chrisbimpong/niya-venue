function modify_qty(val) {
    var qty = document.getElementById('qty').value;
    var new_qty = parseInt(qty,10) + val;
    
    if (new_qty < 0) {
        new_qty = 0;
    }
    
    document.getElementById('qty').value = new_qty;
    return new_qty;
}

function modify_qtyNew(val) {
    var qtyNew = document.getElementById('qtyNew').value;
    var new_qtyNew = parseInt(qtyNew,10) + val;
    
    if (new_qtyNew < 0) {
        new_qtyNew = 0;
    }
    
    document.getElementById('qtyNew').value = new_qtyNew;
    return new_qtyNew;
}