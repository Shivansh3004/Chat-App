'use client';

import ReactSelect from "react-select";

interface SelectProps {
    disabled : boolean;
    label : string;
    value?: Record<string, any>;
    options : Record<string, any>[];
    onChange : (value : Record<string, any>)=>void;
}
const Select : React.FC<SelectProps> = ({disabled, label, value, options, onChange}) => {
    return (
        <div className="z-[100]">
            <label className="block text-sm font-semibold text-gray-900 leading-6">
                {label}
            </label>
            <div className="mt-6">
                <ReactSelect isDisabled={disabled} value={value} options={options} onChange={onChange} isMulti menuPortalTarget={document.body} styles={{
                    menuPortal: (base) => ({...base, zIndex: 9999})
                }}
                classNames = {{
                    control : ()=>"text-sm"
                }}
                />
            </div>
        </div>
    );
};

export default Select;