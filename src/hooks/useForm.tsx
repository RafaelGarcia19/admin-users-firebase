import { useState, ChangeEvent } from 'react';

export const useForm = <T extends object>(initialState: T) => {
	const [formState, setFormState] = useState(initialState);

	const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			[target.name]: target.value,
		});
	};

	const onResetForm = () => {
		setFormState(initialState);
	};

	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,
	};
};
