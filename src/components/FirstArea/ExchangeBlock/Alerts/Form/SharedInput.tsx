export interface InputData {
    label: string;
    placeholder?: string;
    onChange: (key: any) => any;
    value: string;
}

const SharedInput = ({
    label,
    onChange,
    value,
    placeholder
}: InputData) => (
    <div className="form-input-area">
        <div className="form-input-label">{label}</div>
        <input
            className="form-input sm"
            type="text"
            value={value}
            onChange={onChange}
            {
                ...(placeholder ? {placeholder} : {})
            }
        />
    </div>
);

export default SharedInput;