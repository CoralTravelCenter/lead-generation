export function inputMask(tel) {
	//Возвращаем из поля ввода только цифры
	const getInputNumbersValue = (input) => input.value.replace(/\D/g, '');

	const onPhonePaste = (e) => {
		const input = e.target;
		const inputNumbersValue = getInputNumbersValue(input);
		const pasted = e.clipboardData || window.clipboardData;
		if (pasted) {
			const pastedText = pasted.getData('Text');
			if (/\D/g.test(pastedText)) {
				// Попытка вставить нечисловой символ — удалить все нечисловые символы,
				// форматирование будет в обработчике onPhoneInput
				input.value = inputNumbersValue;
				return;
			}
		}
	};

	const onPhoneInput = (e) => {
		const input = e.target;
		let inputNumbersValue = getInputNumbersValue(input);
		const selectionStart = input.selectionStart;
		let formattedInputValue = '';

		if (!inputNumbersValue) {
			return (input.value = '');
		}

		if (input.value.length != selectionStart) {
			// Редактирование в середине ввода, а не в последнем символе
			if (e.data && /\D/g.test(e.data)) {
				// Попытка ввести нечисловой символ
				input.value = inputNumbersValue;
			}
			return;
		}

		const first_simbol_includes_right_numbers = ['7', '8', '9'].includes(inputNumbersValue[0]);
		if (first_simbol_includes_right_numbers) {
			if (inputNumbersValue[0] == '9') inputNumbersValue = `7${inputNumbersValue}`;
			const firstSymbols = inputNumbersValue[0] == '8' ? '8' : '+7';
			formattedInputValue = input.value = `${firstSymbols} `;
			if (inputNumbersValue.length > 1) {
				formattedInputValue += `(${inputNumbersValue.substring(1, 4)}`;
			}
			if (inputNumbersValue.length >= 5) {
				formattedInputValue += `) ${inputNumbersValue.substring(4, 7)}`;
			}
			if (inputNumbersValue.length >= 8) {
				formattedInputValue += `-${inputNumbersValue.substring(7, 9)}`;
			}
			if (inputNumbersValue.length >= 10) {
				formattedInputValue += `-${inputNumbersValue.substring(9, 11)}`;
			}
		} else {
			formattedInputValue = `+${inputNumbersValue.substring(0, 16)}`;
		}
		input.value = formattedInputValue;
	};
	const onPhoneKeyDown = (e) => {
		// Очистить ввод после удаления последнего символа
		const inputValue = e.target.value.replace(/\D/g, '');
		if (e.keyCode == 8 && inputValue.length == 1) e.target.value = '';
	};
	tel.addEventListener('keydown', onPhoneKeyDown);
	tel.addEventListener('input', onPhoneInput, false);
	tel.addEventListener('paste', onPhonePaste, false);
}