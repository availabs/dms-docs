import React from "react"
import { Dropdown } from './index'
import { withAuth } from '@availabs/ams'
import {Link, useLocation} from 'react-router-dom'

// import {NavItem, NavMenu, NavMenuItem, NavMenuSeparator, withAuth} from 'components/avl-components/src'
// import user from "@availabs/ams/dist/reducers/user";

const UserMenu = ({user}) => {
    // const theme = useTheme()
    return (
        <div className={`flex justify-column align-middle py-1 px-4`}>
            <div className='pt-[4px]'>
                <span className={`rounded-full border-2 border-zinc-400
                    inline-flex items-center justify-center 
                    h-6 w-6 sm:h-8 sm:w-8 ring-white text-white 
                    bg-zinc-500 overflow-hidden`}>
                    <i className="fa-duotone fa-user fa-fw pt-2 text-2xl" aria-hidden="true"></i>
                </span>
            </div>
            
            <span className='pl-2'>
                <div className='text-md font-thin tracking-tighter  text-left text-zinc-600 group-hover:text-white '>{user.email ? user.email : ''}</div>
                <div className='text-xs font-medium -mt-1 tracking-widest text-left text-gray-500 group-hover:text-gray-200'>{user.groups[0] ? user.groups[0] : ''}</div>
            </span>
        </div>
    )
}

export const Item = (to, icon, span, condition) => (
    condition === undefined || condition ?
        <Link to={ to } >
            <div className='px-6 py-1 bg-zinc-500 text-white hover:text-zinc-100'>
                <div className='hover:translate-x-2 transition duration-100 ease-out hover:ease-in'>
                    <i className={`${icon} `} />
                    <span className='pl-2'>{span}</span>
                </div>
            </div>
        </Link>
    : null
)


export default withAuth(({title, shadowed = true, user, children}) => {
   
    const location = useLocation();
{/*<Link className='' to='/auth/login'> Login </Link>*/}
    return (
        <div className="h-full w-fit">
            {!user.authed ?            
                <Link className={`flex items-center px-8 text-lg font-bold h-12 dark:text-zinc-100`} to="/auth/login" state={{from: location?.pathname}}>Login</Link> :
                <Dropdown control={<UserMenu user={user}/>} className={` hover:bg-zinc-500 group `} >
                    <div className='p-1 bg-zinc-500'>
                        { user.authLevel >= 5 ? 
                        <div className='py-2'>
                            <div className=''> 
                                {Item('/users/manage', 'fad fa-screwdriver-wrench fa-fw flex-shrink-0  pr-1', 'Manage Users')}
                            </div>
                           
                        </div>
                        : ''}
                        <div className='py-1 border-t border-zinc-400'> 
                            {Item('/auth/logout', 'fad fa-sign-out-alt pb-2 pr-1', 'Logout')}
                        </div>
                    </div>
                </Dropdown>
            }
        </div>
    )
})


