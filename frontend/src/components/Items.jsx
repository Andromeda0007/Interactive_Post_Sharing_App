import React from 'react'

const Items = (props) => {
    const {title, Icon, selected, onClick} = props;

    const handleClick = () => {
        if (onClick) {
            onClick(title);
        }
    };
    
  return (
    <div className={`Icon flex gap-4 p-[6px] rounded-lg text-lg pl-3 items-center text-gray-700
     cursor-pointer hover:scale-[1.02] hover:font-semibold
    ${selected? "bg-gray-200 scale-[1.04] hover:scale-[1.04] font-semibold text-gray-900 "  : ""}
    `} onClick={handleClick}>
        <Icon />
        <p className=''> {title} </p>
    </div>
  )
}

export default Items
