import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiMapAlt ,BiStats,BiBarChartSquare,BiChip,BiWrench} from "react-icons/bi";
import './sidebar.scss';

const sidebarNavItems = [
    {
        display: 'Map',
        icon: <BiMapAlt/>,
        to: '/Map',
        section: 'Map'
    },
    {
        display: 'Dashboard',
        icon: <BiStats/>,
        to: '/Dashboard',
        section: 'Dashboard'
    },
    {
        display: 'Chart',
        icon: <BiBarChartSquare/>,
        to: '/Chart',
        section: 'Chart'
    },
    {
        display: 'Simulation',
        icon: <BiChip/>,
        to: '/Simulation',
        section: 'Simulation'
    },
    {
        display: 'Parameter',
        icon: <BiWrench/>,
        to: '/Parameter',
        section: 'Parameter'
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
            LaxyaBus
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
};

export default Sidebar;
