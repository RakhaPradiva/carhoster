import { useState } from "react";
import { Button, Box, useMediaQuery, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Drawer from "@mui/joy/Drawer";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import Menu from "@mui/icons-material/Menu";
import { navMenuItems } from "../constants";

const TopMenu = () => {
	const location = useLocation();
	const theme = useTheme();
	const isMedium = useMediaQuery(theme.breakpoints.down("md"));
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	if (isMedium) {
		return (
			<>
				<Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", paddingRight: 2 }}>
					<IconButton variant="outlined" color="neutral" onClick={handleOpen}>
						<Menu />
					</IconButton>
				</Box>
				<Drawer open={open} onClose={handleClose}>
					<List component="nav">
						{navMenuItems.map((item) => (
							<ListItemButton key={item.label} onClick={handleClose} component={Link} to={item.path}>
								{item.label}
							</ListItemButton>
						))}
					</List>
				</Drawer>
			</>
		);
	}

	return (
		<Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
			{navMenuItems.map((item) => (
				<Button
					key={item.label}
					component={Link}
					to={item.path}
					sx={{
						textTransform: "none",
						color: location.pathname === item.path ? "primary.main" : "black",
						fontSize: "1.1rem",
						fontWeight: "600",
					}}
				>
					{item.label}
				</Button>
			))}
		</Box>
	);
};

export default TopMenu;
