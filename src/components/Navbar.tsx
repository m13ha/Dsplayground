import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsLeftRightToLine, faCircleNodes, faLayerGroup, faNetworkWired, faPeopleArrowsLeftRight, faTableList } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { useState, useMemo } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

interface Props {
  changeTheme: () => void;
}

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

interface Props {
  img?: IconProp;
}

const Navbar = (props: Props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));


  function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to } = props;

    const renderLink = useMemo(
      () =>
        React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(
          itemProps,
          ref,
        ) {
          return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
        }),
      [to],
    );

    return (
      <ListItem
        sx={{
          width: 250,
          height: 100,
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          justifyItems: "center"
        }}
        button
        divider={true}
        component={renderLink}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary}
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: 600,
          }} />
      </ListItem>
    );
  }

  return (
    <Box component="span">
      <AppBar position="fixed" color="default" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {!open &&
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: 2,
                display: { xs: 'inline-flex', sm: 'inline-flex', md: 'none' }
              }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon fontSize="inherit" />
            </IconButton>}
          {open &&
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: 2,
                display: { xs: 'inline-flex', sm: 'inline-flex', md: 'none' }
              }}
            onClick={handleDrawerClose}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dsplayground
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {theme.palette.mode === "dark" && (
              <LightModeIcon fontSize="inherit" onClick={props.changeTheme} />
            )}
            {theme.palette.mode === "light" && (
              <DarkModeIcon fontSize="inherit" onClick={props.changeTheme} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
          },
          display: { xs: 'block', sm: 'block', md: 'none' },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        color="primary"
      >
        <List
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            flexWrap: "wrap",
          }}
        >
          <ListItemLink to="/inbox" primary="Stacks" icon={<FontAwesomeIcon icon={faLayerGroup as IconProp} size="2x" />} />
          <ListItemLink to="/drafts" primary="Queues" icon={<FontAwesomeIcon icon={faPeopleArrowsLeftRight as IconProp} size="2x" />} />
          <ListItemLink to="/inbox" primary="Linked List" icon={<FontAwesomeIcon icon={faArrowsLeftRightToLine as IconProp} size="2x" />} />
          <ListItemLink to="/drafts" primary="Trees" icon={<FontAwesomeIcon icon={faNetworkWired as IconProp} size="2x" />} />
          <ListItemLink to="/drafts" primary="Graphs" icon={<FontAwesomeIcon icon={faCircleNodes as IconProp} size="2x" />} />
          <ListItemLink to="/drafts" primary="Hashtables" icon={<FontAwesomeIcon icon={faTableList as IconProp} size="2x" />} />
        </List>
      </Drawer>
      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 250, boxSizing: 'border-box' },
          display: { xs: 'none', sm: 'none', md: 'block' },
        }}
        variant="permanent"
        anchor="left"
        color="primary"
      >
        <DrawerHeader>
        </DrawerHeader>
        <List
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            flexWrap: "wrap",
          }}
        >
          <ListItemLink to="/inbox" primary="Stacks" icon={<FontAwesomeIcon icon={faLayerGroup as IconProp} size="2x" />} />
          <ListItemLink to="/drafts" primary="Queues" icon={<FontAwesomeIcon icon={faPeopleArrowsLeftRight as IconProp} size="2x" />} />
          <ListItemLink to="/inbox" primary="Linked List" icon={<FontAwesomeIcon icon={faArrowsLeftRightToLine as IconProp} size="2x" />} />
          <ListItemLink to="/drafts" primary="Trees" icon={<FontAwesomeIcon icon={faNetworkWired as IconProp} size="2x" />} />
          <ListItemLink to="/drafts" primary="Graphs" icon={<FontAwesomeIcon icon={faCircleNodes as IconProp} size="2x" />} />
          <ListItemLink to="/drafts" primary="Hashtables" icon={<FontAwesomeIcon icon={faTableList as IconProp} size="2x" />} />
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
