import React from 'react';

import { Menu } from 'semantic-ui-react'

export default {
    Item: ({children, active}) => (
        <Menu.Item 
            className="otocorp-step-item"
            name={children} 
            active={active} />
    ),
    Wrap: ({children}) => {
        return (
            <Menu pointing secondary vertical className="otocorp-step-wrap">
                {children}
            </Menu>
        )
    }
}
