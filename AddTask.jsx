import React from "react";
import "../App.css";

export class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "", // Текст заметки
      amount: "", // Сумма в рублях
    };
  }

  render() {
    const { onAdd } = this.props;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // Вызываем функцию onAdd с текстом заметки и суммой
          onAdd(this.state.note, parseFloat(this.state.amount) || 0);
          this.setState({
            note: "",
            amount: "",
          });
        }}
      >
        {/* Поле для ввода текста заметки */}
        <input
          className="add-task"
          type="text"
          placeholder="Add Note"
          value={this.state.note}
          onChange={({ target: { value } }) =>
            this.setState({ note: value })
          }
          required
          autoFocus
        />

        {/* Поле для ввода суммы в рублях */}
        <input
          className="add-task"
          type="number"
          placeholder="Amount in Rubles"
          value={this.state.amount}
          onChange={({ target: { value } }) =>
            this.setState({ amount: value })
          }
          required
        />

        {/* Кнопка для отправки формы */}
        <button type="submit" className="add-task">
          Добавьте покупку
        </button>
      </form>
    );
  }
}