import { AutoGraph, LeakAdd } from "@mui/icons-material";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

export function SideBarPage() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" anchor="left" sx={{ 
          flexShrink: 0,
          '& .MuiDrawer-paper': { 
            position: 'relative',
            width: 240, 
            boxSizing: 'border-box'
          },
      }}>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem key="first">
            <ListItemButton>
              <ListItemIcon>
                <AutoGraph />
              </ListItemIcon>
              <ListItemText primary="first" />
            </ListItemButton>
          </ListItem>
          <ListItem key="second">
            <ListItemButton>
              <ListItemIcon>
                <LeakAdd />
              </ListItemIcon>
              <ListItemText primary="second" />
            </ListItemButton>
          </ListItem>
        </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ 
          flexGrow: 1, 
          height: "100vh",
          overflow: "auto",
          backgroundColor: "#f5f5f5",
          marginLeft: "10px",
          marginTop: "10px",
      }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}