import React from 'react'
import './SidebarOption.css'

function SidebarOption({title, Icon, classN}) {
    return (
        <div className={`sidebarOption ${classN} ${title}`}>
            {Icon && <Icon className='sidebarOption__icon' /> }
            {Icon ? <h4>{title}</h4> : <p>{title}</p>}
        </div>
    )
}

export default SidebarOption
