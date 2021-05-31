import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SidebarBtnWrap,
    SidebarRoute
} from './SidebarElemets';


const Sidebar = ({ isOpen, toggle }) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="/cars">
                        CARS
                    </SidebarLink>
                    <SidebarLink to="/about">
                        ABOUT
                    </SidebarLink>
                    <SidebarLink to="/contact">
                        CONTACT
                    </SidebarLink>
                    <SidebarBtnWrap>
                        <SidebarRoute to="/register">
                            SIGN UP
                        </SidebarRoute>
                        <SidebarRoute to="/login">
                            SIGN IN
                        </SidebarRoute>
                    </SidebarBtnWrap>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
