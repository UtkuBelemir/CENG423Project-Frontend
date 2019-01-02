import React from 'react';
import {
    Toolbar,
    ToolbarRow,
    ToolbarSection,
    ToolbarTitle,
    ToolbarMenuIcon,
    ToolbarIcon
} from '@rmwc/toolbar';

export default class Header extends React.Component {
    render() {
        return (
            <Toolbar>
                <ToolbarRow>
                    <ToolbarSection alignStart>
                        <ToolbarMenuIcon icon="menu"/>
                        <ToolbarTitle>Toolbar</ToolbarTitle>
                    </ToolbarSection>
                    <ToolbarSection alignEnd>
                        <ToolbarIcon icon="save"/>
                        <ToolbarIcon icon="print"/>
                    </ToolbarSection>
                </ToolbarRow>
            </Toolbar>
        );
    }
}