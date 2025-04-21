function addNote(note, context, price) {
    var noteData = {
        type: "add_note",
        note: note
    };
    
    if (price) {
        noteData.price = Math.round(price * 100) / 100;
    }
    
    addAction(noteData, context);
}

function deleteNote(id, context){
    addAction({
        type: "delete_note",
        id: id
    }, context);
}

function updateNotePrice(id, context, newPrice) {
    addAction({
        type: "update_note",
        id: id,
        update: {
            price: newPrice
        }
    }, context);
}

function updateNoteText(id, context, newText) {
    addAction({
        type: "update_note",
        id: id,
        update: {
            note: newText
        }
    }, context);
}

function movePriceToNote(sourceId, targetId, context) {
    addAction({
        type: "move_price",
        source_id: sourceId,
        target_id: targetId
    }, context);
}
