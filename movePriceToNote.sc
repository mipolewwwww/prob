theme: /
    state: ПереносЦены
        q!: (перенеси цену|перемести стоимость)
            [из] [этой] [заметки]
            [в] [другую] [заметку]
            
        script:
            var sourceId = get_id_by_selected_item(get_request($context));
            var targetId = ($context.clientNotes && $context.clientNotes.targetNoteId) || null;
            
            if (!targetId) {
                $reactions.answer("Не могу определить целевую заметку. Пожалуйста, укажите её явно.");
                return;
            }
            
            movePriceToNote(sourceId, targetId, $context);
            
        random:
            a: Цена перенесена
            a: Стоимость перемещена
            a: Готово, сумма переведена