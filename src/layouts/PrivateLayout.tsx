import { useState, ReactNode } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Largura do drawer
const drawerWidth = 260;
const closedDrawerWidth = 72; // Largura do drawer quando fechado (somente ícones)

// Interface para os itens do menu
interface MenuItem {
  text: string;
  path: string;
  icon: ReactNode;
}

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Itens do menu
  const menuItems: MenuItem[] = [
    {
      text: "Início",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      text: "Configuração de Usuário",
      path: "/user-configuration",
      icon: <PersonIcon />,
    },
    {
      text: "Criação de Equipe",
      path: "/team-create",
      icon: <GroupIcon />,
    },
  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login");
  };

  const navigateTo = (path: string) => {
    navigate(path);
    if (isMobile) {
      setOpen(false);
    }
  };

  const menuWidth = isMobile ? 0 : open ? drawerWidth : closedDrawerWidth;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Header (AppBar) */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          width: { md: `calc(100% - ${menuWidth}px)` },
          marginLeft: { md: `${menuWidth}px` },
          transition: theme.transitions.create(["width", "margin-left"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            ACE Control
          </Typography>

          <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: theme.palette.primary.dark }}>
              {user?.name?.charAt(0) || "U"}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/user-configuration");
              }}
            >
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Minha Conta</Typography>
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Sair</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Menu Lateral (Drawer) */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: menuWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile
              ? drawerWidth
              : open
              ? drawerWidth
              : closedDrawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.default,
            borderRight: `1px solid ${theme.palette.divider}`,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.shortest,
            }),
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />

        <Box sx={{ overflow: "hidden", mt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => navigateTo(item.path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    mx: 1,
                    borderRadius: "0 20px 20px 0",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      display: open ? "block" : "none",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Conteúdo Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: "100%", md: `calc(100% - ${menuWidth}px)` },
          minHeight: "100vh",
          backgroundColor: theme.palette.grey[50],
          marginTop: "64px", // altura da Toolbar
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
