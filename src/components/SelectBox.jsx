import Select from 'react-select';

export default function SelectBox({
  labelDescription = 'Descrição do label:',
  inputValue = 'Valor padrão do input',
  onSelectChange = null,
  id = 'id_do_select_box',
  autoFocus = false,
}) {
  function handleSelectChange({ currentTarget }) {
    if (onSelectChange) {
      const newValue = currentTarget.value;
      onSelectChange(newValue);
    }
  }
  return (
    <div className="flex flex-col m-0 p-2">
      <label className="text-xl mb-2" htmlFor={id}>
        {labelDescription}
      </label>

      <input
        autoFocus={autoFocus}
        id={id}
        className="border p-2 mb-2"
        type="radio"
        value={inputValue}
        onChange={handleSelectChange}
      />

      <option></option>
    </div>
  );
}
