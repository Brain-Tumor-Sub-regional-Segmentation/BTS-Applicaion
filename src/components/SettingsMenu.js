import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import styles from "./NavBar.module.css"
import { auth } from '../config/firebase-config';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useGetFirstLetter } from '../hooks/useGetFirstLetter';

export default function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const {getFirstLetter} = useGetFirstLetter();
  const [firstLetter, setFirstLetter] = useState('A');

  useEffect(() => {
    getFirstLetter().then((f) => setFirstLetter(f));
  }, []);

  const handleLogout = (e) => {               
    signOut(auth).then(() => {
      handleClose(e)
      navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {
      console.log(error.code, error.message)
    });
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
        <div className={styles.labelAParent} 
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}>
            <div className={styles.labelA} />
            <h3 className={styles.a}>{firstLetter}</h3>
        </div>
        <Stack direction="row" spacing={2}>
        <div>
            <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            >
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{
                    transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                    >
                        <MenuItem style={{fontFamily:'var(--font-karla)'}} onClick={handleClose}>Profile</MenuItem>
                        <MenuItem style={{fontFamily:'var(--font-karla)'}} onClick={handleClose}>My account</MenuItem>
                        <MenuItem style={{fontFamily:'var(--font-karla)'}} onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
        </div>
        </Stack>
    </>
  );
}
