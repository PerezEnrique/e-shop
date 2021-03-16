function InputGroup({ label, type = "text", name, value, onChange, error }) {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				className="form-control"
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={label}
			/>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
}

export default InputGroup;
