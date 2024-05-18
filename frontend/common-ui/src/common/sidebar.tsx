import { AutoGraph, LeakAdd } from "@mui/icons-material";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Outlet } from "react-router";


export function SideBarPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: "row" }}>
      <Drawer variant="permanent" anchor="left" sx={{ 
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
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
          p: 3, 
          zIndex: (theme) => theme.zIndex.appBar+1,
          paddingLeft: "240px",
          padding: "200px"
      }}>
        <Outlet />
      </Box>
    </Box>
  );
}