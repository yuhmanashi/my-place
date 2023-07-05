import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';

interface ProfileButtonProps {
  user: string;
}

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  // const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    // history.push('/');
  };

  return (
    // <>
    //   <button onClick={openMenu}>
    //     <i className="fa-solid fa-user-circle" />
    //   </button>
    //   {showMenu && (
    //     // <ul className="profile-dropdown">
    //     //   <li>{user.first_name}</li>
    //     //   <li>{user.last_name}</li>
    //     //   <li>{user.email}</li>
    //     //   <li>
    //     //     <button onClick={logout}>Log Out</button>
    //     //   </li>
    //     // </ul>
    //     <button onClick={logout}>Log Out</button>
    //   )}
    // </>
    <button onClick={logout}>Log Out</button>
  );
}

export default ProfileButton;